<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$dia = $_POST['ejDia'];
$desc = $_POST['ejDesc'];
$dur = $_POST['ejDuracion'];

//query que inserta datos en la tabla ejercicios
$query = "INSERT INTO ejercicios (dia, description, duracion) VALUES ('$dia', '$desc', '$dur')";

$result = $connection->query($query);

if ($result === true) {
        header('Location: ../ejercicioList.html');
        exit();
} else {
        echo "alert('error al crear el usuario')";
}
$connection->close();