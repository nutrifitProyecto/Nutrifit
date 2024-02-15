let divEntrenamientos = document.getElementById("showAllEntrenamientos");
let divDietas = document.getElementById("showAllDietas");

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
    let cad = `<div class="faqs" style="margin-left: 20%; margin-right: 20%;"> 
                    <h2>Dietas</h2>`;
    infoDietas.forEach(ent => {
        cad += `
        <div>
            <button class="accordion">${ent.Dieta} / ${ent.Entrenador} ${ent.apellido}</button>
            <p style="color: lightgray;">${ent.Descripcion}</p>
        </div>`;
    });
    cad += `</div>`
    divDietas.innerHTML += cad;
}

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
    let cad = `<div class="faqs" style="margin-left: 20%; margin-right: 20%;"> 
                    <h2>Entrenamientos</h2>`;
    infoEntrenamientos.forEach(ent => {
        cad += `
        <button class="accordion" onclick="showExcercise(${ent.IdEnt})">${ent.Entrenamiento} / ${ent.Entrenador} ${ent.apellido}</button>
        <div class="">
            <p style="color: lightgray;">${ent.Descripcion}</p>
            <div id="ejerCursos${ent.IdEnt}"></div>
        </div>`;
    });
    cad += `</div>`;
    divEntrenamientos.innerHTML += cad;
}

//Ejercicios
let infoEjercicios = [];
let displayEjercicios = false;

function showExcercise(idEntre) {
    let divEjercicios = document.getElementById(`ejerCursos${idEntre}`)

    if (displayEjercicios) {
        divEjercicios.innerHTML = "";
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
