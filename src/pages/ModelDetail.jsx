import { useParams, Link, useNavigate } from 'react-router-dom';
import { models } from '../data';

export function ModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = models.find(m => m.id === parseInt(id));

  if (!model) {
    return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Model not found</div>;
  }

  return (
    <div className="site">
      <section style={{ padding: '60px 20px', background: '#E7E3DC' }}>
        <div className="container">
          <Link to="/" style={{ color: '#4A4F48', marginBottom: '32px', display: 'inline-block' }}>
            ← Back to models
          </Link>
        </div>
      </section>

      <section style={{ padding: '100px 20px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            {/* Left: Image */}
            <div>
              <img 
                src={model.img} 
                alt={model.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '24px' }}
              />

              {model.floorplan && (
                <div style={{ marginTop: '18px', padding: '10px', border: '1px solid #dcd7cf', borderRadius: 8, background: '#fff' }}>
                  <h4 style={{ margin: '0 0 8px' }}>Floor plan</h4>
                  <img
                    src={model.floorplan}
                    alt={`${model.name} floorplan`}
                    style={{ width: '100%', borderRadius: 6 }}
                  />
                </div>
              )}

              {model.installationVideo && (
                <div style={{ marginTop: '18px' }}>
                  <h4 style={{ margin: '0 0 8px' }}>Installation video</h4>
                  <video
                    controls
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                    src={model.installationVideo}
                  />
                </div>
              )}

              {model.elevationDrawing && (
                <div style={{ marginTop: '18px' }}>
                  <h4 style={{ margin: '0 0 8px' }}>Elevation drawing</h4>
                  <a
                    href={model.elevationDrawing}
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                    style={{ padding: '8px 12px', textDecoration: 'none' }}
                  >
                    Download elevation PDF
                  </a>
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>
                {model.name}
              </h1>
              <p style={{ fontSize: '1.3rem', color: '#B8B1A6', marginBottom: '32px', fontWeight: 600 }}>
                {model.price}
              </p>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '36px', color: '#1C1C1C' }}>
                {model.details}
              </p>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>
                  Specifications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {model.specs.map((spec, i) => (
                    <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #E7E3DC' }}>
                      ✓ {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>
                  Customization Options
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {model.customizations.map((opt, i) => (
                    <li key={i} style={{ padding: '8px 0', color: '#4A4F48' }}>
                      • {opt}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate('/configurator/' + model.id)}
                className="button dark"
                style={{ width: '100%', padding: '18px', marginBottom: '16px', cursor: 'pointer' }}
              >
                Customize this model
              </button>
              <Link 
                to="/#contact"
                className="button"
                style={{ display: 'block', textAlign: 'center', width: '100%', padding: '18px' }}
              >
                Get a quote
              </Link>
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
