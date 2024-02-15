let divEntrenamientos = document.getElementById("showAllEntrenamientos");
let divDietas = document.getElementById("showAllDietas");

let infoEntrenamientos = [];

fetch('../../back/Entrenamientos/php/getEntrenamientosbyEnt.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        infoEntrenamientos = JSON.parse(JSON.stringify(data));
        insertEntrenamientos();
    })
    .catch(error => {
        console.log(error);
    });

function insertEntrenamientos() {
    let cad = `<div class="faqs"> <h2>Entrenamientos</h2>`;
    infoEntrenamientos.forEach(ent => {
        cad += `
        <button class="accordion itemsCursos" onclick="showExcercise(${ent.IdEnt})">${ent.Entrenamiento} / ${ent.Entrenador}</button>
        <div>
            <div>
                <p>${ent.Descripcion}</p>
            </div>
            <div id="ejerCursos${ent.IdEnt}"></div>
        </div>`;
    });
    cad += `</div>`;
    divEntrenamientos.innerHTML += cad;
}

//Dietas
let infoDietas = [];

fetch('../../back/Dietas/php/getDietasbyEnt.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        infoDietas = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los ejercicios
        insertDietas();
    })
    .catch(error => {
        console.log(error);
    });

function insertDietas() {
    let cad = `<div class="faqs"> <h2>Dietas</h2>`;
    infoDietas.forEach(ent => {
        cad += `
        <button class="accordion itemsCursos">${ent.Dieta} / ${ent.Entrenador}</button>
        <div>
            <p>${ent.Descripcion}</p>
        </div>`;
    });
    divDietas.innerHTML += cad;
}

//Ejercicios
let infoEjercicios = [];
let displayEjercicios = false;

function showExcercise(idEntre) {
    let divEjercicios = document.getElementById(`ejerCursos${idEntre}`)

    if (displayEjercicios) {
        divEjercicios.innerHTML="";
        displayEjercicios = false;
    } else {
        displayEjercicios = true;

        fetch(`../../back/Ejercicios/php/getEjercicobyEnt.php?id=${idEntre}`)
            .then(response => response.json())
            .then((data) => {
                //Parsea la respuesta a JSON
                infoEjercicios = JSON.parse(JSON.stringify(data));
                //Llama a la función y crea una tabla con los ejercicios
                showEjercicios();
            })
            .catch(error => {
                console.log(error);
            });
    }
    function showEjercicios() {
        let cadena = "<h4>Ejercicios</h4> <div id='ejerciciosCursos'>";
        infoEjercicios.forEach(ejer => {
            cadena += `
            <div class="cajac">
                <div class="informacioncajac">
                    <p class="nombrec">Descripcion del ejercicio: ${ejer.description}</p>
                    <p class="opinionc">Dia: ${ejer.dia}</p>
                    <p class="opinionc">Duracion: ${ejer.duracion}</p>
                </div>
            </div>`;
        });
        cadena +="</div>";
        divEjercicios.innerHTML = cadena;
    }
}




/*
cad += `
        <div class="cajac">
            <div class="informacioncajac">
                <img src="" alt="img"> 
                <p class="nombrec">${ent.name + " " + ent.surname}</p>
                <p class="opinionc">${ent.description}</p>
                <button onclick="fun(${ent.id})" style="cursor:pointer">Leer mas</button>
            </div>
        </div>`;


        alli iria los ejercicios en cajas 

*/

