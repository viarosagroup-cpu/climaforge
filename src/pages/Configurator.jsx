import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { models, upgradeOptionPrices, calcOrderTotal } from '../data';

const fmt = (n) =>
  '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0 });

const FINISH_OPTIONS = [
  { value: 'standard', label: 'Standard', desc: 'Quality fixtures, practical finishes', price: 0 },
  { value: 'premium', label: 'Premium', desc: 'Upgraded fixtures, richer materials', price: 3000 },
  { value: 'luxury', label: 'Luxury', desc: 'Top-tier finishes throughout', price: 8000 },
];

const COLOR_OPTIONS = [
  { value: 'neutral', label: 'Neutral', swatch: '#B8B1A6', price: 0 },
  { value: 'warm', label: 'Warm', swatch: '#C4A882', price: 500 },
  { value: 'cool', label: 'Cool', swatch: '#8FA8B4', price: 500 },
  { value: 'bold', label: 'Bold', swatch: '#3D3D3D', price: 1000 },
];

const LAYOUT_OPTIONS = [
  { value: 'default', label: 'Default', desc: 'Standard floorplan as designed', price: 0 },
  { value: 'extended', label: 'Extended', desc: 'Expanded living & bedroom zones', price: 5000 },
  { value: 'compact', label: 'Compact', desc: 'Reduced footprint, lower cost', price: -2000 },
];

const ALL_UPGRADES = [
  { value: 'Solar panels', label: 'Solar Panels', desc: '6.6kW system, battery-ready', price: 4500 },
  { value: 'Smart home package', label: 'Smart Home', desc: 'App-controlled lighting & climate', price: 3200 },
  { value: 'Premium appliances', label: 'Premium Appliances', desc: 'Fisher & Paykel suite', price: 2800 },
  { value: 'Extended deck', label: 'Extended Deck', desc: 'Extra 20sqm hardwood deck', price: 2200 },
  { value: 'Off-grid water system', label: 'Off-Grid Water', desc: '5,000L tanks + pump system', price: 5500 },
  { value: 'Ducted air conditioning', label: 'Ducted A/C', desc: 'Full home climate control', price: 3800 },
];

