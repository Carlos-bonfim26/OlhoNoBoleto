// src/pages/ReportPage.tsx
import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importar useAuth
import logotipo from "./img/OlhoNoBoletoVermelhoLogotipo.png";
import ReportImg from "./img/reportarIMG.svg";
import AreaDeUsuario from "../components/AreaDeUsuario";
import HomeScanButton from "../components/HomeScanButton";
import { reportService } from '../services/reportService';
import type { ReportRequest } from '../types/report';
import "./Main.css";

interface BoletoData {
  beneficiario?: string;
  cnpj?: string;
  boletoId?: string;
  beneficiarioId?: string;
}

interface FormData {
  titulo: string;
  descricao: string;
  categoria: string;
  beneficiarioid: string;
  boletold: string;
  usuarioid: string;
}

const ReportPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Obter o usuário logado

  const boletoData = (location.state as BoletoData) || {};
  const { beneficiario = "Beneficiário não identificado", cnpj = "CNPJ não identificado" } = boletoData;

  // Se não houver boletoData.beneficiarioId ou boletoData.boletoId, não podemos criar o report
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    categoria: '',
    beneficiarioid: boletoData.beneficiarioId || '',
    boletold: boletoData.boletoId || '',
    usuarioid: user?.id || '' // Usar o ID do usuário logado
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const canSubmit = formData.beneficiarioid && formData.boletold && formData.usuarioid;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!canSubmit) {
      setMessage('Erro: Dados do boleto ou usuário incompletos. Não é possível enviar o report.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const reportRequest: ReportRequest = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        usuarioid: formData.usuarioid,
        boletold: formData.boletold,
        beneficiarioid: formData.beneficiarioid,
        severidade: 'MEDIA'
      };

      await reportService.criarReport(reportRequest);
      setMessage('Denúncia enviada com sucesso! Agradecemos pela sua contribuição.');

      setFormData(prev => ({
        ...prev,
        titulo: '',
        descricao: '',
        categoria: ''
      }));

      setTimeout(() => {
        navigate('/scan');
      }, 3000);

    } catch (error: any) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      setMessage('Erro ao enviar denúncia: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const categorias = [
    'Paguei e não foi compensado',
    'Dados Incorretos',
    'Banco inexistente',
    'Beneficiário inválido',
    'Outro'
  ];

  return (
    <div className="container report-page">
      <header className="header-boleto-info">
        <img src={logotipo} alt="logo olho no boleto" />
        <AreaDeUsuario />
        <HomeScanButton />
      </header>

      <main>
        <section className="form-report">
          <div className="info-beneficiario">
            <div className="campo">
              <label htmlFor="beneficiario">Beneficiário</label>
              <span>{beneficiario}</span>
            </div>
            <div className="campo">
              <label htmlFor="cnpj">CNPJ</label>
              <span>{cnpj}</span>
            </div>
          </div>

          {!canSubmit && (
            <div className="error-message">
              Não foi possível carregar todos os dados necessários para o reporte. Volte à tela anterior e tente novamente.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <select
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              disabled={loading || !canSubmit}
            >
              <option value="" disabled>
                Selecione o motivo do reporte
              </option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>

            <textarea
              name="descricao"
              placeholder="Descreva o motivo da sua denúncia..."
              value={formData.descricao}
              onChange={handleInputChange}
              cols={40}
              rows={6}
              required
              disabled={loading || !canSubmit}
            />

            <button type="submit" disabled={loading || !canSubmit}>
              {loading ? 'Enviando...' : 'Reportar Boleto'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </section>

        <section className="section-img-report">
          <img src={ReportImg} alt="Imagem de denúncia de boleto" />
        </section>
      </main>
    </div>
  );
};

export default ReportPage;