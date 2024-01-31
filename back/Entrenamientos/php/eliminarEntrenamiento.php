<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Variable recibida desde el js
$idEntrenamiento = $_POST['idToDelete'];

//Query para eliminar al ejercicio
$query = "DELETE FROM entrenamientos WHERE id = '$idEntrenamiento'";

$result = $connection->query($query);

if ($result === true) {
    //Redirección a la página de ejercicios (recargarla)
    header('Location: ../entrenamientoList.html');
    exit();
} else {
    echo "alert('Error al eliminar el usuario')";
}

$connection->close();
