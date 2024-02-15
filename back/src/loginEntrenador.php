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
    // Guardamos email y passwd
    $email = $_POST['email'];
    $passwd = $_POST['passwd'];

    if ($connection->connect_error) {
        die("Error en la conexión: " . $connection->connect_error);
    }

    // Creamos una consulta
    $query = "SELECT * FROM entrenadores WHERE email = '$email'";
    $result = $connection->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Guarda la contraseña de la consulta
        $compPasswd = $row['password'];

        if (password_verify($passwd, $compPasswd)) {
            $_SESSION['email'] = $email;
            $_SESSION['tipo'] = 2;  // Guardar el tipo de usuario en la sesión

            $tipoUsuario = 2;

            if ($tipoUsuario == 2) {
                header('Location: ../../front/index/index.html'); // Cambiado el nombre de la página
                exit();
            }
        }
    } else {
        //$error = "email o contraseña incorrectos.";
        //header('Location: ../../front/index/loginpage.html');
        exit();
    }
}
