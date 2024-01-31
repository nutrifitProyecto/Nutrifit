<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$ent = $_POST['cursoEnt'];
$coste = $_POST['cursoCoste'];
$tipo = $_POST['cursoTipo'];

$query = "INSERT INTO cursos (idEntrenador, costeMes, tipo) VALUES ('$ent', '$coste', '$tipo')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../cursoList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
$connection->close();