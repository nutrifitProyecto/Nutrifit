<?php
session_start();
include "../inc/dbinfo.inc";

//Creación de la conexión
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

if (mysqli_connect_errno()) {
  echo "Fallo al conectar a MySQL: " . mysqli_connect_error();
}

//Seleccion de la base de datos
$connection->select_db(DB_DATABASE);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //Guardamos email y passwd
    $email = $_POST['email'];
    $passwd = $_POST['passwd'];

    //Creamos una consulta
    $query = "SELECT * FROM clientes WHERE email='$email' AND password='$passwd'";
    $result = $connection->query($query);

    if (!$result) {
        die("Error en la consulta: " . $connection->error);
    }

    //Si devuelve solo una línea es que a encontrado al usuario
    if ($result->num_rows == 1) {
        $_SESSION['email'] = $email;
        header('Location: ../../front/src/index.html');
        exit();
    } else {
        $error = "email o contraseña incorrectos.";
        header('Location: ../../front/src/login.html');
        exit();
    }
}
?>

