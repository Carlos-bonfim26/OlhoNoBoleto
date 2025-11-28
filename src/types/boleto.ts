export interface BoletoValidateRequestDTO {
  linhaDigitavel: string;
}

export interface BoletoResponseDTO {
  id:string;
  linhaDigitavel: string;
  banco: string;
  beneficiarioNome: string;
  valor: number;
  dataValidacao: string;
  statusValidacao: string;
  mensagem: string;
  motivo?: string;
  recomendacao: string;
  documentBeneficiario: string;
  totalQueixas: number;
}
export interface BeneficiarioResponseDTO {
  id:string
    nome: string;
    document: string;
    totalQueixas: number;
}