import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const fmt = (n) =>
  '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0 });

export function Checkout() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia',
  });

  useEffect(() => {
    const raw = sessionStorage.getItem('checkoutOrder');
    if (!raw) {
      navigate('/');
      return;
    }
    setOrder(JSON.parse(raw));
  }, [navigate]);

  const totalPrice = order?.totalPrice ?? 0;
  const depositAmount = Math.round(totalPrice * 0.3);
  const balanceDue = totalPrice - depositAmount;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: order.modelId,
          modelName: order.modelName,
          totalPrice,
          depositAmount,
          customerEmail: form.email,
          customerName: form.name,
          customerPhone: form.phone,
          shippingAddress: {
            address: form.address,
            city: form.city,
            state: form.state,
            postcode: form.postcode,
            country: form.country,
          },
          config: order.config,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed to initiate.');
      if (data.url) {
        sessionStorage.setItem('pendingOrder', JSON.stringify({ ...order, form, totalPrice, depositAmount }));
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  const configItems = [];
  if (order.config?.finishes && order.config.finishes !== 'standard')
    configItems.push(`${order.config.finishes} finishes`);
  if (order.config?.colors && order.config.colors !== 'neutral')
    configItems.push(`${order.config.colors} colours`);
  if (order.config?.layout && order.config.layout !== 'default')
    configItems.push(`${order.config.layout} layout`);
  (order.config?.upgrades || []).forEach((u) => configItems.push(u));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1C1C1C', padding: '18px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '1.3rem', letterSpacing: '0.5px' }}>
            ClimaForge
          </Link>
          <span style={{ color: 'var(--taupe)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Secure Checkout
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: 'var(--taupe)', fontSize: '0.75rem' }}>🔒 SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Back */}
      <div className="container" style={{ padding: '24px 20px 0' }}>
        <Link
          to={`/configurator/${order.modelId}`}
          style={{ color: 'var(--deep)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          ← Edit Configuration
        </Link>
      </div>

      {/* Main grid */}
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 380px',
          gap: '48px',
          padding: '40px 20px 80px',
          alignItems: 'start',
        }}
      >
        {/* LEFT: FORM */}
        <form onSubmit={handleSubmit}>
          {/* Contact */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontFamily: 'Playfair Display', color: '#1C1C1C' }}>
              Contact Details
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+61 4XX XXX XXX" style={inputStyle} type="tel" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input name="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle} type="email" />
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', fontFamily: 'Playfair Display', color: '#1C1C1C' }}>
              Delivery Address
            </h2>
            <p style={{ color: 'var(--taupe)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Where should we deliver your ClimaForge home?
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Street Address *</label>
                <input name="address" required value={form.address} onChange={handleChange} placeholder="123 Main Street" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Suburb / City *</label>
                  <input name="city" required value={form.city} onChange={handleChange} placeholder="Gold Coast" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>State *</label>
                  <select name="state" required value={form.state} onChange={handleChange} style={inputStyle}>
                    <option value="">Select state</option>
                    {['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Postcode *</label>
                  <input name="postcode" required value={form.postcode} onChange={handleChange} placeholder="4000" style={inputStyle} pattern="[0-9]{4}" maxLength={4} />
                </div>
                <div>
                  <label style={labelStyle}>Country</label>
                  <input name="country" value={form.country} onChange={handleChange} style={inputStyle} readOnly />
                </div>
              </div>
            </div>
          </section>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '14px 18px', color: '#DC2626', marginBottom: '24px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {/* Trust badges */}
          <div style={{ background: '#F5F3EF', border: '1px solid var(--stone)', borderRadius: '10px', padding: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
              {[
                { icon: '🔒', label: 'SSL Secure' },
                { icon: '✓', label: '30-Day Review' },
                { icon: '🏠', label: 'Build Guaranteed' },
              ].map((b) => (
                <div key={b.label}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--deep)', fontWeight: 500 }}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'var(--taupe)' : '#1C1C1C',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '18px 32px',
              fontSize: '1.05rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.5px',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Redirecting to Stripe…' : `Pay 30% Deposit — ${fmt(depositAmount)} AUD`}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--taupe)', fontSize: '0.8rem', marginTop: '12px' }}>
            You'll be redirected to Stripe's secure payment page. Balance of {fmt(balanceDue)} AUD is due before delivery.
          </p>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <aside style={{ position: 'sticky', top: '90px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--stone)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {/* Model image */}
            <div style={{ background: 'var(--stone)', aspectRatio: '16/9', overflow: 'hidden' }}>
              <img
                src={order.modelImg}
                alt={order.modelName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--stone)' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '6px' }}>
                  Your Selection
                </p>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', color: '#1C1C1C', marginBottom: '8px' }}>
                  {order.modelName}
                </h3>
                {configItems.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {configItems.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--stone)',
                          borderRadius: '20px',
                          padding: '3px 10px',
                          fontSize: '0.78rem',
                          color: 'var(--deep)',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price breakdown */}
              <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--deep)' }}>
                  <span>Base price</span>
                  <span>{fmt(order.basePrice)}</span>
                </div>
                {(order.upgradeTotal ?? 0) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--deep)' }}>
                    <span>Upgrades &amp; options</span>
                    <span>+ {fmt(order.upgradeTotal)}</span>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '2px solid #1C1C1C', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>Total Value</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{fmt(totalPrice)} AUD</span>
                </div>
                <div
                  style={{
                    background: '#1C1C1C',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '2px' }}>Due Today (30%)</p>
                    <p style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 600 }}>{fmt(depositAmount)}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>AUD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--taupe)' }}>
                  <span>Balance before delivery</span>
                  <span>{fmt(balanceDue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Need help */}
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--stone)', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--deep)', marginBottom: '4px' }}>Need help? Call us</p>
            <a href="tel:+61000000000" style={{ fontWeight: 700, color: '#1C1C1C', fontSize: '1rem' }}>1800 CLIMAFORGE</a>
          </div>
        </aside>
      </div>

      {/* Mobile: full width below md */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#1C1C1C',
  marginBottom: '7px',
  letterSpacing: '0.3px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1.5px solid var(--stone)',
  borderRadius: '8px',
  fontSize: '0.95rem',
  background: '#fff',
  color: '#1C1C1C',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};
