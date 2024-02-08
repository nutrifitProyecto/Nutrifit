<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['cliName'];
$surname = $_POST['cliSurname'];
$email = $_POST['cliEmail'];
$passwd = $_POST['cliPasswd'];
$tipo = $_POST['cliTipo'];

$hashContraseña = password_hash($passwd, PASSWORD_DEFAULT);

$query = "INSERT INTO clientes (name, surname, email, password, tipo) VALUES ('$name', '$surname', '$email', '$hashContraseña', '$tipo')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../clientList.html');
        exit();
} else {
        $query = "DELETE FROM clientes WHERE email = '$email'";
        $connection->query($query);
        echo "alert('error al crear el usuario')";
}
$connection->close();