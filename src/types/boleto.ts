export interface BoletoValidateRequestDTO {
  linhaDigitavel: string;
}

export interface BoletoResponseDTO {
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
}