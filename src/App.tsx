import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
// import CadastroPage from './pages/CadastroPage'
// import LoginPage from './pages/LoginPage'
// import PerfilPage from './pages/PerfilPage'
import InfoBoletoPage from './pages/InfoBoletoPage'
import ReportPage from './pages/ReportPage'
import ScanPage from './pages/ScanPage'
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<LoginPage />} />j
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} /> */}
          <Route
            path="/scan"
            element={

              <ScanPage />
            }
          />
          <Route
            path="/infoBoleto"
            element={
              <InfoBoletoPage />
            }
          />
          <Route
            path="/reportar-boleto"
            element={
              <ReportPage />

            }
          />
          {/* <Route 
              path="/perfil" 
              element={
                  <PerfilPage />
              } 
            /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App