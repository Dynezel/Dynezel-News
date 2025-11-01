import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

// 🔤 Función para generar slug a partir del título
function generarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "") // quita caracteres especiales (mantiene letras, números y guiones)
    .trim()
    .replace(/\s+/g, "-") // reemplaza espacios por guiones
    .replace(/-+/g, "-"); // colapsa guiones múltiples
}

// 📦 Ruta del archivo JSON
const dataPath = path.join(__dirname, "data/articulos.json");

// 🧠 Cargar artículos y generar slugs si faltan
function cargarArticulos() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  let modificado = false;

  data.forEach(articulo => {
    if (!articulo.slug) {
      articulo.slug = generarSlug(articulo.titulo);
      modificado = true;
      console.log(`🆕 Generado slug para: ${articulo.titulo} → ${articulo.slug}`);
    }
  });

  // Si se generó algún slug nuevo, guardar el archivo actualizado
  if (modificado) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    console.log("💾 Archivo articulos.json actualizado con nuevos slugs.");
  }

  return data;
}

// 🚀 Cargar al iniciar el servidor
let articulos = cargarArticulos();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`❌ Bloqueado por CORS: ${origin}`);
    return callback(new Error("No permitido por CORS"));
  },
  methods: ["GET"],
  credentials: true,
}));

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// 📰 API de noticias
app.get("/api/articulos", (req, res) => {
  const sortedData = [...articulos].sort((a, b) => b.id - a.id);
  res.json(sortedData);
});

// ✅ Compatibilidad vieja: buscar por ID directo
app.get("/api/articulos/id/:id", (req, res) => {
  const articulo = articulos.find(a => a.id == req.params.id);
  if (!articulo) return res.status(404).json({ error: "No encontrado" });
  res.json(articulo);
});

// ✅ NUEVA: redirigir automáticamente /api/articulos/12 → /api/articulos/slug
app.get("/api/articulos/:id(\\d+)", (req, res) => {
  const articulo = articulos.find(a => a.id == req.params.id);
  if (!articulo) return res.status(404).json({ error: "No encontrado" });

  // Construir nueva URL
  const nuevaUrl = `/api/articulos/${articulo.slug}`;
  console.log(`↪️ Redirigiendo ${req.originalUrl} → ${nuevaUrl}`);

  return res.redirect(301, nuevaUrl);
});

// ✅ Buscar por slug (nuevo)
app.get("/api/articulos/:slug", (req, res) => {
  const articulo = articulos.find(a => a.slug === req.params.slug);
  if (!articulo) return res.status(404).json({ error: "No encontrado" });
  res.json(articulo);
});

app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
