import BoletoScanner from "../components/BoletoScanner";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import "./Main.css";
import AreaDeUsuario from "../components/AreaDeUsuario";

const ScanPage = () => {
  return (
    <div className="container">
      <header className="header-scan">
        <img src={logotipo} alt="logo olho no boleto" />
        <h1>Escaneie o código QR</h1>
      </header>
      <main>
        <BoletoScanner />
        <AreaDeUsuario />
      </main>
    </div>
  );
};

export default ScanPage;
