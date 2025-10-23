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

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origin (por ejemplo desde curl o server-side)
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

// API de noticias
app.get("/api/articulos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data/articulos.json"), "utf-8"));
  res.json(data);
});

app.get("/api/articulos/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data/articulos.json"), "utf-8"));
  const articulo = data.find(a => a.id == req.params.id);
  if (!articulo) return res.status(404).json({ error: "No encontrado" });
  res.json(articulo);
});

app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
