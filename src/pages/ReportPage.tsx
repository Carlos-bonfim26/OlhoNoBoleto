// src/pages/ReportPage.tsx
import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import logotipo from "/img/ClhoNoBoletoVermelhol.logotipo.png";
import ReportImg from "/img/Warning-pana.svg";
import AreaDeUsuario from "../components/AreaDeUsuario";
import HomeScanButton from "../components/HomeScanButton";
import { reportService } from '../services/reportService';
import type { ReportRequest, ReportSeverity } from '../types/report';
import "./Main.css";

interface FormData {
  titulo: string;
  descricao: string;
  categoria: string;
  beneficiarioid: string;
  boletold: string;
  usuarioid: string;
}

const ReportPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    categoria: '',
    beneficiarioid: 'uuid-do-beneficiario',
    boletold: 'uuid-do-boleto',
    usuarioid: 'uuid-do-usuario'
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
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
      setMessage('Report criado com sucesso!');

      setFormData(prev => ({
        ...prev,
        titulo: '',
        descricao: '',
        categoria: ''
      }));
    } catch (error: any) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      setMessage('Erro ao criar report: ' + errorMessage);
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
              <span>Empresa XYZ</span>
            </div>
            <div className="campo">
              <label htmlFor="cnpj">CNPJ</label>
              <span>14860679000101</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
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

            <input
              type="text"
              name="titulo"
              placeholder="Título do report"
              value={formData.titulo}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="descricao"
              placeholder="Descreva o motivo da sua denúncia..."
              value={formData.descricao}
              onChange={handleInputChange}
              cols={40}
              rows={6}
              required
            />

            <button type="submit" disabled={loading}>
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