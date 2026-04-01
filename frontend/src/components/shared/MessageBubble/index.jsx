import React from 'react';
import { Bot } from 'lucide-react';
import { WelcomeMessage } from '../../features/WelcomeMessage';
import './MessageBubble.css';

export function MessageBubble({ message }) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`bubble bubble--${message.role}`}>
      {isAssistant && (
        <div className="bubble__avatar" aria-label="Assistente UNICID">
          <Bot size={18} />
        </div>
      )}

      <div className="bubble__body">
        {isAssistant && (
          <span className="bubble__sender">Assistente UNICID</span>
        )}
        <div className="bubble__content">
          {message.type === 'welcome'
            ? <WelcomeMessage />
            : <p className="bubble__text">{message.content}</p>
          }
        </div>
        <time className="bubble__time">
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit'
          })}
        </time>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="bubble bubble--assistant">
      <div className="bubble__avatar" aria-label="Assistente está digitando">
        <Bot size={18} />
      </div>
      <div className="bubble__body">
        <span className="bubble__sender">Assistente UNICID</span>
        <div className="bubble__content bubble__content--typing">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
