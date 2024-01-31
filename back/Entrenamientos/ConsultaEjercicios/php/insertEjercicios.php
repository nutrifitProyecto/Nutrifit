<?php
include "../../../inc/dbinfo.inc";

// Conectarse a la base de datos
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos de html
$selectValue = $_POST['select_ejercicios'];
$idEnt = $_POST['insertEjEntId'];

// Comprobar si hay campos duplicados
$sql = "SELECT idEjercicio
    FROM entrenamiento_ejercicio
    WHERE idEntrenamiento = '$idEnt'
    AND idEjercicio = '$selectValue'";

// Ejecutar la consulta
$result = $conn->query($sql);

// Verificar si el resultado es igual a 1
if ($result->num_rows > 0) {
    header("Location: ../consultaEjercicios.html?id=$idEnt");
} else {
    $query = "INSERT INTO entrenamiento_ejercicio (idEntrenamiento, idEjercicio) 
                VALUES ('$idEnt', '$selectValue')";

    $result = $conn->query($query);

    if ($result === true) {
        header("Location: ../consultaEjercicios.html?id=$idEnt");
        exit();
    } else {
        echo "alert('error al crear el usuario')";
    }
}

// Cerrar la conexión
$conn->close();