export function Configurator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = models.find((m) => m.id === parseInt(id));

  const [config, setConfig] = useState({
    finishes: 'standard',
    colors: 'neutral',
    layout: 'default',
    upgrades: [],
  });

  if (!model) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Model not found</h2>
        <Link to="/">Back to models</Link>
      </div>
    );
  }

  const totalPrice = calcOrderTotal(model.basePrice, config);
  const upgradeTotal = totalPrice - model.basePrice;
  const depositAmount = Math.round(totalPrice * 0.3);

  const toggleUpgrade = (val) => {
    setConfig((prev) => ({
      ...prev,
      upgrades: prev.upgrades.includes(val)
        ? prev.upgrades.filter((u) => u !== val)
        : [...prev.upgrades, val],
    }));
  };

  const handleProceed = () => {
    sessionStorage.setItem(
      'checkoutOrder',
      JSON.stringify({
        modelId: model.id,
        modelName: model.name,
        modelImg: model.img,
        basePrice: model.basePrice,
        upgradeTotal,
        totalPrice,
        config,
      })
    );
    navigate('/checkout');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: '#1C1C1C', padding: '18px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '1.3rem' }}>ClimaForge</Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Configure</span>
          <Link to={`/model/${model.id}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Back to {model.name}</Link>
        </div>
      </header>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: '48px', padding: '48px 20px 80px', alignItems: 'start' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: '8px' }}>Configure {model.name}</h1>
          <p style={{ color: 'var(--taupe)', marginBottom: '48px' }}>Personalise your home and see the price update in real time.</p>

          <Section title="Finishes">
            <div style={{ display: 'grid', gap: '12px' }}>
              {FINISH_OPTIONS.map((opt) => (
                <OptionCard key={opt.value} selected={config.finishes === opt.value} onClick={() => setConfig({ ...config, finishes: opt.value })}>
                  <div style={{ flex: 1 }}><p style={{ fontWeight: 600, marginBottom: '2px' }}>{opt.label}</p><p style={{ fontSize: '0.85rem', color: 'var(--taupe)' }}>{opt.desc}</p></div>
                  <span style={{ fontWeight: 600, color: opt.price > 0 ? '#1C1C1C' : 'var(--taupe)', flexShrink: 0 }}>{opt.price === 0 ? 'Included' : `+ ${fmt(opt.price)}`}</span>
                </OptionCard>
              ))}
            </div>
          </Section>

          <Section title="Colour Palette">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {COLOR_OPTIONS.map((opt) => (
                <OptionCard key={opt.value} selected={config.colors === opt.value} onClick={() => setConfig({ ...config, colors: opt.value })}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: opt.swatch, border: config.colors === opt.value ? '2px solid #1C1C1C' : '2px solid transparent', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><p style={{ fontWeight: 600, marginBottom: '1px' }}>{opt.label}</p><p style={{ fontSize: '0.8rem', color: 'var(--taupe)' }}>{opt.price === 0 ? 'Included' : `+ ${fmt(opt.price)}`}</p></div>
                </OptionCard>
              ))}
            </div>
          </Section>

          <Section title="Layout">
            <div style={{ display: 'grid', gap: '12px' }}>
              {LAYOUT_OPTIONS.map((opt) => (
                <OptionCard key={opt.value} selected={config.layout === opt.value} onClick={() => setConfig({ ...config, layout: opt.value })}>
                  <div style={{ flex: 1 }}><p style={{ fontWeight: 600, marginBottom: '2px' }}>{opt.label}</p><p style={{ fontSize: '0.85rem', color: 'var(--taupe)' }}>{opt.desc}</p></div>
                  <span style={{ fontWeight: 600, flexShrink: 0, color: opt.price < 0 ? '#16a34a' : opt.price > 0 ? '#1C1C1C' : 'var(--taupe)' }}>{opt.price === 0 ? 'Included' : opt.price < 0 ? `- ${fmt(Math.abs(opt.price))}` : `+ ${fmt(opt.price)}`}</span>
                </OptionCard>
              ))}
            </div>
          </Section>

          <Section title="Upgrades & Add-ons">
            <div style={{ display: 'grid', gap: '12px' }}>
              {ALL_UPGRADES.map((opt) => (
                <OptionCard key={opt.value} selected={config.upgrades.includes(opt.value)} onClick={() => toggleUpgrade(opt.value)} checkbox>
                  <div style={{ flex: 1 }}><p style={{ fontWeight: 600, marginBottom: '2px' }}>{opt.label}</p><p style={{ fontSize: '0.85rem', color: 'var(--taupe)' }}>{opt.desc}</p></div>
                  <span style={{ fontWeight: 600, color: '#1C1C1C', flexShrink: 0 }}>+ {fmt(opt.price)}</span>
                </OptionCard>
              ))}
            </div>
          </Section>
        </div>

        <aside style={{ position: 'sticky', top: '90px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--stone)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--stone)' }}>
              <img src={model.img} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--taupe)', textTransform: 'uppercase', marginBottom: '4px' }}>Your Build</p>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.3rem', marginBottom: '20px' }}>{model.name}</h3>
              <div style={{ display: 'grid', gap: '8px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--stone)' }}>
                <PriceRow label="Base price" value={fmt(model.basePrice)} />
                {upgradeOptionPrices.finishes[config.finishes] > 0 && <PriceRow label={`${config.finishes} finishes`} value={`+ ${fmt(upgradeOptionPrices.finishes[config.finishes])}`} />}
                {upgradeOptionPrices.colors[config.colors] > 0 && <PriceRow label={`${config.colors} colours`} value={`+ ${fmt(upgradeOptionPrices.colors[config.colors])}`} />}
                {upgradeOptionPrices.layout[config.layout] !== 0 && <PriceRow label={`${config.layout} layout`} value={upgradeOptionPrices.layout[config.layout] < 0 ? `- ${fmt(Math.abs(upgradeOptionPrices.layout[config.layout]))}` : `+ ${fmt(upgradeOptionPrices.layout[config.layout])}`} green={upgradeOptionPrices.layout[config.layout] < 0} />}
                {config.upgrades.map((u) => <PriceRow key={u} label={u} value={`+ ${fmt(upgradeOptionPrices.upgrades[u])}`} />)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
                <span>Total</span><span>{fmt(totalPrice)} AUD</span>
              </div>
              <div style={{ background: '#1C1C1C', color: '#fff', borderRadius: '10px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>30% Deposit Due Today</p>
                <p style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 600 }}>{fmt(depositAmount)}</p>
                <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '2px' }}>Balance {fmt(totalPrice - depositAmount)} due before delivery</p>
              </div>
              <button onClick={handleProceed} style={{ width: '100%', background: '#1C1C1C', color: '#fff', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                Proceed to Checkout
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--taupe)', marginTop: '10px' }}>Secure payment via Stripe</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--stone)' }}>{title}</h3>
      {children}
    </div>
  );
}

function OptionCard({ selected, onClick, children, checkbox }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', border: selected ? '2px solid #1C1C1C' : '1.5px solid var(--stone)', borderRadius: '10px', cursor: 'pointer', background: selected ? '#fafafa' : '#fff', transition: 'border-color 0.15s' }}>
      <div style={{ width: '20px', height: '20px', borderRadius: checkbox ? '4px' : '50%', border: selected ? '6px solid #1C1C1C' : '2px solid var(--stone)', flexShrink: 0, background: selected && checkbox ? '#1C1C1C' : 'transparent' }} />
      {children}
    </div>
  );
}

function PriceRow({ label, value, green }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
      <span style={{ color: 'var(--deep)', textTransform: 'capitalize' }}>{label}</span>
      <span style={{ fontWeight: 500, color: green ? '#16a34a' : '#1C1C1C' }}>{value}</span>
    </div>
  );
}
