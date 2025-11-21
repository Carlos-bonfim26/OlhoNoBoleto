import  {forwardRef} from "react";
import perfilIMG from './img/perfilIMG.svg'
import HomeScanButton from "../components/HomeScanButton";
import './Main.css'
const PerfilPage = forwardRef<HTMLDivElement>((props, ref) => {
  
  return (
    <div className="container"  ref={ref}>
      <header className="header-user">
        <div>
          <h1>Olá <span>Usuário</span></h1>
          <p>Contente em te ver novamente!</p>
        </div>
        <HomeScanButton />
      </header>
      <div className="perfil-page">
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
            <img src={perfilIMG} alt="Imagem de perfil" />
          </footer>
      </div>
    </div>
  );
});

export default PerfilPage;
