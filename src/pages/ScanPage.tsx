import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import AreaDeUsuario from "../components/AreaDeUsuario";

const ScanPage = () => {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning) return;

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

    function success(result: string) {
      scanner
        .clear()
        .catch((error) => console.error("Falha ao limpar o scanner.", error));
      setIsScanning(false);

      setScanResult(result);
      setScanError(null);

      console.log("QR Code lido:", result);
    }

    function error(err: string) {
      if (!err.includes("QR code not found")) {
        setScanError(err);
        console.error("Erro no scanner:", err);
      }
    }

    scanner.render(success, error);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Falha ao limpar o scanner.", error);
      });
    };
  }, [navigate, isScanning]);

  const processQRData = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      console.log("Dados parseados:", parsedData);
    } catch (e) {
      console.log("Dados do QR code:", data);

      extractBoletoInfo(data);
    }
  };

  const extractBoletoInfo = (qrData: string) => {
    if (qrData.includes("|")) {
      const parts = qrData.split("|");
      console.log("Partes do QR code:", parts);
    }
  };

  const restartScanner = () => {
    setScanResult(null);
    setScanError(null);
    setIsScanning(true);
  };

  return (
    <div className="container">
      <header className="header-scan">
        <img src={logotipo} alt="logo olho no boleto" />
        <h1>Escaneie o código QR</h1>
      </header>
      <main>
        <div id="reader" ref={scannerRef}></div>

        {scanResult && (
          <div className="scan-result success">
            <h3>✓ QR Code lido com sucesso!</h3>
            <p>Dados: {scanResult}</p>
            <button onClick={restartScanner} className="btn-rescan">
              Escanear Novamente
            </button>
          </div>
        )}

        {scanError && (
          <div className="scan-result error">
            <h3>✗ Erro no scanner</h3>
            <p>{scanError}</p>
            <button onClick={restartScanner} className="btn-rescan">
              Tentar Novamente
            </button>
          </div>
        )}

        <AreaDeUsuario />
      </main>
    </div>
  );
};

export default ScanPage;
