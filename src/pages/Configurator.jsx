import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { models } from '../data';

export function Configurator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = models.find(m => m.id === parseInt(id));

  const [config, setConfig] = useState({
    finishes: 'standard',
    colors: 'neutral',
    layout: 'default',
    upgrades: []
  });

  if (!model) {
    return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Model not found</div>;
  }

  const handleUpgradeChange = (upgrade) => {
    setConfig(prev => ({
      ...prev,
      upgrades: prev.upgrades.includes(upgrade)
        ? prev.upgrades.filter(u => u !== upgrade)
        : [...prev.upgrades, upgrade]
    }));
  };

  const handleNext = () => {
    sessionStorage.setItem('configuration', JSON.stringify({ modelId: model.id, modelName: model.name, config }));
    navigate('/#contact');
  };

  return (
    <div className="site">
      <section style={{ padding: '60px 20px', background: '#F5F3EF', borderBottom: '1px solid #E7E3DC' }}>
        <div className="container">
          <Link to={`/model/${model.id}`} style={{ color: '#4A4F48', marginBottom: '24px', display: 'inline-block' }}>
            ← Back to {model.name}
          </Link>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px', fontFamily: 'Playfair Display' }}>
            Customize {model.name}
          </h1>
          <p style={{ color: '#4A4F48' }}>Choose your finishes, colors, and upgrades</p>
        </div>
      </section>

      <section style={{ padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            {/* Configuration Options */}
            <div>
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'Playfair Display' }}>
                  Finishes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Standard', 'Premium', 'Luxury'].map(finish => (
                    <label key={finish} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid #E7E3DC', borderRadius: '6px' }}>
                      <input
                        type="radio"
                        name="finishes"
                        value={finish.toLowerCase()}
                        checked={config.finishes === finish.toLowerCase()}
                        onChange={(e) => setConfig({ ...config, finishes: e.target.value })}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span>{finish}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'Playfair Display' }}>
                  Color Palette
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Neutral', 'Warm', 'Cool', 'Bold'].map(color => (
                    <label key={color} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid #E7E3DC', borderRadius: '6px' }}>
                      <input
                        type="radio"
                        name="colors"
                        value={color.toLowerCase()}
                        checked={config.colors === color.toLowerCase()}
                        onChange={(e) => setConfig({ ...config, colors: e.target.value })}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'Playfair Display' }}>
                  Layout
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Default', 'Extended', 'Compact'].map(layout => (
                    <label key={layout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid #E7E3DC', borderRadius: '6px' }}>
                      <input
                        type="radio"
                        name="layout"
                        value={layout.toLowerCase()}
                        checked={config.layout === layout.toLowerCase()}
                        onChange={(e) => setConfig({ ...config, layout: e.target.value })}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span>{layout}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'Playfair Display' }}>
                  Upgrades
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Solar panels', 'Smart home package', 'Premium appliances', 'Extended deck'].map(upgrade => (
                    <label key={upgrade} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid #E7E3DC', borderRadius: '6px' }}>
                      <input
                        type="checkbox"
                        checked={config.upgrades.includes(upgrade)}
                        onChange={() => handleUpgradeChange(upgrade)}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span>{upgrade}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div style={{ background: '#F5F3EF', padding: '32px', borderRadius: '8px', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '24px', fontFamily: 'Playfair Display' }}>
                Your Configuration
              </h3>

              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E7E3DC' }}>
                <img 
                  src={model.img} 
                  alt={model.name}
                  style={{ width: '100%', borderRadius: '6px', marginBottom: '16px' }}
                />
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{model.name}</p>
                <p style={{ color: '#B8B1A6', fontSize: '1.05rem' }}>{model.price}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.9rem', color: '#4A4F48' }}>
                  <strong>Finishes:</strong> {config.finishes}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#4A4F48' }}>
                  <strong>Colors:</strong> {config.colors}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#4A4F48' }}>
                  <strong>Layout:</strong> {config.layout}
                </p>
                {config.upgrades.length > 0 && (
                  <p style={{ fontSize: '0.9rem', color: '#4A4F48' }}>
                    <strong>Upgrades:</strong> {config.upgrades.length} selected
                  </p>
                )}
              </div>

              <button
                onClick={handleNext}
                className="button dark"
                style={{ width: '100%', padding: '16px', fontWeight: 600, cursor: 'pointer' }}
              >
                Continue to enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container narrow">
          <p>
            Images shown are design concepts. Final specifications and finishes
            are confirmed prior to order.
          </p>
          <p className="footer-brand">
            © ClimaForge — Premium Modular Homes
          </p>
        </div>
      </footer>
    </div>
  );
}
