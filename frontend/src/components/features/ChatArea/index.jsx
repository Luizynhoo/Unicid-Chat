import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MessageBubble, TypingIndicator } from '../../shared/MessageBubble';
import { ChatInput } from '../../shared/ChatInput';
import './ChatArea.css';

export function ChatArea({ messages, input, onInputChange, onSend, onNewConversation, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section className="chat-area" aria-label="Área do chat">
      {/* ── Header ── */}
      <header className="chat-area__header">
        <div className="chat-area__header-left">
          <button className="chat-area__menu-btn" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
          <div className="chat-area__header-title">
            <svg className="chat-area__header-icon" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="chat-area__title">Assistente Virtual UNICID</h1>
          </div>
        </div>

        <button className="chat-area__new-btn" onClick={onNewConversation} aria-label="Nova conversa">
          <Plus size={16} />
          Nova conversa
        </button>
      </header>

      {/* ── Messages ── */}
      <main className="chat-area__messages" role="log" aria-live="polite" aria-label="Mensagens">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" />
      </main>

      {/* ── Input ── */}
      <ChatInput
        value={input}
        onChange={onInputChange}
        onSend={onSend}
        disabled={isTyping}
      />
    </section>
  );
}
