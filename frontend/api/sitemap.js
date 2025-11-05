export default async function handler(req, res) {
  try {
    const response = await fetch("https://dynezel-news.onrender.com/sitemap.xml");

    if (!response.ok) {
      return res.status(500).send("Error al obtener el sitemap desde el servidor backend.");
    }

    const xml = await response.text();

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("❌ Error al servir sitemap:", error);
    res.status(500).send("Error interno del servidor.");
  }
}