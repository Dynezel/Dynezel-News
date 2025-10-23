import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [articulos, setArticulos] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/articulos`)
      .then(res => res.json())
      .then(data => setArticulos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
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
                          alt={primeraImagen.alt}
                        />
                      </div>
                    )}
                    <div className="article-text">
                      <Link to={`/articulo/${a.id}`} className="article-title">
                        {a.titulo}
                      </Link>
                      <p className="article-meta">
                        <em>{a.autorTraduccion} -- {a.fechaPublicacion}</em>
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
                  <Link to={`/articulo/${a.id}`} className="sidebar-link">
                    {a.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </main>

        <footer className="news-footer">
          © 2025 Dynezel News -- Noticias independientes en español
        </footer>
      </div>
    </>
  );
}