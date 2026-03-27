import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Model3DPreview } from '../components/Model3DPreview';
import { models } from '../data';

const WALL_COLORS = [
  { name: 'Sandstone', value: '#EFE7D5' },
  { name: 'Arctic White', value: '#F5F5F5' },
  { name: 'Charcoal', value: '#55585D' },
  { name: 'Eucalyptus', value: '#8FA08A' },
];

const ROOF_COLORS = [
  { name: 'Walnut', value: '#6C4A3A' },
  { name: 'Graphite', value: '#3B3F45' },
  { name: 'Terracotta', value: '#A25F44' },
];

const ACCENT_COLORS = [
  { name: 'Timber', value: '#654321' },
  { name: 'Matte Black', value: '#232323' },
  { name: 'Stone Grey', value: '#6B6F76' },
];

const LAYOUT_OPTIONS = ['default', 'extended', 'compact'];

export function Studio3D() {
  const { id } = useParams();
  const selectedModel = useMemo(
    () => models.find((m) => m.id === Number(id)) || models[0],
    [id]
  );

  const [layout, setLayout] = useState('default');
  const [wallColor, setWallColor] = useState(WALL_COLORS[0].value);
  const [roofColor, setRoofColor] = useState(ROOF_COLORS[0].value);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0].value);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const payload = {
      name,
      email,
      message: `3D review request\nModel: ${selectedModel.name}\nLayout: ${layout}\nWall: ${wallColor}\nRoof: ${roofColor}\nAccent: ${accentColor}\nNotes: ${notes || 'None'}`,
      model: selectedModel.name,
      layout,
      wall_color: wallColor,
      roof_color: roofColor,
      accent_color: accentColor,
      source: '3d-studio-review',
    };

    try {
      const response = await fetch('https://formspree.io/f/meeporvo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Could not submit your review request.');
      }

      setStatus('success');
      setMessage('Submitted. Your 3D layout and colour choices were sent for review.');
      setName('');
      setEmail('');
      setNotes('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="site" style={{ background: '#F5F3EF' }}>
      <section style={{ padding: '48px 20px 20px', background: '#E7E3DC', borderBottom: '1px solid rgba(28,28,28,0.12)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <Link to={`/model/${selectedModel.id}`} style={{ color: '#4A4F48', fontSize: '0.92rem' }}>
              Back to {selectedModel.name}
            </Link>
            <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>3D Layout and Colour Studio</h1>
            <p style={{ color: '#4A4F48', marginTop: '6px' }}>
              Configure your model and submit it for team review.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #d9d3c9', borderRadius: '10px', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.75rem', color: '#6f6a61', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Selected Model</p>
            <p style={{ fontWeight: 600 }}>{selectedModel.name}</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '36px 20px 70px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
          <div>
            <Model3DPreview
              modelName={selectedModel.name}
              layout={layout}
              wallColor={wallColor}
              roofColor={roofColor}
              accentColor={accentColor}
            />
          </div>

          <div style={{ background: '#fff', border: '1px solid #dbd6ce', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Customise</h2>

            <label style={labelStyle}>Layout</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {LAYOUT_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLayout(value)}
                  style={{
                    border: layout === value ? '2px solid #1c1c1c' : '1px solid #d6d1c8',
                    background: layout === value ? '#f1eee8' : '#fff',
                    borderRadius: '8px',
                    textTransform: 'capitalize',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {value}
                </button>
              ))}
            </div>

            <ColorSelector title="Wall Colour" options={WALL_COLORS} value={wallColor} onChange={setWallColor} />
            <ColorSelector title="Roof Colour" options={ROOF_COLORS} value={roofColor} onChange={setRoofColor} />
            <ColorSelector title="Accent Colour" options={ACCENT_COLORS} value={accentColor} onChange={setAccentColor} />

            <form onSubmit={handleSubmit} style={{ marginTop: '18px', borderTop: '1px solid #ece7de', paddingTop: '16px', display: 'grid', gap: '10px' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Submit For Review</h3>
              <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              <textarea rows="4" placeholder="Anything to note for our team?" value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  border: 'none',
                  borderRadius: '9px',
                  background: '#1c1c1c',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '12px 14px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit 3D Design For Review'}
              </button>
              {message && (
                <p style={{ color: status === 'success' ? '#215732' : '#9b1c1c', fontSize: '0.93rem' }}>{message}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorSelector({ title, options, value, onChange }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelStyle}>{title}</label>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            title={option.name}
            style={{
              border: value === option.value ? '2px solid #1c1c1c' : '1px solid #d6d1c8',
              background: '#fff',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 10px 5px 5px',
              cursor: 'pointer',
            }}
          >
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: option.value, border: '1px solid rgba(0,0,0,0.2)' }} />
            <span style={{ fontSize: '0.85rem' }}>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontWeight: 600,
  marginBottom: '8px',
  fontSize: '0.92rem',
};

const inputStyle = {
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #d6d1c8',
  padding: '11px 12px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
};
