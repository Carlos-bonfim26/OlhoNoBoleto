import React, { forwardRef, useState, useEffect } from "react";
import perfilIMG from './img/perfilIMG.svg';
import './Main.css';
import { useAuth } from "../contexts/AuthContext";
import type { CadastroRequest } from "../types/index";
import HomeScanButton from "../components/HomeScanButton";

interface PerfilPageProps {}

const PerfilPage = forwardRef<HTMLDivElement, PerfilPageProps>((props, ref) => {
  const { user, cadastro, atualizarUsuario } = useAuth(); 
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (user) {
        const updatedUser = await atualizarUsuario(user.email, { nome, email, senha });
        alert("Dados atualizados com sucesso!");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" ref={ref}>
      <header className="header-user">
        <div>
          <h1>Olá <span>{user?.nome}</span></h1>
          <p>Contente em te ver novamente!</p>
        </div>
        <HomeScanButton/>
      </header>
      <div className="perfil-page">
        <main className="info-user">
          <form onSubmit={handleSubmit}>
            <h2>Suas informações</h2>
          
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Nova senha (deixe em branco para não alterar)"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar dados"}
            </button>
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

PerfilPage.displayName = "PerfilPage";

export default PerfilPage;