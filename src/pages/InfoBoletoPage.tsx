import { useLocation } from "react-router-dom";
import type { BoletoResponseDTO, BeneficiarioResponseDTO } from "../types/boleto";
import "./Main.css";
import AreaDeUsuario from "../components/AreaDeUsuario";
import HomeScanButton from "../components/HomeScanButton";
import image from "./img/Warning-pana.svg";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import { useNavigate } from "react-router-dom";

const InfoBoletoPage = () => {
  const location = useLocation();
  const state = location.state as { 
    boleto: BoletoResponseDTO; 
    beneficiario?: BeneficiarioResponseDTO 
  };
  
  const navigate = useNavigate();

  if (!state?.boleto) {
    return (
      <div className="container boleto-info-page">
        <header className="header-boleto-info">
          <img src={logotipo} alt="logo olho no boleto" />
          <AreaDeUsuario />
          <HomeScanButton />
        </header>
        <main>
          <div className="error-message">
            <h2>Erro: Dados do boleto não encontrados</h2>
            <p>Volte à tela de scan e tente novamente.</p>
            <button onClick={() => navigate('/scan')} className="btn">
              Voltar ao Scan
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { boleto } = state;
  const { beneficiario } = state;

  const formatarValor = (valor: number | undefined): string => {
    if (valor === undefined || valor === null) {
      return "N/A";
    }
    return `R$ ${valor.toFixed(2)}`;
  };

  const getStatusClass = (status: string | undefined): string => {
    if (!status) return "status-desconhecido";
    return `status-${status.toLowerCase()}`;
  };

  const getRecomendacaoClass = (recomendacao: string | undefined): string => {
    if (!recomendacao) return "recomendacao-desconhecida";
    return `recomendacao-${recomendacao.toLowerCase() === "pagar" ? "pagar" : "nao-pagar"}`;
  };

  const handleReportarBoleto = () => {
    navigate("/reportar-boleto", {
      state: {
        beneficiario: boleto.beneficiarioNome || "Não identificado",
        cnpj: boleto.documentBeneficiario || "Não identificado",
        boletoId: boleto.id,
        beneficiarioId: beneficiario?.id || boleto.id
      },
    });
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
              <span>{boleto.banco || "N/A"}</span>
            </div>
            <div className="campo">
              <label>Valor</label>
              <span>{formatarValor(boleto.valor)}</span> {}
            </div>
            <div className="campo">
              <label>CNPJ do Beneficiário</label>
              <span>{boleto.documentBeneficiario || "N/A"}</span>
            </div>
            <div className="campo">
              <label>Beneficiário</label>
              <span>{boleto.beneficiarioNome || "N/A"}</span>
            </div>
            <div className="campo">
              <label>Data da Validação</label>
              <span>{boleto.dataValidacao || "N/A"}</span>
            </div>
            <div className="campo">
              <label>Status</label>
              <span className={getStatusClass(boleto.statusValidacao)}>
                {boleto.statusValidacao ? boleto.statusValidacao.toUpperCase() : "N/A"}
              </span>
            </div>
            <div className="campo">
              <label>Recomendação</label>
              <span className={getRecomendacaoClass(boleto.recomendacao)}>
                {boleto.recomendacao || "N/A"}
              </span>
            </div>
            <div className="campo">
              <label>Mensagem</label>
              <span>{boleto.mensagem || "N/A"}</span>
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
          <img src={image} alt="Ilustração de aviso" />
          <button className="btn-report btn" onClick={handleReportarBoleto}>
            Reportar Boleto
          </button>
        </div>
      </main>
    </div>
  );
};

export default InfoBoletoPage;