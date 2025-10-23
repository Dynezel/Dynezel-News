import { useEffect, useRef, useState } from "react";

export default function Publicidades() {
  const containerRef = useRef(null);
  const socialBarAdded = useRef(false);
  const [blocksCount, setBlocksCount] = useState(0);

  // Función para crear scripts
  const createScript = (src, async = true) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    return script;
  };

  // Crear un bloque con TODOS los anuncios
  const addExtremeAdBlock = () => {
    if (!containerRef.current) return;

    const blockWrapper = document.createElement("div");
    blockWrapper.style.margin = "25px 0";
    blockWrapper.style.textAlign = "center";
    blockWrapper.style.border = "2px solid #f0f0f0";
    blockWrapper.style.padding = "15px";
    blockWrapper.style.backgroundColor = "#fff9e6";

    // Banner 300x250
    window.atOptions = {
      key: "5e168af377442dcd43ef7f4999dae819",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };
    blockWrapper.appendChild(
      createScript(
        "//www.highperformanceformat.com/5e168af377442dcd43ef7f4999dae819/invoke.js"
      )
    );

    // Banner 320x50
    window.atOptions = {
      key: "df786ecbc0198d98c3ece48457615f76",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };
    blockWrapper.appendChild(
      createScript(
        "//www.highperformanceformat.com/df786ecbc0198d98c3ece48457615f76/invoke.js"
      )
    );

    // Native Banner
    const containerNative = document.createElement("div");
    containerNative.id = `container-feb5072d03cb15bc5abe1c885dd6e313-${blocksCount}`;
    blockWrapper.appendChild(containerNative);
    blockWrapper.appendChild(
      createScript(
        "//pl27912708.effectivegatecpm.com/feb5072d03cb15bc5abe1c885dd6e313/invoke.js"
      )
    );

    // Smartlink
    const link = document.createElement("a");
    link.href =
      "https://www.effectivegatecpm.com/a0k4dfde5j?key=342c6df7fbcb7758465cf00fa38051d4";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerText = "🔗 Ver Oferta";
    link.style.display = "block";
    link.style.margin = "10px 0";
    blockWrapper.appendChild(link);

    // Popunder
    blockWrapper.appendChild(
      createScript(
        "//pl27912701.effectivegatecpm.com/02/2f/40/022f40f31ed89c503cc29279a0d2de57.js"
      )
    );

    containerRef.current.appendChild(blockWrapper);
    setBlocksCount((prev) => prev + 1);
  };

  // Bloques iniciales
  useEffect(() => {
    const initialBlocks = 3; // 3 bloques de inicio
    for (let i = 0; i < initialBlocks; i++) addExtremeAdBlock();
  }, []);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        const blocksToAdd = 2; // 2 bloques por scroll
        for (let i = 0; i < blocksToAdd; i++) addExtremeAdBlock();

        // Social Bar al final, solo una vez
        if (!socialBarAdded.current && scrollTop + clientHeight >= scrollHeight - 50) {
          const socialBarWrapper = document.createElement("div");
          socialBarWrapper.style.margin = "30px 0";
          socialBarWrapper.style.textAlign = "center";
          socialBarWrapper.appendChild(
            createScript(
              "//pl27912697.effectivegatecpm.com/4d/d5/c1/4dd5c130e5d831b8770dc2cddc1b6122.js"
            )
          );
          containerRef.current.appendChild(socialBarWrapper);
          socialBarAdded.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blocksCount]);

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
        Publicidades
      </h1>
    </div>
  );
}
