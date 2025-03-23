CREATE DATABASE db_pm2e2;
USE db_pm2e2;


CREATE TABLE PAISES (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Codigo INT,
    longitud INT
);


CREATE TABLE Contactos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Id_Pais INT,
    Latitud DECIMAL(15,8),
    Longitud DECIMAL(15,8),
    Video_Contacto VARCHAR(255),
    FOREIGN KEY (Id_Pais) REFERENCES PAISES(Id) ON DELETE CASCADE
);


CREATE TABLE AUTORIZACION (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Contraseña VARCHAR(255)
);


DELIMITER $$


CREATE PROCEDURE insertarContactos(
    IN p_nombre VARCHAR(255),
    IN p_idpais INT,
    IN p_latitud DECIMAL(15,8),
    IN p_longitud DECIMAL(15,8),
    IN p_video VARCHAR(255)
)
BEGIN
    INSERT INTO Contactos (Nombre, Id_Pais, Latitud, Longitud, Video_Contacto)
    VALUES (p_nombre, p_idpais, p_latitud, p_longitud, p_video);
END $$

CREATE PROCEDURE actualizarContactos(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_idpais INT,
    IN p_latitud DECIMAL(15,8),
    IN p_longitud DECIMAL(15,8),
    IN p_video VARCHAR(255)
)
BEGIN
    UPDATE Contactos 
    SET Nombre = p_nombre,
        Id_Pais = p_idpais,
        Latitud = p_latitud,
        Longitud = p_longitud,
        Video_Contacto = p_video
    WHERE Id = p_id;
END $$


CREATE PROCEDURE eliminarContactos(
    IN p_id INT
)
BEGIN
    DELETE FROM Contactos 
    WHERE Id = p_id;
END $$

CREATE PROCEDURE obtenerContactos()
BEGIN
    SELECT Id, Nombre FROM Contactos;
END $$


CREATE PROCEDURE obtenerContactosPorID(
    IN p_id INT
)
BEGIN
    SELECT Id, Nombre, Id_Pais, Latitud, Longitud, Video_Contacto
    FROM Contactos
    WHERE Id = p_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE insertarPais(
    IN p_nombre VARCHAR(255),
    IN p_codigo INT
)
BEGIN
    INSERT INTO PAISES (Nombre, Codigo)
    VALUES (p_nombre, p_codigo);
END $$

CREATE PROCEDURE actualizarPais(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_codigo INT
)
BEGIN
    UPDATE PAISES 
    SET Nombre = p_nombre,
        Codigo = p_codigo
    WHERE Id = p_id;
END $$


CREATE PROCEDURE eliminarPais(
    IN p_id INT
)
BEGIN
    DELETE FROM PAISES WHERE Id = p_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE insertarAutorizacion(
    IN p_contraseña VARCHAR(255)
)
BEGIN
    INSERT INTO AUTORIZACION (Contraseña)
    VALUES (p_contraseña);
END $$


CREATE PROCEDURE actualizarAutorizacion(
    IN p_id INT,
    IN p_contraseña VARCHAR(255)
)
BEGIN
    UPDATE AUTORIZACION 
    SET Contraseña = p_contraseña
    WHERE Id = p_id;
END $$


CREATE PROCEDURE eliminarAutorizacion(
    IN p_id INT
)
BEGIN
    DELETE FROM AUTORIZACION WHERE Id = p_id;
END $$

CREATE PROCEDURE obtenerContraseñaPorID(
    IN p_id INT,
    OUT p_contraseña VARCHAR(255)
)
BEGIN
    SELECT Contraseña INTO p_contraseña
    FROM AUTORIZACION
    WHERE Id = p_id;
END $$

CREATE PROCEDURE autorizar(
    IN p_id INT
)
BEGIN
    SELECT Contraseña INTO p_contraseña
    FROM AUTORIZACION
    WHERE Id = p_id;
END $$



DELIMITER ;


INSERT INTO paises(nombre,codigo,longitud)
VALUES
('Honduras', '+504', 8), 
('México', '+52', 10), 
('Estados Unidos', '+1', 10), 
('Guatemala', '+502', 8), 
('El Salvador', '+503', 8), 
('Costa Rica', '+506', 8), 
('Nicaragua', '+505', 8), 
('Panamá', '+507', 8), 
('Colombia', '+57', 10), 
('Argentina', '+54', 10);