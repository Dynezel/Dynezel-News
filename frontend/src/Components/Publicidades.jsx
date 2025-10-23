import { useEffect, useRef, useState } from "react";

export default function Publicidades() {
  const containerRef = useRef(null);
  const [adsCount, setAdsCount] = useState(0);
  const socialBarAdded = useRef(false);

  const addAdBlock = () => {
    if (!containerRef.current) return;

    const adWrapper = document.createElement("div");
    adWrapper.style.margin = "25px 0";
    adWrapper.style.textAlign = "center";

    const adType = adsCount % 5; // alterna entre 5 tipos de anuncios

    switch (adType) {
      case 0:
        adWrapper.innerHTML = `
          <script type="text/javascript">
            atOptions = {
              'key' : '5e168af377442dcd43ef7f4999dae819',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/5e168af377442dcd43ef7f4999dae819/invoke.js"></script>
        `;
        break;

      case 1:
        adWrapper.innerHTML = `
          <script type="text/javascript">
            atOptions = {
              'key' : 'df786ecbc0198d98c3ece48457615f76',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/df786ecbc0198d98c3ece48457615f76/invoke.js"></script>
        `;
        break;

      case 2:
        // 🔥 Native Banner (la tira de 4 anuncios)
        adWrapper.innerHTML = `
          <script async="async" data-cfasync="false" src="//pl27912708.effectivegatecpm.com/feb5072d03cb15bc5abe1c885dd6e313/invoke.js"></script>
          <div id="container-feb5072d03cb15bc5abe1c885dd6e313"></div>
        `;
        break;

      case 3:
        // Smartlink
        adWrapper.innerHTML = `
          <a href="https://www.effectivegatecpm.com/a0k4dfde5j?key=342c6df7fbcb7758465cf00fa38051d4"
             target="_blank" rel="noopener noreferrer"
             style="display:inline-block;padding:12px 18px;background:#007bff;color:white;border-radius:6px;text-decoration:none;">
             🔗 Ver oferta
          </a>
        `;
        break;

      case 4:
        // Popunder
        adWrapper.innerHTML = `
          <script type="text/javascript" src="//pl27912701.effectivegatecpm.com/02/2f/40/022f40f31ed89c503cc29279a0d2de57.js"></script>
        `;
        break;
    }

    containerRef.current.appendChild(adWrapper);
    setAdsCount((prev) => prev + 1);
  };

  // 🔹 Agrega varios bloques iniciales al cargar
  useEffect(() => {
    const initialBlocks = Math.floor(Math.random() * 3) + 6; // entre 6 y 8
    for (let i = 0; i < initialBlocks; i++) addAdBlock();
  }, []);

  // 🔹 Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        const blocksToAdd = Math.floor(Math.random() * 3) + 2; // agrega entre 2 y 4 anuncios
        for (let i = 0; i < blocksToAdd; i++) addAdBlock();

        // Social Bar al final, una sola vez
        if (!socialBarAdded.current && scrollTop + clientHeight >= scrollHeight - 50) {
          const socialBarWrapper = document.createElement("div");
          socialBarWrapper.style.margin = "40px 0";
          socialBarWrapper.style.textAlign = "center";
          socialBarWrapper.innerHTML = `
            <script type='text/javascript' src='//pl27912697.effectivegatecpm.com/4d/d5/c1/4dd5c130e5d831b8770dc2cddc1b6122.js'></script>
          `;
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
        background: "#fefdfb",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        💸 Publicidades sin fin
      </h1>
    </div>
  );
}