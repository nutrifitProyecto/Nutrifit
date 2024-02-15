<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$query = 'SELECT
e.name AS Entrenador,
e.surname AS apellido,
d.nombre AS Dieta,
d.description AS Descripcion
FROM
dietas d
LEFT JOIN
cursos_dietas cd ON d.id = cd.idDieta
LEFT JOIN
cursos c ON cd.idCurso = c.id
JOIN
entrenadores e ON c.idEntrenador = e.id';

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();