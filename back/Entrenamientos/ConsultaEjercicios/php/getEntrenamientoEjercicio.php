<?php
session_start();
include "../../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_GET['id'];

$query = 'SELECT ejercicios.dia AS ejDia, ejercicios.description AS ejDesc, ejercicios.duracion AS ejDur
    FROM ejercicios
    LEFT JOIN entrenamiento_ejercicio
        ON entrenamiento_ejercicio.idEjercicio = ejercicios.id
    WHERE entrenamiento_ejercicio.idEntrenamiento = $id';

$result = $connection->query($query);

echo "<script>console.log(" . $result . ")</script>";

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();
