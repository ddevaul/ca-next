"use client";

import { useEffect, useRef } from "react";

const Home: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const userId = "user-1234";
    localStorage.setItem("userid", userId);

    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendMessage = () => {
      iframe.contentWindow?.postMessage(
        { type: "SET_USERID", userid: userId },
        "http://localhost:1234" // Change this to your iframe's production domain
      );
    };

    iframe.addEventListener("load", sendMessage);
    return () => iframe.removeEventListener("load", sendMessage);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        ref={iframeRef}
        src="http://localhost:1234/"
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Home;
