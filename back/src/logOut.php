<?php
session_start();

if (isset($_SESSION['email'])) {
    # code...
}

session_destroy();
header("Location:login.html");