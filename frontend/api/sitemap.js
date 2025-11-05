export default async function handler(req, res) {
  try {
    const backendUrl = "https://dynezel-news.onrender.com/sitemap.xml";

    const response = await fetch(backendUrl);

    if (!response.ok) {
      console.error("❌ Error al obtener sitemap:", response.status, response.statusText);
      return res.status(500).send("Error al obtener el sitemap desde el servidor backend.");
    }

    const xml = await response.text();

    // ⚠️ Evita que Vercel intente procesarlo como JSON
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  } catch (error) {
    console.error("🔥 Error en handler sitemap:", error);
    res.status(500).send("Error interno del servidor.");
  }
}