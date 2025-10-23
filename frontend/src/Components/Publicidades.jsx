import { useEffect, useRef, useState } from "react";

export default function Publicidades() {
  const containerRef = useRef(null);
  const socialBarAdded = useRef(false);
  const [adsCount, setAdsCount] = useState(0);

  // Función para agregar un bloque de anuncio
  const addAdBlock = () => {
    if (!containerRef.current) return;

    const adWrapper = document.createElement("div");
    adWrapper.style.margin = "20px 0";
    adWrapper.style.textAlign = "center";

    const adType = adsCount % 5; // Rotación 0-4
    switch (adType) {
      case 0: // Banner 300x250
        adWrapper.innerHTML = `
          <script type="text/javascript">
            window.atOptions = {
              key: "5e168af377442dcd43ef7f4999dae819",
              format: "iframe",
              height: 250,
              width: 300,
              params: {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/5e168af377442dcd43ef7f4999dae819/invoke.js"></script>
        `;
        break;
      case 1: // Banner 320x50
        adWrapper.innerHTML = `
          <script type="text/javascript">
            window.atOptions = {
              key: "df786ecbc0198d98c3ece48457615f76",
              format: "iframe",
              height: 50,
              width: 320,
              params: {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/df786ecbc0198d98c3ece48457615f76/invoke.js"></script>
        `;
        break;
      case 2: // Native Banner
        adWrapper.innerHTML = `
          <div id="container-feb5072d03cb15bc5abe1c885dd6e313"></div>
          <script async src="//pl27912708.effectivegatecpm.com/feb5072d03cb15bc5abe1c885dd6e313/invoke.js"></script>
        `;
        break;
      case 3: // Smartlink (solo enlace)
        adWrapper.innerHTML = `
          <a href="https://www.effectivegatecpm.com/a0k4dfde5j?key=342c6df7fbcb7758465cf00fa38051d4" target="_blank" rel="noopener noreferrer">
            🔗 Ver Oferta
          </a>
        `;
        break;
      case 4: // Popunder
        adWrapper.innerHTML = `
          <script type="text/javascript" src="//pl27912701.effectivegatecpm.com/02/2f/40/022f40f31ed89c503cc29279a0d2de57.js"></script>
        `;
        break;
      default:
        break;
    }

    containerRef.current.appendChild(adWrapper);
    setAdsCount(prev => prev + 1);
  };

  // Agregar bloques iniciales al cargar
  useEffect(() => {
    const initialBlocks = Math.floor(Math.random() * 3) + 5; // 5-7 bloques iniciales
    for (let i = 0; i < initialBlocks; i++) addAdBlock();
  }, []);

  // Scroll infinito extremo
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      // Agregar 2-3 bloques al acercarse al final
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        const blocksToAdd = Math.floor(Math.random() * 2) + 2; // 2-3 bloques
        for (let i = 0; i < blocksToAdd; i++) addAdBlock();

        // Social Bar al final, solo una vez
        if (!socialBarAdded.current && scrollTop + clientHeight >= scrollHeight - 50) {
          const socialBarWrapper = document.createElement("div");
          socialBarWrapper.style.margin = "30px 0";
          socialBarWrapper.style.textAlign = "center";
          socialBarWrapper.innerHTML = `<script type='text/javascript' src='//pl27912697.effectivegatecpm.com/4d/d5/c1/4dd5c130e5d831b8770dc2cddc1b6122.js'></script>`;
          containerRef.current.appendChild(socialBarWrapper);
          socialBarAdded.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [adsCount]);

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>💸 Publicidades sin fin</h1>
    </div>
  );
}