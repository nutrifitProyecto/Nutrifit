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
  <a href="../index/index.html">
    <div id="logo-title" style="display: flex">
      <img src="../img/logo1.png" alt="logo" class="img-logo">
      <span id="title">NUTRI<span>FIT</span></span>
    </div>
  </a>
  <nav>
      <ul style="display: flex; align-items: center; padding-top: 10px">
          <li><a href="./index.html">Servicios</a></li>
          <li><a href="./index.html">About</a></li>
          <li class="loggedIn"><a href="../index/registerpage.html">Registrarse</a></li>
          <li class="loggedIn"><a href="../index/loginpage.html">Iniciar Sesion</a></li>
          <li class="loggedOut"><a href="../Perfil/perfil.html?email=${email}&tipo=${tipo}">Mi perfil</a></li>
          <li class="loggedOut">
            <form action="../../back/src/logOut.php">
              <button type="submit" class="btn btn-light">Cerar sesión</button>
            </form>
          </li>
      </ul>
  </nav>`;
}

//header
window.addEventListener("load", function () {
  // Recoge los datos de la sesión
  datosSesion()
})

//Boton de menu en movil
function displayChange() {
  let bttn = document.querySelector("header nav");
  if (bttn.style.display === "none") {
    bttn.style.display = "block";
  } else {
    bttn.style.display = "none";
  }
}

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

/** */
/*Boton de "soy entrenador" en el registerpage cuando se pulse se
actualizara el formulario añadiendo unos inputs de experiencia y quittando otros*/
function registerCoach() {
  let div = document.getElementsByClassName("campoderegistro")[0];
  while (div.hasChildNodes()) {
    div.firstChild.remove();
  }
  let form = document.getElementsByTagName("form")[0];
  // let newinputs=
  // `<label for="rg-descripcion">Descripcion</label><textarea name="descripcion" id="rg-descripcion"></textarea>
  // <label for="rg-foto">Foto de Perfil</label><input type="file" id="rg-foto" name="foto" accept=".png, .jpg, .jpeg">
  // <label for="rg-ncurso">Nombre del Curso</label><input type="text" id="rg-ncurso" name="ncurso">
  // <label for="rg-descurso">Descripcion del Curso</label><textarea name="descurso" id="rg-descurso"></textarea>
  // <label>Etiquetas</label>
  // <div class="checkboxing">
  // <input type="checkbox" id="" name=""><label for="">ENTRENAMIENTO PERSONALIZADO</label>
  // <input type="checkbox" id="" name=""><label for="">MANTENIMIENTO INTEGRAL</label>
  // <input type="checkbox" id="" name=""><label for="">ASESORAMIENTO ALIMENTICIO</label>
  // <input type="checkbox" id="" name=""><label for="">SEGUIMIENTO CONTINUO Y AJUSTES</label>
  // <input type="checkbox" id="" name=""><label for="">PERDIDA DE PESO</label>
  // <input type="checkbox" id="" name=""><label for="">AUMENTO DE VOLUMEN</label>
  //¡ </div>`;

  form.getElementsByTagName("p")[0].textContent = "";

  // div.innerHTML=newinputs;

}