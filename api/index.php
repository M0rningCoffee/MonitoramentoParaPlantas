<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        break;
    case 'POST':
        if ($_SERVER['REQUEST_URI'] == '/umidade') {
            
        }
        break;
    case 'PUT':
        break;
    case 'DELETE':
        break;
    default:
        http_response_code(405);
        break;
}