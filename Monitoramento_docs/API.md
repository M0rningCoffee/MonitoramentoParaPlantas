# Documentação da API
Generated: 2025-11-24 22:33 UTC

Base URL (local):
- Android emulator: http://10.0.2.2/api/index.php
- Localhost (web/iOS): http://localhost/api/index.php

## Endpoints
### POST /register
Request JSON:
{ "email": "user@example.com", "senha": "plaintext" }
Response on success:
{ "success": true, "userId": 1 }
Errors:
{ "success": false, "error": "..." }

### POST /login
Request JSON:
{ "email": "user@example.com", "senha": "plaintext" }
Response success:
{ "success": true, "user": { "id": "1", "email": "...", "senha": "$2y$..." } }
Error:
{ "success": false, "error": "Usuário ou senha incorretos" }

### POST /change-password
(Request optional — implementado se presente)
{ "email": "user@example.com", "novaSenha": "newpass" }
Response:
{ "success": true, "message": "Senha alterada com sucesso" }

## DB schema (relevant part)
Table `users`:
- id INT AUTO_INCREMENT PRIMARY KEY
- email VARCHAR(255) UNIQUE
- senha VARCHAR(255) (hashed)

Other tables:
- solo, planta, log (see SQL script in repo)

## Notes
- All responses are JSON.
- CORS: index.php sets Access-Control-Allow-Origin: *
- Use Postman to test endpoints.
