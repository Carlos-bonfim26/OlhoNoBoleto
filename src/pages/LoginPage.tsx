import React from 'react'
import './Autenticacao.css';
import LoginImg from './img/autenticacaoIMG.svg';
const LoginPage = () => {
  return (
     <div className="container">
         <main>
          <section className="form">
            <h1>Login</h1>
            <h3>Não possui uma conta? <span>Cadastre-se</span></h3>
            <form action="" method="POST">
                <input type="email" name="email" id="email" placeholder="E-mail" required />
                <input type="password" name="senha" id="senha" placeholder="Senha" required />
                <button type="submit">Entrar</button>
            </form>
          </section>
          <div className="horizonte"></div>
          <section className="img-footer">
            <img src={LoginImg} alt="Moça realizando Login" />
          </section>
             </main>
     </div>
  )
}

export default LoginPage
