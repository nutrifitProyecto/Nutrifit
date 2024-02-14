<?php
session_start();

// Verificar si el usuario está autenticado
if(isset($_SESSION['email']) && isset($_SESSION['tipo'])) {
    $respuesta = array('autenticado' => true, 'email' => $_SESSION['email'], 'tipo' => $_SESSION['tipo']);
} else {
    $respuesta = array('autenticado' => false);
}

echo json_encode($respuesta);
?>