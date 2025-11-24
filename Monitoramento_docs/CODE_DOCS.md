# Documentação do Código (resumida)
Generated: 2025-11-24 22:33 UTC

## Arquivos principais
- app/login/login.tsx (ou .jsx): tela de login; envia POST /login; usa styles/globalStyles e loginStyles.
- app/login/cadastro.tsx: tela de cadastro; envia POST /register.
- app/login/esqueciSenha.tsx: tela de reset; envia POST /change-password (se implementado).
- app/dashboard/home.jsx: dashboard; consome dados do backend (implementar endpoints adicionais).
- styles/index.ts: centraliza colors, spacing, typography, globalStyles, loginStyles, cadastroStyles, esqueciSenhaStyles, dashboardStyles.
- api/index.php: roteador simples (POST /login, /register, /change-password).
- api/controllers/controller.php: funções registerUser, loginUser, changePassword.
- api/connection.php: classe Connection (PDO) — ajustar credenciais.

## Fluxo de Login
1. App envia POST para `/api/index.php/login` com JSON {email, senha}.
2. index.php extrai endpoint e chama loginUser.
3. loginUser consulta `users` e valida `password_verify`.
4. Retorna JSON {"success": true, "user": {...}} ou erro.

## Onde procurar "gambiarras"
- index.php faz parsing manual do URI usando SCRIPT_NAME — pode variar por servidor.
- Rotas hard-coded (strings) em componentes — preferir constantes centrais.
- Uso de `10.0.2.2` no emulador Android (documentado).

## Recomendação rápida de melhorias
- Usar token JWT no login em vez de apenas resposta com user.
- Melhorar roteamento PHP com um micro-framework (Slim/Lumen) ou .htaccess rewrite.
- Validar entradas no backend (email format, senha min).
- Remover var_dumps e mensagens de erro em produção.
