export default async function handler(req, res) {
  try {
    const response = await fetch("https://dynezel-news.onrender.com/robots.txt");

    if (!response.ok) {
      return res.status(500).send("Error al obtener robots.txt desde el backend.");
    }

    const text = await response.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(text);
  } catch (error) {
    console.error("❌ Error al servir robots.txt:", error);
    res.status(500).send("Error interno del servidor.");
  }
}