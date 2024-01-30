<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Variable recibida desde el js
$idEjercicio = $_POST['idToDelete'];

//Query para eliminar al ejercicio
$query = "DELETE FROM ejercicios WHERE id = '$idEjercicio'";

$result = $connection->query($query);

if ($result === true) {
    //Redirección a la página de ejercicios (recargarla)
    header('Location: ../ejercicioList.html');
    exit();
} else {
    echo "alert('Error al eliminar el usuario')";
}

$connection->close();
