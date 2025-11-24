// // src/hooks/useSession.ts
// import { useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';

// export const useSession = () => {
//   const { checkAuth } = useAuth();

//   useEffect(() => {
//     // Verificar autenticação quando a janela ganha foco
//     const handleFocus = () => {
//       checkAuth();
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [checkAuth]);
// };