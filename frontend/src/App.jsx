import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import Articulo from "./Components/Articulo";
import Header from "./Components/Header";
import "./css/base.css";
import "./css/layout.css";
import "./css/homepage.css";
import "./css/articulo.css";
import "./css/responsive.css";

// ✅ Layout global con Header
function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
    </>
  );
}

// ✅ Crear rutas con JSX (recomendado en v7)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path="articulo/:id" element={<Articulo />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
