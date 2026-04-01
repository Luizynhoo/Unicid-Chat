import React from 'react';
import { navItems } from '../../data/navItems';
import './Sidebar.css';
import logo from '../../assets/logo-negativo_17.svg';

export function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon" aria-hidden="true">
          <img src={logo} alt="Logo da aplicação" className="sidebar__logo-image" />
        </div>
        <span className="sidebar__logo-text">Minha Aplicação</span>
      </div>

      <nav className="sidebar__nav" aria-label="Menu principal">
        <ul className="sidebar__nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  className={[
                    'sidebar__nav-item',
                    isActive ? 'sidebar__nav-item--active' : '',
                    item.isHighlight ? 'sidebar__nav-item--highlight' : '',
                  ].join(' ').trim()}
                  onClick={() => onSelect(item.id)}
                >
                  <Icon className="sidebar__nav-icon" size={18} />

                  {item.isHighlight ? (
                    <span className="sidebar__highlight-content">
                      <span className="sidebar__highlight-text">
                        <small>ACESSO AO</small>
                        <strong>AMBIENTE VIRTUAL</strong>
                      </span>
                    </span>
                  ) : (
                    <span className="sidebar__nav-label">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
