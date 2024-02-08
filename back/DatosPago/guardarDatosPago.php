<?php
include "../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idCli = $_POST['idCliente'];
$nombreTitular = $_POST['nombreTitular'];
$numTarjeta = $_POST['numTarjeta'];
$cvv = $_POST['cvv'];
$fechaExp = $_POST['fechaExp'];

$query = "SELECT * FROM datos_pago WHERE idCliente = '$idCli'";

$result = $connection->query($query);

if ($result->num_rows === 0) {
        $query = "INSERT INTO datos_pago (idCliente, num_tarjeta, fecha_caducidad, cvv, nombreTitular) VALUES ('$idCli', '$numTarjeta', '$fechaExp', '$cvv', '$nombreTitular')";

        $result = $connection->query($query);

        if ($result === true) {
                header('Location: ../clientList.html');
                exit();
        } else {
                echo "alert('error al crear el usuario')";
        }
} else {
        $query = "UPDATE datos_pago SET num_tarjeta = '$numTarjeta', fecha_caducidad = '$fechaExp', cvv = '$cvv', nombreTitular = '$nombreTitular' WHERE idCliente = '$idCli'";

        $result = $connection->query($query);

        if ($result === true) {
                header('Location: ../clientList.html');
                exit();
        } else {
                echo "alert('error al crear el usuario')";
        }
}




$connection->close();
