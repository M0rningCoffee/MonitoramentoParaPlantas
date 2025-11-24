<?php
require "controllers/controller.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"), true);

if ($method == 'POST' && strpos($request, '/login') !== false) {
    $email = $data['email'] ?? '';
    $senha = $data['senha'] ?? '';
    $result = loginUser($email, $senha);
    echo json_encode($result);
} elseif ($method == 'POST' && strpos($request, '/register') !== false) {
    $email = $data['email'] ?? '';
    $senha = $data['senha'] ?? '';
    $result = registerUser($email, $senha);
    echo json_encode($result);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota não encontrada"]);
}

// ... código existente que define $endpoint, $method, $data ...

if ($method === 'GET' && $endpoint === "plants") {
    $result = getPlants();
    echo json_encode($result);
    exit;
} elseif ($method === 'GET' && $endpoint === "plant") {
    // passar id via query string: /index.php/plant?id=1
    $id = $_GET['id'] ?? null;
    $result = getPlantById($id);
    echo json_encode($result);
    exit;
}
// ... existing POST login/register handlers ...
