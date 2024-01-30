<?php
include "../../../inc/dbinfo.inc";

// Conectarse a la base de datos
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$selectValue = $_POST['select_ejercicios'];
$idEnt = $_POST['insertEjEntId']

// Comprobar si hay campos duplicados
$sql = "SELECT idEjercicio, COUNT(*)
    FROM entrenamiento_ejercicio
    WHERE mi_campo = 'valor_determinado'
    GROUP BY idEjercicio
    HAVING COUNT(*) > 1;";

// Ejecutar la consulta
$result = $conn->query($sql);

// Verificar si el resultado es igual a 1
if ($result->num_rows == 1) {
    echo "Hay duplicados en la tabla.";
} else {
    $query = "INSERT INTO entrenamiento_ejercicio (idEntrenamiento, idEjercicio) VALUES ('$idEnt', '$idEj')";

    $result = $connection->query($query);

    if ($result === true) {
        header('Location: ../entrenamientoList.html');
        exit();
    } else {
        echo "alert('error al crear el usuario')";
    }
}

// Cerrar la conexión
$conn->close();
