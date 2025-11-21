import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useBoleto } from "../hooks/useBoleto";
import { useNavigate } from "react-router-dom";

const BoletoScanner = () => {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const { validarBoleto, loading, error } = useBoleto();
  
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

    const success = async (result: string) => {
      // Parar o scanner imediatamente ao detectar um QR code
      scanner.clear().catch((error) => 
        console.error("Falha ao limpar o scanner.", error)
      );
      setIsScanning(false);
      setScanResult(result);
      setScanError(null);

      console.log("QR Code lido:", result);
      // Validar o boleto com o backend
      const boletoData = await validarBoleto(result);
      if (boletoData) {
        navigate('/boleto-info', { state: { boleto: boletoData } });
      }
    };

    const error = (err: string) => {
      // Ignorar erros do tipo "NotFoundException" (QR code não encontrado)
      if (err && !err.includes("NotFoundException")) {
        setScanError(err);
        console.error("Erro no scanner:", err);
      }
    };

    scanner.render(success, error);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Falha ao limpar o scanner.", error);
      });
    };
  }, [navigate, isScanning, validarBoleto]);

  const restartScanner = () => {
    setScanResult(null);
    setScanError(null);
    setIsScanning(true);
  };

  return (
    <>
      <div id="reader" ref={scannerRef}></div>

      {loading && (
        <div className="scan-result info">
          <h3>Validando boleto...</h3>
          <p>Aguarde enquanto processamos as informações.</p>
        </div>
      )}

      {error && (
        <div className="scan-result error">
          <h3>Erro na validação</h3>
          <p>{error}</p>
          <button onClick={restartScanner} className="btn-rescan">
            Tentar Novamente
          </button>
        </div>
      )}

      {scanResult && !loading && (
        <div className="scan-result success">
          <h3>QR Code lido com sucesso!</h3>
          <p>Processando validação...</p>
        </div>
      )}

      {scanError && (
        <div className="scan-result error">
          <h3>Erro no scanner</h3>
          <p>{scanError}</p>
          <button onClick={restartScanner} className="btn-rescan">
            Tentar Novamente
          </button>
        </div>
      )}
    </>
  );
};

export default BoletoScanner;