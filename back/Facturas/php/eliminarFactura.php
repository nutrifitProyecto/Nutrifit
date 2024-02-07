<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Variable recibida desde el js
$idFactura = $_POST['idToDelete'];

//Query para eliminar al cliente
$query = "DELETE FROM factura WHERE id = '$idFactura'";

$result = $connection->query($query);

if ($result === true) {
    //Redirección a la página de facturas (recargarla)
    header('Location: ../facturasList.html');
    exit();
} else {
    echo "alert('Error al eliminar la factura')";
}

$connection->close();
