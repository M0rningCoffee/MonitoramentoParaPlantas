# Guia do Desenvolvedor (resumido)
Generated: 2025-11-24 22:33 UTC

## Instalação (frontend)
1. Instale Node.js e Yarn/npm.
2. Na pasta do projeto:
   yarn install
   expo install
3. Rode:
   expo start

## Backend (PHP)
1. Coloque `api/` em htdocs.
2. Ajuste `connection.php` com credenciais MySQL.
3. Crie database `MONITORAMENTO` e tabelas (script SQL incluído).
4. Inicie Apache & MySQL (XAMPP/WAMP).

## Testes locais
- Use Postman para testar /register e /login.
- Android emulator: URLs com 10.0.2.2.

## Como adicionar nova rota PHP (padrão atual)
1. Em controllers/controller.php, crie função (e.g., getPlants).
2. Em index.php, adicione condicional por endpoint e chame a função.
3. Retorne JSON.

## Como adicionar nova tela RN
1. Criar arquivo em app/ com rota compatível (expo-router).
2. Registrar se necessário no _layout.js (ou deixe o router resolver pela pasta).
3. Reutilizar estilos de styles/index.ts.

## Check-list antes de PR
- remover console.log sensíveis
- testar no emulador Android/iOS
- garantir que connection.php não tem credenciais erradas
