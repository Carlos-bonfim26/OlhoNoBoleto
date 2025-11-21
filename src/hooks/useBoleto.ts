import { useState } from 'react';
import { boletoService } from '../services/boletoService';
import type { BoletoValidateRequestDTO, BoletoResponseDTO } from '../types/boleto';

export const useBoleto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validarBoleto = async (linhaDigitavel: string): Promise<BoletoResponseDTO | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const request: BoletoValidateRequestDTO = { linhaDigitavel };
      const response = await boletoService.validar(request);
      return response;
    } catch (err: any) {
      // Se o erro for uma resposta da API, use a mensagem do backend, caso contrário, uma mensagem genérica
      const errorMessage = err.response?.data?.message || 'Erro ao validar boleto';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validarBoleto,
  };
};