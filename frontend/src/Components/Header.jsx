import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="news-header">
      <div className="news-header-container">
        <Link to="/">
        <h1 className="news-title">🗞️ Dynezel News</h1>
        </Link>

        <nav className="news-nav">
          <Link to="/">Inicio</Link>
          <Link to="/publicidades">Publicidades</Link>

          {/* Botón de donación Ko-fi */}
          <a
            href="https://ko-fi.com/dynezel"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Invítame un café
          </a>
        </nav>
      </div>
    </header>
  );
}
