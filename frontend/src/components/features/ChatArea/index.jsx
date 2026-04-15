import React, { useRef, useEffect } from 'react';
import { Plus, MessageSquare, AlignLeft } from 'lucide-react';
import { MessageBubble, TypingIndicator } from '../../shared/MessageBubble';
import { ChatInput } from '../../shared/ChatInput';
import './ChatArea.css';

export function ChatArea({
  messages,
  input,
  onInputChange,
  onSend,
  onNewConversation,
  isTyping,
  onOpenModal,
  onFeedback,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section className="chat-area" aria-label="Área do chat">

      {/* ── Header ── */}
      <header className="chat-area__header">
        <div className="chat-area__header-left">
          <button className="chat-area__menu-btn" aria-label="Abrir menu">
            <AlignLeft size={18} />
          </button>

          <div className="chat-area__header-brand">
            <span className="chat-area__header-logo">
              <MessageSquare size={14} />
            </span>
            <span className="chat-area__title">Assistente Virtual UNICID</span>
          </div>
        </div>

        <div className="chat-area__header-right">
          <span className="chat-area__status-dot" aria-hidden="true" />
          <span className="chat-area__status-label">Online</span>

          <button
            className="chat-area__new-btn"
            onClick={onNewConversation}
            aria-label="Nova conversa"
          >
            <Plus size={14} />
            Nova conversa
          </button>
        </div>
      </header>

      {/* ── Messages ── */}
      <main
        className="chat-area__messages"
        role="log"
        aria-live="polite"
        aria-label="Mensagens"
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className="chat-area__message-row"
            style={{ '--i': index }}
          >
            <MessageBubble
              key={msg.id}
              message={msg}
              onOpenModal={onOpenModal}
              onFeedback={onFeedback}
            />

            {/* Agendar CTA — integrado abaixo da bolha */}
            {msg.showAgendar && (
              <div className="chat-area__action-row">
                <button onClick={onOpenModal} className="chat-area__agendar-btn">
                  Agendar atendimento presencial
                </button>
              </div>
            )}

            {/* Feedback — sutil, abaixo de cada resposta do assistente */}
            {msg.role === 'assistant' && (
              <div className="chat-area__feedback">
                <span className="chat-area__feedback-label">Isso foi útil?</span>
                <button
                  className="chat-area__feedback-btn chat-area__feedback-btn--up"
                  onClick={() => onFeedback(true)}
                  aria-label="Resposta útil"
                >
                  👍
                </button>
                <button
                  className="chat-area__feedback-btn chat-area__feedback-btn--down"
                  onClick={() => onFeedback(false)}
                  aria-label="Resposta não útil"
                >
                  👎
                </button>
              </div>
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" style={{ height: 1 }} />
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