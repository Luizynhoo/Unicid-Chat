import React from 'react';
import { welcomeCapabilities } from '../../../data/navItems';
import './WelcomeMessage.css';

export function WelcomeMessage() {
  return (
    <div className="welcome">
      <p className="welcome__greeting">
        Olá! Seja bem-vindo ao Assistente Virtual da UNICID.
      </p>

      <p className="welcome__subtitle">
        Estou aqui para ajudá-lo com:
      </p>

      <ul className="welcome__list">
        {welcomeCapabilities.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label} className="welcome__list-item">
              <span className="welcome__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              {item.label}
            </li>
          );
        })}
      </ul>

      <p className="welcome__cta">
        Como posso ajudá-lo hoje?
      </p>
    </div>
  );
}
