// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import './Main.css';
// import LoginImg from './img/autenticacaoIMG.svg';

// const CadastroPage: React.FC = () => {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { cadastro } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await cadastro({nome, email, senha});
//       navigate('/'); 
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container autenticadores">
//       <main>
//         <section className="form">
//           <h1>Cadastro</h1>
//           <h3>Já possui uma conta? <span onClick={() => navigate('/login')}>Conecte-se</span></h3>
//           <form onSubmit={handleSubmit}>
//             <input 
//               type="text" 
//               name="nome" 
//               id="nome" 
//               placeholder="Nome completo" 
//               value={nome}
//               onChange={(e) => setNome(e.target.value)}
//               required 
//             />
//             <input 
//               type="email" 
//               name="email" 
//               id="email" 
//               placeholder="E-mail" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required 
//             />
//             <input 
//               type="password" 
//               name="senha" 
//               id="senha" 
//               placeholder="Senha" 
//               value={senha}
//               onChange={(e) => setSenha(e.target.value)}
//               required 
//             />
//             <button type="submit" disabled={loading}>
//               {loading ? 'Carregando...' : 'Cadastrar'}
//             </button>
//           </form>
//         </section>
//         <div className="horizonte"></div>
//         <section className="img-footer">
//           <img src={LoginImg} alt="Moça realizando Login" />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default CadastroPage;