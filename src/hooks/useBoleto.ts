import { useState } from 'react';

export const useBoleto = () => {
    const [resultado, setResultado] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const validarBoleto = async (linhaDigitavel: string) => {
        setLoading(true);
        setResultado(null);
        
        try {
            // Simulação de validação
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const resultadoMock = {
                seguro: true,
                mensagem: "Boleto seguro - Nenhuma irregularidade detectada",
                beneficiario: {
                    nome: "Banco Itaú S.A.",
                    document: "60.701.190/0001-04",
                    totalQueixas: 0
                }
            };
            
            setResultado(resultadoMock);
        } catch (error) {
            console.log('Erro na validação:', error);
            setResultado({
                seguro: false,
                mensagem: "Erro na validação do boleto"
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        validarBoleto,
        resultado,
        loading
    };
};