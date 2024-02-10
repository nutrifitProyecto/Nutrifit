<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$description = $_POST['description'];
$tipo = $_POST['tipo'];

// Editar entrenador por email
$query = "UPDATE entrenadores SET name = '$name', surname = '$surname', description = '$description' WHERE email = '$email'";

$result = $connection->query($query);

if ($result === true) {
    if (!empty($email)) {
        // Redirección a la página del perfil
        header("Location: ../../../front/Perfil/perfil.html?email=$email&tipo=$tipo");
        exit();
    } else {
        echo "Error: El campo de email está vacío.";
    }
} else {
    echo "Error al editar el usuario: " . $connection->error;
}

$connection->close();