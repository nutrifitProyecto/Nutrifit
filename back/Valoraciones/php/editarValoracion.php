<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Recogida de datos del formulario
$id = $_POST['rateEditId'];
$cli = $_POST['rateEditClient'];
$ent = $_POST['rateEditEntrenador'];
$rate = $_POST['rateEditRate'];

$query = "UPDATE valoracion SET idCliente = '$cli', idEntrenador = '$ent', rate = '$rate' WHERE id = $id";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../valoracionList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();