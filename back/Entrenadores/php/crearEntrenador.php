<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Recogida de datos del formulario
$name = $_POST['entName'];
$surname = $_POST['entSurname'];
$email = $_POST['entEmail'];
$passwd = $_POST['entPasswd'];
$desc = $_POST['entDesc'];

$img= $_POST['entImg'];                                 /**añadido */
$fecha= $_POST['entFnac'];                              /**añadido */

$query = "INSERT INTO entrenadores (name, surname, email, password, description, imgentrenador, fnacimiento) VALUES ('$name', '$surname', '$email', '$passwd', '$desc', '$img', '$fecha')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../entrenadorList.html');
        exit();
} else {
        $query = "DELETE FROM entrenadores WHERE email = '$email'";
        $connection->query($query);
        echo "alert('error al crear el usuario')";
}
$connection->close();