DROP DATABASE IF EXISTS MONITORAMENTO;
CREATE DATABASE MONITORAMENTO;
USE MONITORAMENTO;

CREATE TABLE planta(
	id_planta INT NOT NULL PRIMARY KEY auto_increment,
	nome_planta varchar(45) NOT null,
	umidade int
);

CREATE TABLE solo
(
	id_solo INT NOT NULL PRIMARY KEY auto_increment,
	tipo varchar(45) NOT null
);

CREATE TABLE log
(
	id_log INT NOT NULL PRIMARY KEY auto_increment,
	estado int NOT null,
	_data timestamp
);


