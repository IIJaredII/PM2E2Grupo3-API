CREATE DATABASE dbPm2E2;
USE dbPm2E2;

CREATE TABLE paises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    codigo INT,
    longitud INT
);

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    idPais INT,
    telefono VARCHAR(30),
    latitud DECIMAL(15,8),
    longitud DECIMAL(15,8),
    videoContacto VARCHAR(255),
    FOREIGN KEY (idPais) REFERENCES paises(id) ON DELETE CASCADE
);

CREATE TABLE autorizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contrasena VARCHAR(255)
);

DELIMITER $$

CREATE PROCEDURE insertarContactos(
    IN pNombre VARCHAR(255),
    IN pIdPais INT,
    IN pTelefono VARCHAR(30),
    IN pLatitud DECIMAL(15,8),
    IN pLongitud DECIMAL(15,8),
    IN pVideo VARCHAR(255)
)
BEGIN
    INSERT INTO contactos (nombre, idPais, telefono, latitud, longitud, videoContacto)
    VALUES (pNombre, pIdPais, pTelefono, pLatitud, pLongitud, pVideo);
END $$

CREATE PROCEDURE actualizarContactos(
    IN pId INT,
    IN pNombre VARCHAR(255),
    IN pIdPais INT,
    IN pTelefono VARCHAR(30),
    IN pLatitud DECIMAL(15,8),
    IN pLongitud DECIMAL(15,8),
    IN pVideo VARCHAR(255)
)
BEGIN
    UPDATE contactos 
    SET nombre = pNombre,
        idPais = pIdPais,
        telefono = pTelefono,
        latitud = pLatitud,
        longitud = pLongitud,
        videoContacto = pVideo
    WHERE id = pId;
END $$

CREATE PROCEDURE eliminarContacto(
    IN pId INT
)
BEGIN
    DELETE FROM contactos WHERE id = pId;
END $$

CREATE PROCEDURE obtenerContactos()
BEGIN
    SELECT c.id, c.nombre, p.codigo, c.telefono, c.longitud, c.latitud FROM contactos c
    INNER JOIN paises p ON c.idPais = p.id;
END $$

CREATE PROCEDURE obtenerContactoPorId(
    IN pId INT
)
BEGIN
    SELECT c.id, c.nombre, p.codigo, c.telefono, c.latitud, c.longitud, c.videoContacto
    FROM contactos c
    INNER JOIN paises p ON p.id = c.idPais
    WHERE c.id = pId;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerPaises()
BEGIN
    SELECT id,codigo,longitud FROM paises;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE insertarAutorizacion(
    IN pContrasena VARCHAR(255)
)
BEGIN
    INSERT INTO autorizacion (contrasena)
    VALUES (pContrasena);
END $$

CREATE PROCEDURE actualizarAutorizacion(
    IN pId INT,
    IN pContrasena VARCHAR(255)
)
BEGIN
    UPDATE autorizacion 
    SET contrasena = pContrasena
    WHERE id = pId;
END $$

CREATE PROCEDURE eliminarAutorizacion(
    IN pId INT
)
BEGIN
    DELETE FROM autorizacion WHERE id = pId;
END $$

CREATE PROCEDURE obtenerContrasenaPorId(
    IN pId INT,
    OUT pContrasena VARCHAR(255)
)
BEGIN
    SELECT contrasena INTO pContrasena
    FROM autorizacion
    WHERE id = pId;
END $$

CREATE PROCEDURE autorizar(
    IN pId INT
)
BEGIN
    SELECT id,contrasena FROM autorizacion
    WHERE id = pId;
END $$

DELIMITER ;

INSERT INTO autorizacion(id, contrasena)
VALUES (202502, 'contraseña');

INSERT INTO paises(nombre, codigo, longitud)
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
