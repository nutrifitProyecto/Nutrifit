let divarriba = document.getElementById("infoEntrenador"); //arriba
let divabajo = document.getElementById("infoEntrenadorAbajo"); //abajo
let info = []; //info entrenadores
//let infoCursos = []; //info Cursos

fetch('../../back/Entrenadores/php/getEntrenador.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea el texto html de arriba
        anyadirTexto();
    })
    .catch(error => {
        console.log(error);
    });

function anyadirTexto() {
    let cad = ``;
    if (info.length > 3) {
        for (let i = 0; i < 3; i++) {
            cad += `
            <div class="cajac">
            <div class="informacioncajac">
                <img src="" alt="img"> 
                <p class="nombrec">${ent.name + " " + ent.surname}</p>
                <p class="opinionc">${ent.description}</p>
                <button  onclick="fun(${ent.id})" style="cursor:pointer">Leer mas</button>
            </div>
            </div>`;
        }
    } else {
        info.forEach(ent => {
            cad += `
        <div class="cajac">
            <div class="informacioncajac">
                <!-- <img src="" alt="img"> -->
                <h3 class="nombrec">${ent.name + " " + ent.surname}</h3>
                <p class="opinionc">${ent.description}</p>
                <button class="bttnCajac" onclick="fun(${ent.id})" style="cursor:pointer">Leer mas</button>
            </div>
        </div>`;


        });
    }
    divarriba.innerHTML = cad;
}

function fun(id) {
    window.location = `../entrenadorvista/perdidadepeso.html?ident=${id}`;
}