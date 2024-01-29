<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Recogida de datos del formulario
$cli = $_POST['rateClient'];
$ent = $_POST['rateEnt'];
$rate = $_POST['rate'];

$query = "INSERT INTO valoracion (idCliente, idEntrenador, rate) VALUES ('$cli', '$ent', '$rate')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../valoracionList.html');
        exit();
} else {
        $query = "DELETE FROM entrenadores WHERE email = '$email'";
        $connection->query($query);
        echo "alert('error al crear el usuario')";
}
$connection->close();