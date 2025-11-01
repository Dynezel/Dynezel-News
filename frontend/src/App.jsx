import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
  Navigate,
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import Articulo from "./Components/Articulo";
import Header from "./Components/Header";
import Publicidades from "./Components/Publicidades";
import "./css/base.css";
import "./css/layout.css";
import "./css/homepage.css";
import "./css/articulo.css";
import "./css/responsive.css";

// Layout global con Header
function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// ruta intermedia para redirigir ID → slug
function RedireccionPorId() {
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // estado para controlar la redirección
  const [slug, setSlug] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/articulos/id/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => setSlug(data.slug))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <Navigate to="/" replace />;
  if (!slug) return <p className="loading">Redirigiendo...</p>;

  // redirigir al slug final
  return <Navigate to={`/articulo/${slug}`} replace />;
}

// Crear rutas con JSX (v7)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
      {/* Primero, si el parámetro es numérico → redirige */}
      <Route path="articulo/:id" element={<RedireccionPorId />} />
      {/* Luego la ruta normal por slug */}
      <Route path="articulo/:slug" element={<Articulo />} />
      <Route path="/publicidades" element={<Publicidades />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
