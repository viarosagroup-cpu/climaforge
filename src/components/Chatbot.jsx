import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm ClimaForge AI Assistant. How can I help you with modular homes today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are ClimaForge AI Assistant, an expert on modular homes. Help customers with information about models, pricing, customization, delivery, and quotes. Be helpful, professional, and concise.' },
          ...messages.map(m => ({ role: m.isBot ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: input }
        ],
        max_tokens: 150
      });

      const reply = completion.choices[0].message.content;
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      console.error('OpenAI error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again or contact us directly.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#1C1C1C] hover:bg-[#4A4F48] text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-all"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-[#B8B1A6] overflow-hidden z-50">
          <div className="bg-[#1C1C1C] text-white p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">ClimaForge AI Assistant</p>
              <p className="text-xs opacity-70">Powered by AI</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-xl">✕</button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.isBot ? 'bg-[#F5F3EF] text-[#1C1C1C]' : 'bg-[#4A4F48] text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#F5F3EF] text-[#1C1C1C] p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#B8B1A6] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#B8B1A6] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#B8B1A6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#E7E3DC]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-[#B8B1A6] rounded-lg focus:outline-none focus:border-[#4A4F48]"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || !input.trim()}
                className="px-4 py-2 bg-[#4A4F48] text-white rounded-lg hover:bg-[#1C1C1C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
