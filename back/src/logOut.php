<?php
session_start();

if (isset($_SESSION['email'])) {
    session_destroy();

    unset($_SESSION['email']);

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
        header("Location: ../../front/index/index.html");
    }
}
