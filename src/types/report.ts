// src/types/report.ts
export interface ReportRequest {
    id?: string;
    usuarioNome?: string;
    usuarioid: string;
    boletold: string;
    beneficiarioid: string;
    beneficiarioNome?: string;
    titulo: string;
    descricao: string;
    categoria: string;
    severidade?: string;
    dataReport?: string;
    status?: string;
    linhaDigitavel?: string;
}

export interface ReportResponseDTO {
    id: string;
    usuarioNome: string;
    usuarioid: string;
    boletold: string;
    beneficiarioid: string;
    beneficiarioNome: string;
    titulo: string;
    descricao: string;
    categoria: string;
    severidade: string;
    dataReport: string;
    status: string;
    linhaDigitavel: string;
}

export interface DashboardData {
    totalReports: number;
    reportsPendentes: number;
    reportsValidados: number;
    reportsRejeitados: number;
    topBeneficiarios: Array<{
        beneficiarioNome: string;
        totalReports: number;
    }>;
}

// Usando union types em vez de enum para melhor compatibilidade
export type ReportStatus = 'PENDENTE' | 'VALIDADO' | 'FALSO';
export type ReportSeverity = 'BAIXA' | 'MEDIA' | 'ALTA';