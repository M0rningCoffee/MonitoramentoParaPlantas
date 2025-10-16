<?php

class ConectionDB{

    private $host = 'localhost';
    private $dbname = 'MONITORAMENTO';
    private $username = 'admin';
    private $password = 'admin123';
    private $port = '3306';
    public $connection;

    function connect()
    {

        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname}";

            $this->connection = new PDO($dsn, $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $this->connection;
        } catch (PDOException $ex) {
            echo("Não foi possível conectar ao Banco de Dados");
            echo($ex->getMessage());

            return null;
        }


    }

}

$dbTeste = new ConectionDB();

$dbTeste->connect();
var_dump($dbTeste);
