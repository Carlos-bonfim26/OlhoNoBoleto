# Olho no Boleto 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
## Objetivo

Resolver o problema de boleto falso, QR Code que é na verdade Pix para golpista. 

## O que fazemos 

o usuário (ou app do banco/loja) envia os dados do boleto (linha digitável) ou o QR Code; a API decodifica, consulta uma base (ou serviço simulado) para validar o beneficiário, banco destinatário e sinaliza discrepâncias (nome do beneficiário diferente do banco, banco não confere com convenção). Oferece recomendação “PAGAR / NÃO PAGAR” e instruções.