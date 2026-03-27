import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are the ClimaForge AI Advisor — an expert consultant for premium modular homes in Australia.

MODELS & PRICING:
- The Flatline: from $18,900 — compact 1–2 bed, efficient, budget-friendly, quick build
- The Veranda Lite: from $34,900 — 3 bed/2 bath, practical, simplified finishes
- The Veranda: from $39,900 — 3 bed/2 bath, covered porch, signature design, best seller
- The Haven: from $42,500 — 3–4 bed/2 bath, residential feel, family-focused
- The Peak: from $49,900 — 3–4 bed/2–3 bath, architectural angled roof, premium feel
- The Duo: from $54,900 — 4 bed/2–3 bath, largest model, dual-use, maximum space

CUSTOMISATION OPTIONS (all models):
- Finishes: Standard (included), Premium (+$3,000), Luxury (+$8,000)
- Colours: Neutral (included), Warm/Cool (+$500 each), Bold (+$1,000)
- Layout: Default (included), Extended (+$5,000), Compact (−$2,000)
- Upgrades: Solar panels (+$4,500), Smart home (+$3,200), Premium appliances (+$2,800), Extended deck (+$2,200), Off-grid water (+$5,500), Ducted A/C (+$3,800)

PAYMENT: 30% deposit secures the build. Balance is due before delivery. Payment via Stripe.

HOW TO HELP:
- If someone gives a budget, recommend the best-fitting model
- Explain the configurator and how live pricing works
- Encourage them to browse models and start configuring
- Be warm, confident, and concise — max 3 sentences per reply unless asked for more detail
- Never make up specs or prices beyond what's listed above`;

const QUICK_PROMPTS = [
  "What's your most popular model?",
  "I have a $45K budget",
  "How does the deposit work?",
  "What upgrades do you recommend?",
];

function getFallbackReply(input) {
  const text = input.toLowerCase();

  if (text.includes('45') || text.includes('budget')) {
    return 'With a $45K budget, The Haven ($42,500) is the best full-feature option, and The Veranda ($39,900) leaves room for upgrades like Smart Home or Premium Appliances.';
  }

  if (text.includes('popular') || text.includes('best seller')) {
    return 'Our most popular model is The Veranda from $39,900. It balances layout, curb appeal, and practical living space.';
  }

  if (text.includes('deposit') || text.includes('payment')) {
    return 'Payment is 30% upfront to secure your build slot, with the remaining 70% due before delivery.';
  }

  if (text.includes('upgrade') || text.includes('solar') || text.includes('smart')) {
    return 'Top upgrades are Solar Panels (+$4,500), Smart Home (+$3,200), and Ducted A/C (+$3,800). These usually add the most long-term value.';
  }

  if (text.includes('layout') || text.includes('colour') || text.includes('color')) {
    return 'Use the 3D Studio from any model page to choose layout and colours, then submit your design for review.';
  }

  return 'I can help with model recommendations, pricing, upgrades, and deposit steps. Tell me your budget and preferred bedrooms and I will suggest the best fit.';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your ClimaForge AI Advisor. Tell me your budget or what you're looking for and I'll recommend the perfect model.", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { text: msg, isBot: false }]);
    setInput('');
    setIsTyping(true);

    if (!OPENAI_API_KEY) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: getFallbackReply(msg), isBot: true }]);
        setIsTyping(false);
      }, 350);
      return;
    }

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.isBot ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: msg },
        ],
        max_tokens: 200,
      });
      const reply = completion.choices[0].message.content;
      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
    } catch {
      setMessages((prev) => [...prev, { text: `${getFallbackReply(msg)} If you want a tailored quote now, submit the contact form and our team will follow up.`, isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '56px',
          height: '56px',
          background: '#1C1C1C',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          fontSize: '1.4rem',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#4A4F48'; e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = '#1C1C1C'; e.currentTarget.style.transform = 'scale(1)'; }}
        aria-label="Open AI chat"
      >
        {isOpen ? '✕' : '✦'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '98px',
            right: '28px',
            width: '380px',
            maxWidth: 'calc(100vw - 40px)',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 16px 60px rgba(0,0,0,0.18)',
            border: '1px solid #E7E3DC',
            overflow: 'hidden',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ background: '#1C1C1C', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: '#4A4F48', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>✦</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>ClimaForge AI Advisor</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Ask me anything about our homes</p>
            </div>
            <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} title="Online" />
          </div>

          {/* Messages */}
          <div style={{ height: '340px', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.isBot ? 'flex-start' : 'flex-end' }}>
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: msg.isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    background: msg.isBot ? '#F5F3EF' : '#1C1C1C',
                    color: msg.isBot ? '#1C1C1C' : '#fff',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '10px 14px', background: '#F5F3EF', borderRadius: '4px 14px 14px 14px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#B8B1A6', animation: 'bounce 0.8s infinite', animationDelay: `${delay}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  style={{ background: '#F5F3EF', border: '1px solid #E7E3DC', borderRadius: '20px', padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer', color: '#1C1C1C', transition: 'background 0.15s' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#E7E3DC')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '#F5F3EF')}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #E7E3DC', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask about models, pricing, delivery…"
              disabled={isTyping}
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #E7E3DC', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', background: '#fafafa', color: '#1C1C1C' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              style={{ padding: '10px 16px', background: '#1C1C1C', color: '#fff', border: 'none', borderRadius: '8px', cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer', opacity: isTyping || !input.trim() ? 0.5 : 1, fontWeight: 600, fontSize: '0.85rem' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </>
  );
}

