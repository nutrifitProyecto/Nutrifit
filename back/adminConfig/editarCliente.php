<?php
include "../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$id = $_POST['cliEditId'];
$name = $_POST['cliEditName'];
$surname = $_POST['cliEditSurname'];
$tipo = $_POST['cliEditTipo'];

echo "<script>console.log('aaaaa" . $id . "aaaaaa')</script>";
echo "<script>console.log('aaaaa" . $name . "aaaaaa')</script>";
echo "<script>console.log('aaaaa" . $surname . "aaaaaa')</script>";
echo "<script>console.log('aaaaa" . $tipo . "aaaaaa')</script>";

$query = "UPDATE clientes SET name = $name, surname = $surname, tipo = $tipo WHERE id = $id";

$result = $connection->query($query);

if ($connection->$result === true) {
        header('./clientList.html');
        exit();
} else {
        echo "alert('Error al editar el usuario')";
}
