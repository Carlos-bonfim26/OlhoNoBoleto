import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import "./Main.css";
import { FaUserCircle } from "react-icons/fa";

const ScanPage = () => {
  const scannerRef = useRef(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );
    scanner.render(success, error);
    function success(result: string) {}
    function error(err: string) {}
    return () => {
      scanner.clear().catch((error) => {
        console.error("Falha ao limpar o scanner.", error);
      });
    };
  }, []);
  return (
    <div className="container">
      <header className="header-scan">
        <img src={logotipo} alt="logo olho no boleto" />
        <h1>Escaneie o código QR</h1>
      </header>
      <main>
        <div id="reader" ref={scannerRef}></div>

        <button className="btn-user">
          {" "}
          <FaUserCircle /> 
          Área do usuário
        </button>
      </main>
    </div>
  );
};

export default ScanPage;
