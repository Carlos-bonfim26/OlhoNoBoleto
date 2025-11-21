import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import CadastroPage from './pages/CadastroPage'
import LoginPage from './pages/LoginPage'
import PerfilPage from './pages/PerfilPage'
import InfoBoletoPage from './pages/InfoBoletoPage'
import ReportPage from './pages/ReportPage'
import ScanPage from './pages/ScanPage'
import AreaDeUsuario from './components/AreaDeUsuario';
function App() {

  return (
    <>
       <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/info-boleto" element={<InfoBoletoPage />} />
          <Route path="/reportar-boleto" element={<ReportPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

