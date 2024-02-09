<?php
session_start();
include "../../inc/dbinfo.inc";

//Creación de la conexión
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$variable= $_GET['id'];

$query="";

if($variable!=null){
    $query= "SELECT * FROM entrenadores WHERE id = '$variable'";
}else{
    $query = 'SELECT * FROM entrenadores';
}

$result = $connection->query($query);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

$connection->close();