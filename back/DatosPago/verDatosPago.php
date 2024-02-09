<?php
include "../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idCliente = $_GET['id'];

$query = "SELECT * FROM datos_pago WHERE idCliente = '$idCliente'";

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();