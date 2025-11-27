import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import api from '../services/API';
import type{ BoletoValidateRequestDTO, BoletoResponseDTO } from '../types/boleto';

const BoletoScanner: React.FC = () => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'qr-reader',
            {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            },
            false
        );

        scannerRef.current = scanner;

        const success = async (decodedText: string) => {
            console.log(`Código lido: ${decodedText}`);
            
            try {
                scanner.clear().catch(error => 
                    console.log('Scanner já estava limpo')
                );

                let linhaDigitavel = decodedText;

                if (decodedText.includes('linhaDigitavel')) {
                    try {
                        const jsonData = JSON.parse(decodedText);
                        linhaDigitavel = jsonData.linhaDigitavel;
                        console.log('Linha digitável extraída do JSON:', linhaDigitavel);
                    } catch (e) {
                        console.log('Não é JSON válido, usando texto completo');
                    }
                }

                linhaDigitavel = linhaDigitavel.replace(/[^\d]/g, '');

                console.log('Linha digitável processada:', linhaDigitavel);

                const request: BoletoValidateRequestDTO = {
                    linhaDigitavel: linhaDigitavel
                };

                const response = await api.post<BoletoResponseDTO>('/boleto/validate', request);
                console.log('Resposta da API:', response.data);

                const boletoData = response.data;

                console.log('Navegando para /infoBoleto...');
                navigate('/infoBoleto', { 
                    state: { boleto: boletoData } 
                });

            } catch (error) {
                console.error('Erro ao validar boleto:', error);
                alert('Erro ao validar boleto. Tente novamente.');
                
                location.reload();
            }
        };

        const error = (err: string) => {
        };

        scanner.render(success, error);

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => 
                    console.log('Scanner já foi limpo')
                );
            }
        };
    }, [navigate]);

    return (
        <div>
            <div id="qr-reader" style={{ width: '100%' }}></div>
        </div>
    );
};

export default BoletoScanner;