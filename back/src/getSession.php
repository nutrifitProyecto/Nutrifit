<?php
if (isset($_SESSION['email'])) {
    echo $_SESSION['email'];
} else {
    echo "mimare";
}
