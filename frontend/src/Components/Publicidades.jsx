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
    adWrapper.style.padding = "10px";
    adWrapper.style.border = "1px solid #eee";
    adWrapper.style.backgroundColor = "#fff9e6";

    const adType = adsCount % 5;

    switch (adType) {
      case 0: {
        // Banner 300x250
        window.atOptions = {
          key: "5e168af377442dcd43ef7f4999dae819",
          format: "iframe",
          height: 250,
          width: 300,
          params: {},
        };
        const script1 = document.createElement("script");
        script1.src = "//www.highperformanceformat.com/5e168af377442dcd43ef7f4999dae819/invoke.js";
        script1.async = true;
        adWrapper.appendChild(script1);
        break;
      }
      case 1: {
        // Banner 320x50
        window.atOptions = {
          key: "df786ecbc0198d98c3ece48457615f76",
          format: "iframe",
          height: 50,
          width: 320,
          params: {},
        };
        const script2 = document.createElement("script");
        script2.src = "//www.highperformanceformat.com/df786ecbc0198d98c3ece48457615f76/invoke.js";
        script2.async = true;
        adWrapper.appendChild(script2);
        break;
      }
      case 2: {
        // Native Banner
        const nativeId = `container-feb5072d03cb15bc5abe1c885dd6e313-${adsCount}`;
        const containerNative = document.createElement("div");
        containerNative.id = nativeId;
        adWrapper.appendChild(containerNative);

        const nativeScript = document.createElement("script");
        nativeScript.src = "//pl27912708.effectivegatecpm.com/feb5072d03cb15bc5abe1c885dd6e313/invoke.js";
        nativeScript.async = true;
        adWrapper.appendChild(nativeScript);
        break;
      }
      case 3: {
        // Smartlink
        const link = document.createElement("a");
        link.href = "https://www.effectivegatecpm.com/a0k4dfde5j?key=342c6df7fbcb7758465cf00fa38051d4";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerText = "🔗 Ver Oferta";
        link.style.display = "block";
        link.style.margin = "10px 0";
        adWrapper.appendChild(link);
        break;
      }
      case 4: {
        // Popunder
        const popScript = document.createElement("script");
        popScript.src = "//pl27912701.effectivegatecpm.com/02/2f/40/022f40f31ed89c503cc29279a0d2de57.js";
        popScript.async = true;
        adWrapper.appendChild(popScript);
        break;
      }
      default:
        break;
    }

    containerRef.current.appendChild(adWrapper);
    setAdsCount(prev => prev + 1);
  };

  // Bloques iniciales
  useEffect(() => {
    for (let i = 0; i < 7; i++) addAdBlock(); // 7 bloques iniciales
  }, []);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        const blocksToAdd = Math.floor(Math.random() * 2) + 2; // 2-3 bloques
        for (let i = 0; i < blocksToAdd; i++) addAdBlock();

        // Social Bar al final, solo una vez
        if (!socialBarAdded.current && scrollTop + clientHeight >= scrollHeight - 50) {
          const socialBarWrapper = document.createElement("div");
          socialBarWrapper.style.margin = "30px 0";
          socialBarWrapper.style.textAlign = "center";
          const socialScript = document.createElement("script");
          socialScript.src = "//pl27912697.effectivegatecpm.com/4d/d5/c1/4dd5c130e5d831b8770dc2cddc1b6122.js";
          socialScript.async = true;
          socialBarWrapper.appendChild(socialScript);
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
        maxWidth: "950px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fdf6f0",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        💸 Publicidades sin fin
      </h1>
    </div>
  );
}