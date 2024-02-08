<?php
session_start();
include "../inc/dbinfo.inc";

// Creación de la conexión
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

if (mysqli_connect_errno()) {
    echo "Fallo al conectar a MySQL: " . mysqli_connect_error();
}

// Seleccion de la base de datos
$connection->select_db(DB_DATABASE);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //guardp informacion
    $name = $_POST['nombre'];
    $surname = $_POST['apellido'];
    $fnacimiento = $_POST['fechaNacimiento']; //aun no esta en la base de datos
    $weight = $_POST['peso'];
    $height = $_POST['altura'];
    $email = $_POST['email'];
    $passwd = $_POST['passwd'];

    $hashContraseña = password_hash($passwd, PASSWORD_DEFAULT);

    $query = "INSERT INTO clientes (name, surname, email, password, tipo, weight, height, fecha_nacimiento) VALUES ('$name', '$surname', '$email', '$hashContraseña', 0, '$weight', '$height', '$fnacimiento')";

    $result = $connection->query($query);

    if ($result === true) {
        $_SESSION['email'] = $email;
        header('Location: ../../front/index/index.html');
        exit();
    } else {
        $query = "DELETE FROM clientes WHERE email = '$email'";
        $connection->query($query);
        echo "alert('error al crear el usuario')";
    }
    $connection->close();
}
