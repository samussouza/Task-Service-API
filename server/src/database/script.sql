CREATE DATABASE tarefas;
use tarefas;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(65) NOT NULL UNIQUE,
    senha VARCHAR(20)
);

CREATE TABLE tarefas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(40) NOT NULL,
    categoria VARCHAR(25) NOT NULL,
    anotacoes VARCHAR(255) NOT NULL,
    fk_user INT,
    FOREIGN KEY (fk_user)
        REFERENCES usuario (id)
);

select * from usuario;
select * from tarefas;