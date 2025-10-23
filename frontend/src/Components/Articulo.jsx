import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Articulo() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/articulos/${id}`)
      .then(res => res.json())
      .then(data => setArticulo(data))
      .catch(err => console.error(err));
  }, [id]);

  //useEffect para ads:
  useEffect(() => {
  const script1 = document.createElement("script");
  script1.type = "text/javascript";
  script1.innerHTML = `
    atOptions = {
      'key' : '5e168af377442dcd43ef7f4999dae819',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  `;
  const script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.src = "//www.highperformanceformat.com/5e168af377442dcd43ef7f4999dae819/invoke.js";

  const adContainer = document.getElementById("adsterra-article-banner");
  if (adContainer) {
    adContainer.appendChild(script1);
    adContainer.appendChild(script2);
  }

  return () => {
    if (adContainer) adContainer.innerHTML = "";
  };
}, []);

  if (!articulo) return <p className="loading">Cargando artículo...</p>;

  return (
    <div className="container">
      <main className="article-container">
        <Link to="/" className="back-link">← Volver</Link>

        <h1 className="article-main-title">{articulo.titulo}</h1>
        <p className="article-meta">
          <em>{articulo.autorTraduccion || articulo.autor} — {articulo.fechaPublicacion || articulo.fecha}</em>
        </p>

        {articulo.fuente && (
          <p className="article-source">
            Basado en: “{articulo.fuente.tituloOriginal}” — {articulo.fuente.medio} ({articulo.fuente.fecha})
          </p>
        )}

        <div className="article-body">
          {articulo.contenido.map((bloque, i) => {
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
                      alt={bloque.alt}
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
        <div id="adsterra-article-banner" style={{ textAlign: "center", marginTop: "25px" }}></div>
      </main>
    </div>
  );
}
