<?php
session_start();
include "../../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idCurso = $_GET['idCurso'];

$query = "SELECT cursos.costeMes AS coste, dietas.nombre, dietas.description AS dietDesc, dietas.tipo, dietas.valor_calorico,dietas.comidas_dia  
            FROM cursos_dietas
            LEFT JOIN cursos
            ON cursos.id = cursos_dietas.idCurso
            LEFT JOIN dietas
            ON dietas.id = cursos_dietas.idDieta
            WHERE cursos.id = '$idCurso'";

$result = $connection->query($query);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();
