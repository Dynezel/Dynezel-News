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

    // 🧠 SEO: título + meta description
    document.title = "Dynezel News — Noticias independientes en español";

    const descriptionContent =
      "Últimas noticias independientes en español. Cobertura completa de deportes, política y actualidad en Dynezel News.";

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", descriptionContent);

    // Open Graph tags (para compartir en redes sociales)
    const ogTags = [
      { property: "og:title", content: "Dynezel News — Noticias independientes en español" },
      { property: "og:description", content: descriptionContent },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BACKEND_URL}` },
    ];

    ogTags.forEach(tag => {
      let el = document.querySelector(`meta[property="${tag.property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", tag.content);
    });

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", `${BACKEND_URL}`);
  }, []);

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