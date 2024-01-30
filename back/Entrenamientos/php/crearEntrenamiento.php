<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['trainName'];
$desc = $_POST['trainDesc'];

//query que inserta datos en la tabla ejercicios
$query = "INSERT INTO entrenamientos (nombre, description, duracion) VALUES ('$name', '$desc')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../entrenamientoList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
$connection->close();