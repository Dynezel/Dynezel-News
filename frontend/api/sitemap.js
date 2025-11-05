export default async function handler(req, res) {
  try {
    const backendUrl = "https://dynezel-news.onrender.com/sitemap.xml";
    const response = await fetch(backendUrl);

    if (!response.ok) {
      console.error("❌ Error al obtener sitemap:", response.status, response.statusText);
      return res.status(500).send("Error al obtener el sitemap desde el backend.");
    }

    let xml = await response.text();

    // 🧠 Reemplazar dominio backend → frontend
    xml = xml.replaceAll(
      /https:\/\/dynezel-news\.onrender\.com/g,
      "https://dynezel-news.vercel.app"
    );

    // ✅ Asegurar encabezado XML correcto
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  } catch (error) {
    console.error("🔥 Error en sitemap handler:", error);
    res.status(500).send("Error interno del servidor.");
  }
}
