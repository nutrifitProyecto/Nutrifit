<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Recogida de datos del formulario
$id = $_POST['dietEditId'];
$name = $_POST['dietEditName'];
$valor = $_POST['dietEditValor'];
$desc = $_POST['dietEditDesc'];
$tipo = $_POST['dietEditTipo'];
$comidas = $_POST['dietEditComidas'];

$query = "UPDATE dietas SET nombre = '$name', description = '$desc', tipo = '$tipo', valor_calorico = '$valor', comidas_dia = '$comidas' WHERE id = '$id'";

$result = $connection->query($query);

if ($result === true) {
    header('Location: ../dietaList.html');
    exit();
} else {
    echo "alert('Error al editar el usuario')";
}

$connection->close();