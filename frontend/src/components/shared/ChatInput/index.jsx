import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

export function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend(value);
    }
  }

  const hasContent = value.trim().length > 0;

  return (
    <div className="chat-input">
      <div className={`chat-input__wrapper${hasContent ? ' chat-input__wrapper--active' : ''}`}>
        <textarea
          ref={textareaRef}
          className="chat-input__textarea"
          placeholder="Digite a sua dúvida..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          aria-label="Campo de mensagem"
        />

        <button
          className={`chat-input__send${hasContent && !disabled ? ' chat-input__send--ready' : ''}`}
          onClick={() => onSend(value)}
          disabled={disabled || !hasContent}
          aria-label="Enviar mensagem"
        >
          <Send size={16} />
        </button>
      </div>

      <p className="chat-input__hint" aria-hidden="true">
        Enter para enviar · Shift + Enter para nova linha
      </p>
    </div>
  );
}