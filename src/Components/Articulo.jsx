import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Articulo() {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;// ✅ cambia si tu dominio final es otro

  // 📰 Fetch del artículo
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/articulos/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Artículo no encontrado");
        return res.json();
      })
      .then(data => setArticulo(data))
      .catch(err => {
        console.error(err);
        setArticulo({ error: true });
      });
  }, [slug]);

  // 🧠 SEO dinámico por artículo
  useEffect(() => {
    if (!articulo || articulo.error) return;

    // 🏷️ Título
    const title = `${articulo.titulo} — Dynezel News`;
    document.title = title;

    // 📝 Descripción (prioriza la del artículo o genera una automática)
    const descContent =
      articulo.descripcion ||
      articulo.contenido?.find(b => b.tipo === "p")?.texto?.slice(0, 160) ||
      "Lee las últimas noticias en Dynezel News.";

    // 🔗 URL absoluta del artículo
    const canonicalUrl = `${BACKEND_URL}/articulo/${articulo.slug}`;

    // 🖼️ Imagen destacada (primera del contenido o fallback)
    const img =
      articulo.contenido?.find(b => b.tipo === "img")?.src ||
      "/images/og-default.jpg";
    const fullImgUrl = img.startsWith("http") ? img : `${BACKEND_URL}${img}`;

    // --- Actualizar o crear meta tags ---
    const ensureMeta = (attr, name, content) => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Description
    ensureMeta("name", "description", descContent);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // Open Graph
    const ogTags = [
      ["og:type", "article"],
      ["og:title", articulo.titulo],
      ["og:description", descContent],
      ["og:url", canonicalUrl],
      ["og:image", fullImgUrl],
      ["og:site_name", "Dynezel News"],
    ];
    ogTags.forEach(([property, content]) =>
      ensureMeta("property", property, content)
    );

    // Twitter
    const twitterTags = [
      ["twitter:card", "summary_large_image"],
      ["twitter:title", articulo.titulo],
      ["twitter:description", descContent],
      ["twitter:image", fullImgUrl],
      ["twitter:site", "@DynezelNews"], // opcional: tu handle si tenés cuenta de X/Twitter
    ];
    twitterTags.forEach(([name, content]) =>
      ensureMeta("name", name, content)
    );
  }, [articulo, BACKEND_URL]);

  // --- Render ---
  if (!articulo) return <p className="loading">Cargando artículo...</p>;
  if (articulo.error) return <p className="not-found">❌ Artículo no encontrado.</p>;

  return (
    <div className="container">
      <main className="article-container">
        <Link to="/" className="back-link">← Volver</Link>

        <h1 className="article-main-title">{articulo.titulo}</h1>
        <p className="article-meta">
          <em>
            {articulo.autorTraduccion || articulo.autor} —{" "}
            {articulo.fechaPublicacion || articulo.fecha}
          </em>
        </p>

        {articulo.fuente && (
          <p className="article-source">
            Basado en: “{articulo.fuente.tituloOriginal}” —{" "}
            {articulo.fuente.medio} ({articulo.fuente.fecha})
          </p>
        )}

        <div className="article-body">
          {articulo.contenido?.map((bloque, i) => {
            switch (bloque.tipo) {
              case "p":
                return <p key={i}>{bloque.texto}</p>;
              case "span":
                return <span key={i}>{bloque.texto}</span>;
              case "cita":
                return (
                  <blockquote key={i} className="article-quote">
                    “{bloque.texto}”
                  </blockquote>
                );
              case "img":
                return (
                  <div key={i} className="article-image-center">
                    <img
                      src={`${BACKEND_URL}${bloque.src}`}
                      alt={bloque.alt || articulo.titulo}
                      loading="lazy"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {articulo.fuente?.enlace && (
          <p className="article-link">
            🔗 Fuente original:{" "}
            <a href={articulo.fuente.enlace} target="_blank" rel="noopener noreferrer">
              {articulo.fuente.medio}
            </a>
          </p>
        )}
      </main>
    </div>
  );
}