import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import type { ReportResponseDTO } from '../types/report';

const MeusReports: React.FC = () => {
    const [reports, setReports] = useState<ReportResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        carregarReports();
    }, []);

    const carregarReports = async (): Promise<void> => {
        try {
            const data = await reportService.listarMeusReports();
            setReports(data);
        } catch (error: any) {
            setError('Erro ao carregar reports: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h2>Meus Reports</h2>
            {reports.length === 0 ? (
                <p>Nenhum report encontrado.</p>
            ) : (
                reports.map(report => (
                    <div key={report.id} className="report-card">
                        <h3>{report.titulo}</h3>
                        <p>{report.descricao}</p>
                        <div className="report-info">
                            <span>Status: {report.status}</span>
                            <span>Categoria: {report.categoria}</span>
                            <span>Data: {new Date(report.dataReport).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MeusReports;