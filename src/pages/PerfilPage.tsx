import React from "react";
import Logotipo from './img/OlhoNoBoletoPrataLogotipo.png'
import './Main.css'
const PerfilPage = () => {
  return (
    <div className="container">
      <header className="header-user">
        <h1>Olá <span>Usuário</span></h1>
        <p>Contente em te ver novamente!</p>
      </header>
      <main className="info-user">
        <form action="" method="POST">
        <h2>Suas informações</h2>
        
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome completo"
          value="Usuário Exemplo"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          value="usuario@example.com"
          placeholder="E-mail"
          required
        />
        <button type="submit">Salvar dados</button>
        </form>
      </main>
      <div className="horizonte"></div>
      <footer className="img-footer">
        <img src={Logotipo} alt="Logotipo OlhoNoBoleto" />
      </footer>
    </div>
  );
};

export default PerfilPage;
