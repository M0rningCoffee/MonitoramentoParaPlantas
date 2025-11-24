<?php
require_once "connection.php";

function registerUser($email, $senha) {
    $db = new Connection();
    $conn = $db->connect();
    if (!$conn) return ["success" => false, "error" => "DB error"];
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (email, senha) VALUES (?, ?)");
    if ($stmt->execute([$email, $senhaHash])) {
        return ["success" => true, "userId" => $conn->lastInsertId()];
    } else {
        return ["success" => false, "error" => "Não foi possível cadastrar"];
    }
}

function loginUser($email, $senha) {
    $db = new Connection();
    $conn = $db->connect();
    if (!$conn) return ["success" => false, "error" => "DB error"];
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($senha, $user['senha'])) {
        return ["success" => true, "user" => $user];
    } else {
        return ["success" => false, "error" => "Usuário ou senha incorretos"];
    }
}

// NOVAS FUNÇÕES:
function getPlants() {
    $db = new Connection();
    $conn = $db->connect();
    if (!$conn) return ["success" => false, "error" => "DB error"];
    $stmt = $conn->prepare("SELECT p.id_planta, p.nome_planta, p.umidade, s.tipo as tipo_solo FROM planta p LEFT JOIN solo s ON p.id_solo = s.id_solo");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return ["success" => true, "plants" => $rows];
}

function getPlantById($id) {
    $db = new Connection();
    $conn = $db->connect();
    if (!$conn) return ["success" => false, "error" => "DB error"];
    $stmt = $conn->prepare("SELECT p.id_planta, p.nome_planta, p.umidade, s.tipo as tipo_solo FROM planta p LEFT JOIN solo s ON p.id_solo = s.id_solo WHERE p.id_planta = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) return ["success" => true, "plant" => $row];
    return ["success" => false, "error" => "Planta não encontrada"];
}
