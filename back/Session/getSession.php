<?php
session_start();

// Verificar si el usuario está autenticado
if(isset($_SESSION['email'])) {
    $respuesta = array('autenticado' => true, 'email' => $_SESSION['email']);
} else {
    $respuesta = array('autenticado' => false);
}

echo json_encode($respuesta);
?>