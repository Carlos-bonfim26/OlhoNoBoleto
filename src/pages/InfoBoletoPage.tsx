import { useLocation } from "react-router-dom";
import type { BoletoResponseDTO } from "../types/boleto";
import "./Main.css";
import AreaDeUsuario from "../components/AreaDeUsuario";
import HomeScanButton from "../components/HomeScanButton";
import image from "./img/Warning-pana.svg";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import { useNavigate } from "react-router-dom";
const InfoBoletoPage = () => {
  const location = useLocation();
  const { boleto } = location.state as { boleto: BoletoResponseDTO };
  const navigate = useNavigate();

  const handleReportarBoleto = () => {
    navigate("/reportar-boleto");
  };

  return (
    <div className="container boleto-info-page">
      <header className="header-boleto-info">
        <img src={logotipo} alt="logo olho no boleto" />
        <AreaDeUsuario />
        <HomeScanButton />
      </header>

      <main>
        <div>
          <h2>Detalhes do Boleto</h2>
          <section className="info-boleto">
            <div className="campo">
              <label>Banco Emissor</label>
              <span>{boleto.banco}</span>
            </div>
            <div className="campo">
              <label>Valor</label>
              <span>R$ {boleto.valor.toFixed(2)}</span>
            </div>
            <div className="campo">
              <label>CNPJ do Beneficiário</label>
              <span>{boleto.documentBeneficiario}</span>
            </div>
            <div className="campo">
              <label>Beneficiário</label>
              <span>{boleto.beneficiarioNome}</span>
            </div>
            <div className="campo">
              <label>Data da Validação</label>
              <span>{boleto.dataValidacao}</span>
            </div>
            <div className="campo">
              <label>Status</label>
              <span className={`status-${boleto.statusValidacao}`}>
                {boleto.statusValidacao.toUpperCase()}
              </span>
            </div>
            <div className="campo">
              <label>Recomendação</label>
              <span
                className={`recomendacao-${
                  boleto.recomendacao === "PAGAR" ? "pagar" : "nao-pagar"
                }`}
              >
                {boleto.recomendacao}
              </span>
            </div>
            <div className="campo">
              <label>Mensagem</label>
              <span>{boleto.mensagem}</span>
            </div>
          </section>

          {boleto.motivo && (
            <section className="motivo">
              <div className="motivo-info">
                <h3>Motivo da Análise</h3>
                <p>{boleto.motivo}</p>
              </div>
            </section>
          )}
        </div>

        <div className="boleto">
          <img src={image} alt="" />
          <button className="btn-report btn" onClick={handleReportarBoleto}>
            Reportar Boleto
          </button>
        </div>
      </main>
    </div>
  );
};

export default InfoBoletoPage;
