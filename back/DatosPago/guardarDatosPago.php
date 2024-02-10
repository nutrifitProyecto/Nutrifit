<?php
include "../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$idCli = $_POST['idCliente'];
$nombreTitular = $_POST['nombreTitular'];
$numTarjeta = $_POST['numTarjeta'];
$cvv = $_POST['cvv'];
$fechaExp = $_POST['fechaExp'];
$email = $_POST['emailCliente'];
$tipo = $_POST['tipo'];

$query = "SELECT * FROM datos_pago WHERE idCliente = '$idCli'";

$result = $connection->query($query);

if ($result->num_rows === 0) {
        $query = "INSERT INTO datos_pago (idCliente, num_tarjeta, fecha_caducidad, cvv, nombreTitular) VALUES ('$idCli', '$numTarjeta', '$fechaExp', '$cvv', '$nombreTitular')";

        $result = $connection->query($query);

        if ($result === true) {
                header("Location: ../../front/Perfil/perfil.html?email=$email");
                exit();
        } else {
                echo "error al crear tarjeta";
        }
} else if ($result->num_rows > 0) {
        $query = "UPDATE datos_pago SET num_tarjeta = '$numTarjeta', fecha_caducidad = '$fechaExp', cvv = '$cvv', nombreTitular = '$nombreTitular' WHERE idCliente = '$idCli'";

        $result = $connection->query($query);

        if ($result === true) {
                header("Location: ../../front/Perfil/perfil.html?email=$email&tipo=$tipo");
                exit();
        } else {
                echo "error al actualizar datos tarjeta";
        }
} else {
        echo "nose que pasa";
}




$connection->close();
