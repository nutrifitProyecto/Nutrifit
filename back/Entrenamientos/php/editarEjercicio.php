<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_POST['ejEditId'];
$day = $_POST['ejEditDay'];
$desc = $_POST['ejEditDesc'];
$dur = $_POST['ejEditDur'];

$query = "UPDATE ejercicios SET dia = '$day', description = '$desc', duracion = '$dur' WHERE id = '$id'";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../ejercicioList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();