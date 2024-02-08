<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$fechaNacimiento = $_POST['fNacimiento'];
$weight = $_POST['weight'];
$height = $_POST['height'];

// Editar cliente por email
$query = "UPDATE clientes SET name = '$name', surname = '$surname', fecha_nacimiento = '$fechaNacimiento', weight = '$weight', height = '$height' WHERE email = '$email'";

$result = $connection->query($query);

if ($result === true) {
    if (!empty($email)) {
        // Redirección a la página del perfil
        header("Location: ../../../front/Perfil/perfil.html?email=$email");
        exit();
    } else {
        echo "Error: El campo de email está vacío.";
    }
} else {
    echo "Error al editar el usuario: " . $connection->error;
}

$connection->close();