import React from "react";
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import ReportImg from "./img/Warning-pana.svg";
import AreaDeUsuario from "../components/AreaDeUsuario";
import HomeScanButton from "../components/HomeScanButton";
import "./Main.css";
const ReportPage = () => {
  return (
    <div className="container report-page">
      <header className="header-boleto-info">
        <img src={logotipo} alt="logo olho no boleto" />
        <AreaDeUsuario />
        <HomeScanButton />
      </header>
      <main>
        
        <section className="form-report ">
          <div className="info-beneficiario">
            <div className="campo">
              <label htmlFor="">Beneficiário</label>
              <span>Empresa XYZ</span>
            </div>
            <div className="campo">
              <label htmlFor="">CNPJ</label>
              <span>14860679000101</span>
            </div>
          </div>

          <form action="">
            <select name="" id="" required>
              <option value="" disabled>
                Selecione o motivo do reporte
              </option>
              <option value="">Paguei e não foi compensado</option>
              <option value="">Dados Incorretos</option>
              <option value="">Banco inexistente</option>
              <option value="">Beneficiário inválido</option>
              <option value="">Outro</option>
            </select>
            <textarea
              name=""
              id=""
              placeholder="Descreva o motivo da sua denúncia..."
              cols={40}
              rows={6}
            ></textarea>
            <button type="submit">Reportar Boleto</button>
          </form>
        </section>
      
      <section className="section-img-report">
        <img src={ReportImg} alt="Imagem de denúncia de boleto" />
      </section>
      </main>
    </div>
  );
};

export default ReportPage;
