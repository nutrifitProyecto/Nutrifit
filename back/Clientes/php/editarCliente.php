<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_POST['cliEditId'];
$name = $_POST['cliEditName'];
$surname = $_POST['cliEditSurname'];
$tipo = $_POST['cliEditTipo'];
$fecha = $_POST['cliEditFecha'];

$query = "UPDATE clientes SET name = '$name', surname = '$surname', tipo = $tipo, fecha_nacimiento = '$fecha' WHERE id = $id";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../clientList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();