# MonitoramentoParaPlantas — Documentação Resumida (PRO)
Generated: 2025-11-24 22:33 UTC

## Visão geral
Aplicativo mobile (React Native + Expo) para monitoramento de plantas, com backend PHP + MySQL.
Objetivo: cadastrar usuários, registrar leituras de umidade e exibir dashboard.

## Tecnologias
- Frontend: React Native (Expo), expo-router
- Backend: PHP (PDO), Apache (XAMPP)
- Banco: MySQL (MONITORAMENTO)
- Ferramentas: Postman, phpMyAdmin

## Estrutura (resumida)
['.expo', 'README.md', 'api copy', 'api', 'app', 'createDB_monitoramento.sql', 'doc', 'sensor']

Principais pastas:
- app/ — telas (login, cadastro, dashboard, etc.)
- api/ — backend PHP (index.php, controllers, connection.php)
- assets/ — imagens
- styles/ — estilos centralizados

## Como rodar (rápido)
1. Backend:
   - Colocar pasta `api` em `C:\xampp\htdocs\api` (ou equivalente).
   - Configurar MySQL e criar DB `MONITORAMENTO` (script incluso).
   - Ajustar `connection.php` com usuário/senha MySQL.
   - Rodar Apache/MySQL.

2. Frontend:
   - `npm install` (ou `yarn`) na raiz do projeto.
   - `expo start` (ou `npx expo start`).
   - Android emulator: use `http://10.0.2.2/api/index.php/...` nos fetch.
   - iOS/sim: `http://localhost/api/index.php/...`

## Pontos importantes
- Rotas PHP: `index.php` roteia por endpoint (login/register/change-password).
- Senhas armazenadas com `password_hash`.
- Estilos centralizados em `styles/index.ts`.

Leia os arquivos detalhados incluídos: CODE_DOCS.md, API.md, DEV_GUIDE.md, TCC_SUMMARY.md
