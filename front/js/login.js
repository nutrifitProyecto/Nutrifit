let logType = document.getElementById('logType')

logType.addEventListener('click', () => {
  let form = document.getElementById('formLogIn')
  let attr = form.getAttribute('logTo')

  if (attr == 'cliente') {
    form.setAttribute('logTo', 'entrenador')
    logType.innerHTML = 'Soy entrenador'
    document.getElementById('formLogIn').action = "../../back/src/loginEntrenador.php"
    console.log(document.getElementById('formLogIn'));
  } else {
    form.setAttribute('logTo', 'cliente')
    logType.innerHTML = 'Soy cliente'
    document.getElementById('formLogIn').action = "../../back/src/loginClient.php"
    console.log(document.getElementById('formLogIn'));
  }
})