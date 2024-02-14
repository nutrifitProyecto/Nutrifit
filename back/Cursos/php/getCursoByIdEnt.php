<?php
session_start();
include "../../inc/dbinfo.inc";

// Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idEnt = $_GET['idEntrenador'];

// Query de los cursos según id entrenador
$query = "SELECT cursos.id AS cId, cursos.tipo AS cTipo, cursos.costeMes AS cCoste, entrenamientos.nombre AS entName, entrenamientos.description AS entDesc, dietas.nombre AS dietNom, dietas.description AS dietDesc, dietas.tipo AS dietTipo, dietas.valor_calorico AS dietVal, dietas.comidas_dia AS dietCom FROM cursos 
            LEFT JOIN cursos_entrenamientos
            ON cursos_entrenamientos.idCurso = cursos.id
            LEFT JOIN entrenamientos
            ON entrenamientos.id = cursos_entrenamientos.idEntrenamiento
            LEFT JOIN cursos_dietas
            ON cursos_dietas.idCurso = cursos.id
            LEFT JOIN dietas
            ON dietas.id = cursos_dietas.idDieta
        WHERE idEntrenador = $idEnt";

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();