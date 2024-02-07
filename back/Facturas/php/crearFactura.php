<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$cli = $_POST['factCli'];
$curs = $_POST['factCurs'];
$desc = $_POST['factDesc'];
$costeTotal = $_POST['factCosteTotal'];
$meses = $_POST['factMeses'];
$coste = $_POST['costeA'];


$query = "INSERT INTO factura (idCliente, idCurso, description, costeTotal, mesesSuscripcion) VALUES ('$cli', '$curs', '$desc', '$coste', '$meses')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../facturasList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
$connection->close();