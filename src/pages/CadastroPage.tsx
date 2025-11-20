import React from "react";
import './Autenticacao.css';
import LoginImg from './img/autenticacaoIMG.svg';
const CadastroPage = () => {
  return (
    <div className="container">
        <main>
          <section className="form">
            <h1>Cadastro</h1>
            <h3>Já possui uma conta? <span>Conecte-se</span></h3>
            <form action="" method="POST">
                <input type="text" name="nome" id="nome" placeholder="Nome completo" required />
                <input type="email" name="email" id="email" placeholder="E-mail" required />
                <input type="password" name="senha" id="senha" placeholder="Senha" required />
                <button type="submit">Cadastrar</button>
            </form>
          </section>
          <div className="horizonte"></div>
          <section className="img-footer">
            <img src={LoginImg} alt="Moça realizando Login" />
          </section>
        </main>
    </div>
  );
};

export default CadastroPage;
