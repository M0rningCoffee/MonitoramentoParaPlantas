<?php
class Connection {
$config = require __DIR__ . "/config.php";
$host = $config['host'];
$dbname = $config['dbname'];
$username = $config['username'];
$password = $config['password'];
$port = $config['port'];
// então construa o DSN como antes...


    function connect() {
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname}";
            $this->connection = new PDO($dsn, $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->connection;
        } catch (PDOException $ex) {
            echo json_encode(["error" => "Não foi possível conectar ao banco", "message" => $ex->getMessage()]);
            return null;
        }
    }
}
