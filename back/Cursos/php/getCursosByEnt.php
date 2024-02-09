<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$variable = $_GET['id'];

$query = "SELECT 
e.name AS Entrenador,
c.idEntrenador AS ID_Entrenador,
t.nombre AS Entrenamiento,
t.description AS Descripcion_Entrenamiento
FROM 
cursos c
JOIN 
entrenadores e ON c.idEntrenador = e.id
LEFT JOIN 
cursos_entrenamientos ce ON c.id = ce.idCurso
LEFT JOIN 
entrenamientos t ON ce.idEntrenamiento = t.id
WHERE 
e.id = '$variable'
LIMIT 1";

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();