let sesion = []
let loggedOut = document.getElementsByClassName('loggedOut')
let loggedIn = document.getElementsByClassName('loggedIn')

// Recoge los datos de la sesión
function datosSesion() {
  // Realizar una solicitud al servidor para verificar el estado de la sesión
  $.ajax({
    url: '../../back/Session/getSession.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      sesion = data
      if (sesion.autenticado) {
        console.log('Usuario autenticado:', sesion.autenticado + "\n" + sesion.email + "\n" + sesion.tipo);
        // Creación de cabecera
        prepararCabecera()
        loggedIn[0].style.display = 'none'
        loggedIn[1].style.display = 'none'
      } else {
        console.log('Usuario no autenticado');
        // Creación de cabecera
        prepararCabecera()
        loggedOut[0].style.display = 'none'
        loggedOut[1].style.display = 'none'
      }
    },
    error: function (error) {
      console.error('Error en la solicitud AJAX:', error);
    }
  })
}

// Prepara la cabecera y la muestra
function prepararCabecera() {
  let header = document.getElementsByTagName("header")[0];
  const email = sesion.email || '';
  const tipo = sesion.tipo || '';
  header.innerHTML = `
  <a href="../index/index.html" style="margin-top:15px">
    <div id="logo-title" style="display: flex">
      <img src="../img/logo1.png" alt="logo" class="img-logo">
      <span id="title">NUTRI<span>FIT</span></span>
    </div>
  </a>
  <div onclick="displayChange()">
  <img src="../img/bars.svg" class="barsvg">
  </div>
  <nav>
      <ul style="display: flex; align-items: center; padding-top: 10px; padding-right: 50px">
          <li><a href="../cursos/cursos.html">Cursos</a></li>
          <li><a href="../paneldecontrol/paneldecontrol.html">Entrenadores</a></li>
          <li class="loggedIn"><a href="../index/registerpage.html">Registrarse</a></li>
          <li class="loggedIn"><a href="../index/loginpage.html">Iniciar Sesion</a></li>
          <li class="loggedOut"><a href="../Perfil/perfil.html?email=${email}&tipo=${tipo}">Mi perfil</a></li>
          <li class="loggedOut">
            <form action="../../back/src/logOut.php">
              <button type="submit" class="btn btn-light">Cerrar sesión</button>
            </form>
          </li>
      </ul>
  </nav>`;

  function displayChange() {
    let bttn = document.querySelector("header nav");
    if (bttn.style.display === "none") {
      bttn.style.display = "block";
    } else {
      bttn.style.display = "none";
    }
  }
}

//header
window.addEventListener("load", function () {
  // Recoge los datos de la sesión
  datosSesion()
})

//Boton de menu en movil
// function displayChange() {
//   let bttn = document.querySelector("header nav");
//   if (bttn.style.display === "none") {
//     bttn.style.display = "block";
//   } else {
//     bttn.style.display = "none";
//   }
// }

//acordeon preguntas frecuentes
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}