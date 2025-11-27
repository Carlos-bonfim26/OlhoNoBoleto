import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import UserProfileImg from './img/user-profile.png'; // Você pode usar outra imagem apropriada

const PerfilPage: React.FC = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [message, setMessage] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  // Preenche o formulário com os dados do usuário quando carregar
  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        senha: '',
        confirmarSenha: ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setMessage('');

    // Validação de senha
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      setMessage('As senhas não coincidem');
      setUpdateLoading(false);
      return;
    }

    try {
      await updateProfile({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha || undefined // Só envia senha se foi alterada
      });
      
      setMessage('Perfil atualizado com sucesso!');
      setEditMode(false);
      
      // Limpa os campos de senha após atualização bem-sucedida
      setFormData(prev => ({
        ...prev,
        senha: '',
        confirmarSenha: ''
      }));
    } catch (error: any) {
      setMessage(`Erro: ${error.message}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error: any) {
      setMessage(`Erro ao fazer logout: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container perfil-page">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container perfil-page">
        <div className="error-message">
          <h2>Usuário não autenticado</h2>
          <p>Faça login para acessar seu perfil.</p>
          <button onClick={() => navigate('/login')} className="btn">
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container perfil-page">
      <header className="header-perfil">
        <button onClick={() => navigate('/scan')} className="btn-voltar">
          ← Voltar
        </button>
        <h1>Meu Perfil</h1>
        <div style={{width: '80px'}}></div> 
      </header>

      <main>
        <section className="perfil-content">
          <div className="perfil-header">
            <div className="avatar">
              <img src={UserProfileImg} alt="Avatar do usuário" />
            </div>
            <div className="user-info">
              <h2>{user.nome || 'Usuário'}</h2>
              <p>{user.email}</p>
              <span className={`role-badge role-${user.role?.toLowerCase() || 'user'}`}>
                {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
              </span>
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="perfil-actions">
            {!editMode ? (
              <>
                <button 
                  onClick={() => setEditMode(true)} 
                  className="btn btn-primary"
                >
                  Editar Perfil
                </button>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary"
                >
                  Sair
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="perfil-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="senha">Nova Senha (opcional)</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="Deixe em branco para manter a senha atual"
                  />
                </div>

                {formData.senha && (
                  <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      placeholder="Confirme sua nova senha"
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="submit" 
                    disabled={updateLoading}
                    className="btn btn-primary"
                  >
                    {updateLoading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditMode(false);
                      setMessage('');
                      // Reseta o formulário para os dados originais
                      setFormData({
                        nome: user.nome || '',
                        email: user.email || '',
                        senha: '',
                        confirmarSenha: ''
                      });
                    }}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="perfil-stats">
            <h3>Estatísticas</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Boletos Escaneados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Reports Enviados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Contribuições</span>
              </div>
            </div>
          </div>
        </section>

       
      </main>
    </div>
  );
};

export default PerfilPage;