import api from './API';
import type{ BoletoValidateRequestDTO, BoletoResponseDTO } from '../types/boleto';

export const boletoService = {
  validar: async (request: BoletoValidateRequestDTO): Promise<BoletoResponseDTO> => {
    const response = await api.post('/boleto/validate', request);
    return response.data;
  },
};