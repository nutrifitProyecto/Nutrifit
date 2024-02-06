<?php
session_start();
include "../../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idCurso = $_GET['idCurso'];

$query = "SELECT cursos.costeMes, entrenamientos.nombre, entrenamientos.description, entrenamientos.id AS entId,  ejercicios.dia AS ejDia, ejercicios.duracion AS ejDur, ejercicios.description AS ejDesc
            FROM cursos_entrenamientos
            LEFT JOIN cursos
            ON cursos.id = cursos_entrenamientos.idCurso
            LEFT JOIN entrenamientos
            ON entrenamientos.id = cursos_entrenamientos.idEntrenamiento
            LEFT JOIN entrenamiento_ejercicio
            ON entrenamientos.id = entrenamiento_ejercicio.idEntrenamiento
            LEFT JOIN ejercicios
            ON entrenamiento_ejercicio.idEjercicio = ejercicios.id
                WHERE cursos_entrenamientos.idCurso = '$idCurso'";

$result = $connection->query($query);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();
