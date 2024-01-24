<?php
include "../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['cliName'];
$surname = $_POST['cliSurname'];
$email = $_POST['cliEmail'];
$passwd = $_POST['cliPasswd'];
$tipo = $_POST['cliTipo'];

$query = "INSERT INTO clientes (NAME, SURNAME, EMAIL, PASSWORD, TIPO) VALUES ('$name', '$surname', '$email', '$passwd', '$tipo')";

$result = $connection->query($query);

if ($connection->$result === true) {
        header('./clientList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
