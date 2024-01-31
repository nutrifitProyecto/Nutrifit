<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Recogida de datos del formulario
$name = $_POST['dietName'];
$desc = $_POST['dietDesc'];
$tipo = $_POST['dietTipo'];
$valor = $_POST['dietValor'];
$comidas = $_POST['dietComidas'];

$query = "INSERT INTO dietas (nombre, description, tipo, valor_calorico, comidas_dia) VALUES ('$name', '$desc', '$tipo', '$valor', '$comidas')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../dietaList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
$connection->close();