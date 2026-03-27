import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const fmt = (n) =>
  '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0 });

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('pendingOrder');
    if (raw) {
      setOrder(JSON.parse(raw));
      sessionStorage.removeItem('pendingOrder');
      sessionStorage.removeItem('checkoutOrder');
      sessionStorage.removeItem('configuration');
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1C1C1C', padding: '18px 0' }}>
        <div className="container">
          <Link to="/" style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '1.3rem' }}>
            ClimaForge
          </Link>
        </div>
      </header>

      <div className="container" style={{ padding: '80px 20px', maxWidth: '700px' }}>
        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#1C1C1C',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              fontSize: '2rem',
            }}
          >
            ✓
          </div>
          <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '12px' }}>
            Payment Confirmed
          </p>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.8rem', color: '#1C1C1C', lineHeight: 1.2, marginBottom: '16px' }}>
            Your deposit is secured
          </h1>
          <p style={{ color: 'var(--deep)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Thank you for choosing ClimaForge. Our team will contact you within 24 hours to confirm your build schedule and delivery details.
          </p>
        </div>

        {/* Order summary card */}
        {order && (
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--stone)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              marginBottom: '40px',
            }}
          >
            <div style={{ background: '#1C1C1C', padding: '20px 28px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Order Summary
              </p>
              <p style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '1.4rem' }}>
                {order.modelName}
              </p>
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'grid', gap: '14px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--stone)' }}>
                {order.form?.name && (
                  <Row label="Customer" value={order.form.name} />
                )}
                {order.form?.email && (
                  <Row label="Email" value={order.form.email} />
                )}
                {order.form && (order.form.address || order.form.city) && (
                  <Row
                    label="Delivery Address"
                    value={[order.form.address, order.form.city, order.form.state, order.form.postcode].filter(Boolean).join(', ')}
                  />
                )}
                {sessionId && (
                  <Row label="Reference" value={sessionId.slice(-12).toUpperCase()} mono />
                )}
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--deep)' }}>
                  <span>Total value</span>
                  <span>{fmt(order.totalPrice)} AUD</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: '#F5F3EF',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                  }}
                >
                  <span>Deposit paid (30%)</span>
                  <span style={{ color: '#1C1C1C' }}>{fmt(order.depositAmount)} AUD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--taupe)' }}>
                  <span>Balance due before delivery</span>
                  <span>{fmt(order.totalPrice - order.depositAmount)} AUD</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '24px', color: '#1C1C1C' }}>
            What happens next
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { step: '1', title: 'Confirmation email', desc: 'You\'ll receive a receipt and order confirmation to your email within minutes.' },
              { step: '2', title: 'Our team calls you', desc: 'A ClimaForge consultant will call within 24 hours to finalise your specifications and build schedule.' },
              { step: '3', title: 'Build commences', desc: 'Your home enters our production queue. Typical build times are 8–14 weeks from order confirmation.' },
              { step: '4', title: 'Delivery & handover', desc: 'We coordinate delivery, installation, and final inspection. Balance invoice is issued 7 days before delivery.' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  background: '#fff',
                  border: '1px solid var(--stone)',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: '#1C1C1C',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'Playfair Display',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '4px', color: '#1C1C1C' }}>{item.title}</p>
                  <p style={{ color: 'var(--deep)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              background: '#1C1C1C',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-block',
            }}
          >
            Back to home
          </Link>
          <a
            href="mailto:hello@climaforge.com.au"
            style={{
              background: 'transparent',
              color: '#1C1C1C',
              padding: '14px 28px',
              border: '1.5px solid #1C1C1C',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-block',
            }}
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '1px', flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#1C1C1C',
          textAlign: 'right',
          fontFamily: mono ? 'monospace' : 'inherit',
        }}
      >
        {value}
      </span>
    </div>
  );
}
