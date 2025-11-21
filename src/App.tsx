import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import CadastroPage from './pages/CadastroPage'
import LoginPage from './pages/LoginPage'
import PerfilPage from './pages/PerfilPage'
import InfoBoletoPage from './pages/InfoBoletoPage'
import ReportPage from './pages/ReportPage'
import ScanPage from './pages/ScanPage'
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route 
              path="/scan" 
              element={
                <ProtectedRoute>
                  <ScanPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/info-boleto" 
              element={
                <ProtectedRoute>
                  <InfoBoletoPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reportar-boleto" 
              element={
                <ProtectedRoute>
                  <ReportPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute>
                  <PerfilPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App