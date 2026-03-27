import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return res.status(500).json({ error: 'Stripe is not configured on this server.' });
  }

  try {
    const stripe = new Stripe(stripeKey);

    const {
      modelId,
      modelName,
      totalPrice,
      depositAmount,
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      config,
    } = req.body;

    if (!modelName || !depositAmount || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const origin = `${protocol}://${host}`;

    const configSummary = config
      ? `${config.finishes} finishes · ${config.colors} colours · ${config.layout} layout` +
        (config.upgrades?.length ? ` · ${config.upgrades.join(', ')}` : '')
      : '';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            unit_amount: Math.round(Number(depositAmount) * 100),
            product_data: {
              name: `30% Deposit — ${modelName}`,
              description: configSummary
                ? `${configSummary}. Remaining balance due before delivery.`
                : 'Remaining balance due before delivery.',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      metadata: {
        modelId: String(modelId ?? ''),
        modelName,
        customerName: customerName ?? '',
        customerPhone: customerPhone ?? '',
        totalPrice: String(totalPrice),
        depositAmount: String(depositAmount),
        shippingAddress: JSON.stringify(shippingAddress ?? {}),
        config: JSON.stringify(config ?? {}),
      },
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
