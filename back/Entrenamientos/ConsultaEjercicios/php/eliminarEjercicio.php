<?php
include "../../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Variable recibida desde el js
$idEjercicio = $_POST['idEj'];
$idEntrenamiento = $_POST['idEnt'];

//Query para eliminar al ejercicio
$query = "DELETE FROM entrenamiento_ejercicio 
    WHERE idEjercicio = '$idEjercicio'
    AND idEntrenamiento = '$idEntrenamiento'";

$result = $connection->query($query);

if ($result === true) {
    //Redirección a la página de ejercicios (recargarla)
    header("Location: ../consultaEjercicios.html?id=$idEntrenamiento");
    exit();
} else {
    echo "alert('Error al eliminar el usuario')";
}

$connection->close();
