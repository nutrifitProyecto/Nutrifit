function registrarse(){
    let titulo=document.querySelector("main h2");
    titulo.textContent="Registrarse";

    let div=document.querySelector(".formularioLogin");

    div.innerHTML=
    `<form method="post" action="../../back/src/loginClient.php">
    <label for="client-email">Correo electronico:</label>
    <input id="client-email" type="email" name="email" required><br>
    
    <label for="client-passwd">Contraseña:</label>
    <input id="client-passwd" type="password" name="passwd" required><br>

    <label for="client-passwd2">Repetir contraseña:</label>
    <input id="client-passwd2" type="password" name="passwd" required><br>
    
    <p><a>Soy entrenador</a></p>

    <input type="submit" value="Registrarse">
    </form>`;
}