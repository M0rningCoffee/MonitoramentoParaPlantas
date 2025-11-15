<?php
require_once "connection.php";

function registerUser($email, $senha) {
    $db = new Connection();
    $conn = $db->connect();

    // Criptografa a senha
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

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($senha, $user['senha'])) {
        return ["success" => true, "user" => $user];
    } else {
        return ["success" => false, "error" => "Usuário ou senha incorretos"];
    }
}
