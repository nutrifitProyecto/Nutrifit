<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$query = 'SELECT factura.*, clientes.name AS cliName, clientes.surname AS cliSurname, entrenamientos.nombre AS entrenamientoNombre, dietas.nombre AS dietaNombre
FROM factura
	LEFT JOIN clientes
    ON clientes.id = factura.idCliente
    LEFT JOIN cursos
    ON cursos.id = factura.idCurso
    LEFT JOIN cursos_entrenamientos
    ON cursos.id = cursos_entrenamientos.idCurso
    LEFT JOIN entrenamientos
    ON cursos_entrenamientos.idEntrenamiento = entrenamientos.id
  	LEFT JOIN cursos_dietas
    ON cursos.id = cursos_dietas.idCurso
    LEFT JOIN dietas
    ON cursos_dietas.idDieta = dietas.id';

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();