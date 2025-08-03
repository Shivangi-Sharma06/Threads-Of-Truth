import { useEffect } from "react";

const ThreadGuru = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    document.body.appendChild(script);

    // Handler for Jotform embed
    script.onload = () => {
      // @ts-ignore
      if (window.jotformEmbedHandler) {
        // @ts-ignore
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-01986c56b6d97d818adb8f9e89f4c4a47c04']",
          "https://www.jotform.com"
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <iframe
        id="JotFormIFrame-01986c56b6d97d818adb8f9e89f4c4a47c04"
        title="ThreadGuru: Government Scheme Advisor"
        allow="geolocation; microphone; camera; fullscreen"
        src="https://agent.jotform.com/01986c56b6d97d818adb8f9e89f4c4a47c04?embedMode=iframe&background=1&shadow=1"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "80vh",
          border: "none",
          width: "100%",
        }}
        frameBorder={0}
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default ThreadGuru;