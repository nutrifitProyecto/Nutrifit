<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$variable = $_GET['id'];

$query = "SELECT 
e.name AS Entrenador,
c.idEntrenador AS ID_Entrenador,
d.nombre AS Dieta,
d.description AS Descripcion_Dieta,
d.tipo AS Tipo_Dieta,
d.valor_calorico AS Valor_Calorico,
d.comidas_dia AS Comidas_Dia
FROM 
cursos c
JOIN 
entrenadores e ON c.idEntrenador = e.id
LEFT JOIN 
cursos_dietas cd ON c.id = cd.idCurso
LEFT JOIN 
dietas d ON cd.idDieta = d.id
WHERE 
e.id = '$variable'
LIMIT 1";

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();