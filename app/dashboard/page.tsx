'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg p-4 sticky top-0 z-10 border-b border-gray-700">
        <h1 className="text-lg font-semibold text-center text-white">ChatGPT Mobile Clone</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <div className="bg-gray-800 rounded-lg p-3 shadow-lg max-w-[85%] self-end border border-gray-700">
              <p className="text-sm text-gray-200">{msg}</p>
            </div>
            <span className="text-xs text-gray-400 self-end mt-1">You</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
        <div className="flex gap-2">
          <textarea
            className="flex-1 resize-none rounded-lg bg-gray-700 border border-gray-600 p-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type a message..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ maxHeight: '100px' }}
          />
          <button
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
