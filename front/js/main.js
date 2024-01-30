//Boton de menu en movil
function displayChange(){
    let bttn=document.querySelector("header nav");    
    if(bttn.style.display==="none"){
        bttn.style.display="block";
    }else{
        bttn.style.display="none";
    }
}

/** */
//acordeon preguntas frecuentes
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
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
function registerCoach(){
  let div=document.getElementsByClassName("campoderegistro")[0];
  while(div.hasChildNodes()){
    div.firstChild.remove();    
  }
  let form=document.getElementsByTagName("form")[0];
  let newinputs=
  `<label for="rg-descripcion">Descripcion</label><textarea name="descripcion" id="rg-descripcion"></textarea>
  <label for="rg-foto">Foto de Perfil</label><input type="file" id="rg-foto" name="foto" accept=".png, .jpg, .jpeg">
  <label for="rg-ncurso">Nombre del Curso</label><input type="text" id="rg-ncurso" name="ncurso">
  <label for="rg-descurso">Descripcion del Curso</label><textarea name="descurso" id="rg-descurso"></textarea>
  <label>Etiquetas</label>
  <div class="checkboxing">
  <input type="checkbox" id="" name=""><label for="">ENTRENAMIENTO PERSONALIZADO</label>
  <input type="checkbox" id="" name=""><label for="">MANTENIMIENTO INTEGRAL</label>
  <input type="checkbox" id="" name=""><label for="">ASESORAMIENTO ALIMENTICIO</label>
  <input type="checkbox" id="" name=""><label for="">SEGUIMIENTO CONTINUO Y AJUSTES</label>
  <input type="checkbox" id="" name=""><label for="">PERDIDA DE PESO</label>
  <input type="checkbox" id="" name=""><label for="">AUMENTO DE VOLUMEN</label>
  </div>`;

  form.getElementsByTagName("p")[0].textContent="";

  div.innerHTML=newinputs;

}

/*
//SUBIR CV




     // Obtén referencia al input de tipo file y al input de texto
     const fileInput = document.getElementById('file-input');
     const fileNameInput = document.getElementById('file-name');

     // Agrega un listener al cambio de input
     fileInput.addEventListener('change', function() {
         // Muestra el nombre del archivo seleccionado en el input de texto
         fileNameInput.value = fileInput.files[0].name;
     });
*/