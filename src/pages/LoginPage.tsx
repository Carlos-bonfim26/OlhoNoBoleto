import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Main.css';
import LoginImg from './img/autenticacaoIMG.svg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/scan';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login({ email, senha });
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container autenticadores">
      <main>
        <section className="form">
          <h1>Login</h1>
          <h3>
            Não possui uma conta?{' '}
            <span 
              onClick={() => navigate('/cadastro')}
              style={{cursor: "pointer", color: "#007bff"}}
            >
              Cadastre-se
            </span>
          </h3>
          
          {error && (
            <div className="error-message" style={{color: "red", marginBottom: "1rem"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
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

export default LoginPage;