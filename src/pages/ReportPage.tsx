import React from "react";
import logotipo from "./img/OlhoNoBoletoPrataLogotipo.png";
import "./Main.css";
import ReportImg from './img/reportarIMG.svg';
const ReportPage = () => {
  return (
    <div className="container">
      <header className="img-header">
        <img src={logotipo} alt="Logotipo OlhoNoBoleto" />
      </header>
      <main>
        <section className="info-boleto especial-report">
          <div className="campo ">
            <label htmlFor="">Beneficiário</label>
            <span>Empresa XYZ</span>
          </div>
          <div className="campo">
            <label htmlFor="">CNPJ</label>
            <span>14860679000101</span>
          </div>
        </section>
        <img src={ReportImg} alt="imagem de report"className="img-report" />
        <section className="form-report">
            <form action="">
                <select name="" id="" required>
                    <option value="" disabled>Selecione o motivo do reporte</option>
                    <option value="">Paguei e não foi compensado</option>
                    <option value="">Dados Incorretos</option>
                    <option value="">Banco inexistente</option>
                    <option value="">Beneficiário inválido</option>
                    <option value="">Outro</option>
                </select>
                <textarea name="" id="" placeholder="Descreva o motivo da sua denúncia..." cols={40} rows={6}></textarea>
                <button type="submit">Reportar Boleto</button>
            </form>
        </section>
      </main>
    </div>
  );
};

export default ReportPage;
