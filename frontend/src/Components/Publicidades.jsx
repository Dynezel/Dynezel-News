import { useEffect, useRef, useState } from "react";

export default function Publicidades() {
  const containerRef = useRef(null);
  const [adsCount, setAdsCount] = useState(0);
  const socialBarAdded = useRef(false);

  const executeScripts = (element) => {
    const scripts = element.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) newScript.src = oldScript.src;
      else newScript.textContent = oldScript.textContent;
      newScript.async = true;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  };

  // 🔥 Banner prioritario 728x90
  const getBanner728x90 = () => `
    <script type="text/javascript">
      atOptions = {
        'key' : '46f320f0867772036096c5feffd25336',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//www.highperformanceformat.com/46f320f0867772036096c5feffd25336/invoke.js"></script>
  `;

  // 🔹 Banner secundario 300x250
  const getBanner300x250 = () => `
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

  // 🔹 Native Banner
  const getNativeBanner = () => `
    <script async="async" data-cfasync="false" src="//pl27912708.effectivegatecpm.com/feb5072d03cb15bc5abe1c885dd6e313/invoke.js"></script>
    <div id="container-feb5072d03cb15bc5abe1c885dd6e313"></div>
  `;

  const addAdBlock = () => {
    if (!containerRef.current) return;

    const adWrapper = document.createElement("div");
    adWrapper.style.margin = "20px 0";
    adWrapper.style.textAlign = "center";

    // 🔁 Priorizamos banners que pagan
    let adHTML = "";
    const adType = adsCount % 5;

    if (adType === 0 || adType === 1) {
      // 728x90 aparece más veces
      adHTML = getBanner728x90();
    } else if (adType === 2) {
      adHTML = getNativeBanner();
    } else {
      adHTML = getBanner300x250(); // banner secundario
    }

    adWrapper.innerHTML = adHTML;
    containerRef.current.appendChild(adWrapper);
    executeScripts(adWrapper);
    setAdsCount((prev) => prev + 1);
  };

  // Precargar anuncios iniciales para scroll rápido
  useEffect(() => {
    for (let i = 0; i < 6; i++) addAdBlock();
  }, []);

  // Scroll infinito optimizado
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 150) {
        // 🔹 Agrega 3 bloques de una vez
        for (let i = 0; i < 3; i++) addAdBlock();

        // Social Bar solo una vez
        if (!socialBarAdded.current && containerRef.current) {
          const socialBarWrapper = document.createElement("div");
          socialBarWrapper.style.margin = "40px 0";
          socialBarWrapper.style.textAlign = "center";
          socialBarWrapper.innerHTML = `
            <script type='text/javascript' src='//pl27912697.effectivegatecpm.com/4d/d5/c1/4dd5c130e5d831b8770dc2cddc1b6122.js'></script>
          `;
          containerRef.current.appendChild(socialBarWrapper);
          executeScripts(socialBarWrapper);
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
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>💰 Publicidades</h1>
    </div>
  );
}