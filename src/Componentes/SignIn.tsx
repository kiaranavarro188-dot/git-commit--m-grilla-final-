import React, { useState } from 'react';
import './SignIn.css';

export interface SignInProps {
  onSignIn?: (credentials: { username?: string; password?: string }) => void;
  onClose?: () => void;
  title?: string;
  logoUrl?: string; // Optional custom logo
}

export default function SignIn({
  onSignIn,
  onClose,
  title = "ACCESO AL SISTEMA",
  logoUrl
}: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn({ username, password });
    } else {
      console.log('Login credentials:', { username, password });
    }
  };

  return (
    <div className="signin-overlay">
      <div className="signin-modal">
        {/* Close Button X */}
        <button className="signin-close" onClick={onClose} aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Logo Circular */}
        <div className="signin-logo-container">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="signin-logo-img" />
          ) : (
            <div className="signin-logo-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
          )}
        </div>

        {/* Título y línea decorativa */}
        <h2 className="signin-title">{title}</h2>
        <div className="signin-decorator-line"></div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="signin-form-dark">

          <div className="signin-input-group">
            {/* Ícono de Usuario */}
            <svg className="signin-input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              type="text"
              className="signin-input-dark"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signin-input-group">
            {/* Ícono de Candado */}
            <svg className="signin-input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type="password"
              className="signin-input-dark"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de Acceso (Visible) */}
          <button type="submit" className="signin-submit-dark">Ingresar</button>

        </form>

        {/* Footer Links */}
        <div className="signin-footer-links">
          <a href="#nuevo" className="signin-link-dark">Nuevo usuario</a>
          <a href="#olvido" className="signin-link-dark">Olvidé mi contraseña</a>
        </div>

      </div>
    </div>
  );
}