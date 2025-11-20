import React from "react";
import logotipo from "./img/OlhoNoBoletoPrataLogotipo.png";
import { IoIosWarning } from "react-icons/io";
import { PiSiren } from "react-icons/pi";
import "./Main.css";
const InfoBoletoPage = () => {
  return (
    <div className="container">
      <header className="img-header">
        <img src={logotipo} alt="Logotipo OlhoNoBoleto" />
      </header>
      <main>
        <h2>Informações do Boleto</h2>
        <section className="info-boleto">
          <div className="campo">
            <label htmlFor="">Banco Emissor</label>
            <span>Bradesco - 341</span>
          </div>
          <div className="campo">
            <label htmlFor="">Valor</label>
            <span>R$ 150,00</span>
          </div>
          <div className="campo">
            <label htmlFor="">CNPJ</label>
            <span>14860679000101</span>
          </div>
          <div className="campo">
            <label htmlFor="">Vencimento</label>
            <span>10/12/2024</span>
          </div>
          <div className="campo">
            <label htmlFor="">Beneficiário</label>
            <span>Empresa XYZ</span>
          </div>
          <div className="campo">
            <label htmlFor="">Código QR</label>
            <span>Lido com sucesso</span>
          </div>
        </section>
        <section className="motivo">
          <div className="motivo-info">
            <h3>Boleto Falso</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
              optio magni. Deleniti, nisi. Fugiat, doloremque eos!
            </p>
          </div>
          <IoIosWarning className="icon-report"/>
        </section>
        <button className="btn-report">
          Reportar Boleto <PiSiren />
        </button>
      </main>
    </div>
  );
};

export default InfoBoletoPage;
