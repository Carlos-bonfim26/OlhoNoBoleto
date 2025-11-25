// src/services/reportService.ts
import api from './API';
import type { ReportRequest, ReportResponseDTO, DashboardData, ReportStatus } from '../types/report';

export const reportService = {
    criarReport: async (reportData: ReportRequest): Promise<ReportResponseDTO> => {
        const response = await api.post<ReportResponseDTO>('/report/criarReport', reportData);
        return response.data;
    },

    listarMeusReports: async (): Promise<ReportResponseDTO[]> => {
        const response = await api.get<ReportResponseDTO[]>('/report/usuario/meus-reports');
        return response.data;
    },

    atualizarDescricao: async (id: string, novaDescricao: string): Promise<ReportResponseDTO> => {
        const response = await api.put<ReportResponseDTO>(`/report/${id}`, novaDescricao, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return response.data;
    },

    listarTodosReports: async (): Promise<ReportResponseDTO[]> => {
        const response = await api.get<ReportResponseDTO[]>('/report/admin/reports');
        return response.data;
    },

    atualizarStatus: async (id: string, novoStatus: ReportStatus): Promise<ReportResponseDTO> => {
        const response = await api.put<ReportResponseDTO>(`/report/admin/${id}/status`, novoStatus);
        return response.data;
    },

    getDashboardAdmin: async (): Promise<DashboardData> => {
        const response = await api.get<DashboardData>('/report/admin/dashboard');
        return response.data;
    }
};