<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

//Variable recibida desde el js
$idCurso = $_POST['idToDelete'];

//Query para eliminar al cliente
$query = "DELETE FROM cursos WHERE id = '$idCurso'";

$result = $connection->query($query);

$query = "DELETE FROM cursos_dietas WHERE idDieta = '$idCurso'";

$result = $connection->query($query);

$query = "DELETE FROM cursos_entrenamientos WHERE idEntrenamiento = '$idCurso'";

$result = $connection->query($query);

if ($result === true) {
    //Redirección a la página de clientes (recargarla)
    header('Location: ../cursoList.html');
    exit();
} else {
    echo "alert('Error al eliminar el usuario')";
}

$connection->close();
