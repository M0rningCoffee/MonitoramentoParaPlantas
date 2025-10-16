DROP DATABASE IF EXISTS MONITORAMENTO;
CREATE DATABASE MONITORAMENTO;
USE MONITORAMENTO;


CREATE TABLE solo
(
	id_solo INT NOT NULL PRIMARY KEY auto_increment,
	tipo varchar(45) NOT null
);

CREATE TABLE planta(
	id_planta INT NOT NULL PRIMARY KEY auto_increment,
	nome_planta varchar(45) NOT null,
	umidade int,
	id_solo int,
	FOREIGN KEY (id_solo) REFERENCES solo(id_solo)
);

CREATE TABLE log
(
	id_log INT NOT NULL PRIMARY KEY auto_increment,
	id_planta int,
	estado int NOT null,
	_data timestamp default current_timestamp,
	FOREIGN KEY (id_planta) REFERENCES planta(id_planta)
);


