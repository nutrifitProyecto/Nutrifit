let logType = document.getElementById('logType')

// Evento click en el cambio de entrenador a cliente
logType.addEventListener('click', () => {
  let form = document.getElementById('formLogIn')
  let attr = form.getAttribute('logTo')

  if (attr == 'cliente') { // Cambiar a inicio de sesión a entrenador
    form.setAttribute('logTo', 'entrenador')
    logType.innerHTML = 'Soy entrenador'

    // Establecer action para php de entrenador
    document.getElementById('formLogIn').action = "../../back/src/loginEntrenador.php"
  } else { // Volver a iniciar sesión como cliente
    form.setAttribute('logTo', 'cliente')
    logType.innerHTML = 'Soy cliente'

    // Establecer action para php de entrenador
    document.getElementById('formLogIn').action = "../../back/src/loginClient.php"
  }
})