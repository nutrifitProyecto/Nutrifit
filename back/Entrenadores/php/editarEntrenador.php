<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_POST['entEditId'];
$name = $_POST['entEditName'];
$surname = $_POST['entEditSurname'];
$desc = $_POST['entEditDesc'];

$query = "UPDATE entrenadores SET name = '$name', surname = '$surname', description = '$desc' WHERE id = $id";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../entrenadorList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();