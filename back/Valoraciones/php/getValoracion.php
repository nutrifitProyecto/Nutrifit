<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Consulta con legt join para obtener el nombre y apellidos de los entrenadores y clientes
$query = 'SELECT valoracion.id, clientes.name AS cliName, clientes.surname AS cliSurname, entrenadores.name AS entName, entrenadores.surname AS entSurname, valoracion.rate
 FROM valoracion
 LEFT JOIN clientes
 ON valoracion.idCliente = clientes.id
 LEFT JOIN entrenadores
 ON valoracion.idEntrenador = entrenadores.id';

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();