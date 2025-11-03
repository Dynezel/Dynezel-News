import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [articulos, setArticulos] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // 📰 Cargar artículos
    fetch(`${BACKEND_URL}/api/articulos`)
      .then(res => res.json())
      .then(data => setArticulos(data))
      .catch(err => console.error("Error cargando artículos:", err));
  // 🧠 SEO dinámico de Homepage
  const title = "Dynezel News — Noticias independientes en español";
  document.title = title;

  const desc =
    "Últimas noticias independientes en español. Cobertura completa de deportes, política y actualidad en Dynezel News.";

  const ensureMeta = (attr, name, content) => {
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // Meta description
  ensureMeta("name", "description", desc);

  // Canonical
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", BACKEND_URL);

  // Open Graph
  const ogTags = [
    ["og:type", "website"],
    ["og:title", title],
    ["og:description", desc],
    ["og:url", BACKEND_URL],
    ["og:site_name", "Dynezel News"],
    ["og:image", `${BACKEND_URL}/images/og-default.jpg`],
  ];
  ogTags.forEach(([property, content]) =>
    ensureMeta("property", property, content)
  );

  // Twitter
  const twitterTags = [
    ["twitter:card", "summary_large_image"],
    ["twitter:title", title],
    ["twitter:description", desc],
    ["twitter:image", `${BACKEND_URL}/images/og-default.jpg`],
    ["twitter:site", "@DynezelNews"],
  ];
  twitterTags.forEach(([name, content]) =>
    ensureMeta("name", name, content)
  );
}, [BACKEND_URL]);

  return (
    <div className="container">
      <main className="main-content">
        <section className="articles-list">
          <ul>
            {articulos.map(a => {
              const primeraImagen = a.contenido.find(b => b.tipo === "img");
              return (
                <li key={a.id} className="article-item">
                  {primeraImagen && (
                    <div className="article-image">
                      <img
                        src={`${BACKEND_URL}${primeraImagen.src}`}
                        alt={primeraImagen.alt || a.titulo}
                        loading="lazy" // 🚀 Mejora de rendimiento
                      />
                    </div>
                  )}
                  <div className="article-text">
                    <Link to={`/articulo/${a.slug}`} className="article-title">
                      {a.titulo}
                    </Link>
                    <p className="article-meta">
                      <em>{a.autorTraduccion} — {a.fechaPublicacion}</em>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="sidebar">
          <h2>Últimas noticias</h2>
          <ul>
            {articulos.slice(0, 5).map(a => (
              <li key={a.id}>
                <Link to={`/articulo/${a.slug}`} className="sidebar-link">
                  {a.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="news-footer">
        © 2025 Dynezel News — Noticias independientes en español
      </footer>
    </div>
  );
}