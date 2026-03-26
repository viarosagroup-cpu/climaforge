import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Confirmation() {
  const [quoteData, setQuoteData] = useState(null);
  const [config, setConfig] = useState(null);
  const [showContract, setShowContract] = useState(false);

  useEffect(() => {
    const quote = sessionStorage.getItem('quoteData');
    const configuration = sessionStorage.getItem('configuration');
    
    if (quote) setQuoteData(JSON.parse(quote));
    if (configuration) setConfig(JSON.parse(configuration));
  }, []);

  const handlePayment = () => {
    // Placeholder for Stripe integration
    alert('Payment integration coming soon! In a full implementation, this would redirect to Stripe Checkout.');
  };

  return (
    <div className="site">
      <section style={{ padding: '120px 20px', background: '#F5F3EF', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container narrow" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '32px', fontSize: '60px' }}>✓</div>
          
          <h1 style={{ fontSize: '2.6rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>
            Thank You!
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: '#4A4F48', marginBottom: '40px', lineHeight: 1.6 }}>
            Your quote request has been received. We'll get back to you within 24 hours with a personalized proposal.
          </p>

          {quoteData && (
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #E7E3DC', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', fontFamily: 'Playfair Display' }}>Enquiry Summary</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#B8B1A6', marginBottom: '4px' }}>NAME</p>
                  <p style={{ fontWeight: 600 }}>{quoteData.name}</p>
                </div>
                
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#B8B1A6', marginBottom: '4px' }}>EMAIL</p>
                  <p style={{ fontWeight: 600 }}>{quoteData.email}</p>
                </div>
                
                {quoteData.model && (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#B8B1A6', marginBottom: '4px' }}>MODEL</p>
                    <p style={{ fontWeight: 600 }}>{quoteData.model}</p>
                  </div>
                )}
                
                {config && (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#B8B1A6', marginBottom: '4px' }}>CUSTOMIZATION</p>
                    <p style={{ fontSize: '0.9rem' }}>
                      {config.config.finishes} finishes • {config.config.colors} colors • {config.config.upgrades.length > 0 ? `${config.config.upgrades.length} upgrades` : 'No upgrades'}
                    </p>
                  </div>
                )}
                
                {quoteData.message && (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#B8B1A6', marginBottom: '4px' }}>MESSAGE</p>
                    <p style={{ fontSize: '0.9rem', color: '#1C1C1C' }}>{quoteData.message}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button onClick={handlePayment} className="button dark" style={{ padding: '14px 28px' }}>
              Proceed to Payment
            </button>
            <button onClick={() => setShowContract(true)} className="button" style={{ padding: '14px 28px' }}>
              View Contract
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="button" style={{ padding: '14px 28px', textDecoration: 'none' }}>
              Back to home
            </Link>
            <Link to="/" className="button dark" style={{ padding: '14px 28px', textDecoration: 'none', background: '#1C1C1C', color: 'white' }}>
              View other models
            </Link>
          </div>

          <div style={{ marginTop: '60px', padding: '32px', background: '#E7E3DC', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'Playfair Display' }}>What happens next?</h4>
            <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
              <li>Our team reviews your requirements</li>
              <li>We prepare a custom proposal with pricing</li>
              <li>A specialist contacts you to discuss options</li>
              <li>You can refine the design and move forward</li>
            </ol>
          </div>
        </div>
      </section>

      {showContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowContract(false)}>
          <div className="bg-white p-8 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">ClimaForge Modular Home Contract</h2>
            <div className="text-sm space-y-4">
              <p><strong>1. Parties</strong></p>
              <p>This agreement is between ClimaForge Homes ("Company") and {quoteData?.name || 'Customer'} ("Customer").</p>
              
              <p><strong>2. Product</strong></p>
              <p>The Company agrees to manufacture and deliver a {config?.modelName || quoteData?.model || 'modular home'} according to the specifications agreed upon.</p>
              
              <p><strong>3. Payment Terms</strong></p>
              <p>• 30% deposit upon contract signing</p>
              <p>• 40% upon completion of manufacturing</p>
              <p>• 30% upon delivery and installation</p>
              
              <p><strong>4. Delivery</strong></p>
              <p>Delivery will occur within 8-12 weeks of contract signing, subject to site preparation and weather conditions.</p>
              
              <p><strong>5. Warranties</strong></p>
              <p>The Company provides a 10-year structural warranty and 2-year finish warranty.</p>
              
              <p><strong>6. Termination</strong></p>
              <p>Either party may terminate with 30 days written notice. Deposits are non-refundable after manufacturing begins.</p>
              
              <p className="mt-6"><em>This is a sample contract. Final contract will be provided after quote approval.</em></p>
            </div>
            <button onClick={() => setShowContract(false)} className="mt-6 px-4 py-2 bg-gray-500 text-white rounded">Close</button>
          </div>
        </div>
      )}

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
