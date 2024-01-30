<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_POST['entEditId'];
$name = $_POST['entEditName'];
$desc = $_POST['entEditDesc'];

$query = "UPDATE entrenamientos SET nombre = '$name', description = '$desc' WHERE id = '$id'";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../entrenamientoList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();