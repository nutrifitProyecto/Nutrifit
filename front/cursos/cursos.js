let divEntrenamientos=document.getElementById("showAllEntrenamientos");
let divDietas=document.getElementById("showAllDietas");

let infoEntrenamientos = [];

fetch('../../back/Entrenamientos/php/getEntrenamientosbyEnt.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        infoEntrenamientos = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los ejercicios
        insertEntrenamientos();
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los ejercicios
function insertEntrenamientos() {
    let cad = `<div class="faqs"> <h2>Entrenamientos</h2>`;
    infoEntrenamientos.forEach(ent => {
        cad+=`
        <button class="accordion">${ent.Entrenamiento} / ${ent.Entrenador}</button>
        <div class="panel">
            <p>${ent.Descripcion}</p>
        </div>`;
    });
    cad+=`</div>`;
    divEntrenamientos.innerHTML += cad;
}


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

//Crear la tabla con todos los ejercicios
function insertDietas() {
    let cad = `<div class="faqs"> <h2>Dietas</h2>`;
    infoDietas.forEach(ent => {
        cad+=`
        <button class="accordion">${ent.Dieta} / ${ent.Entrenador}</button>
        <div class="panel">
            <p>${ent.Descripcion}</p>
        </div>`;
    });
    divDietas.innerHTML += cad;
}
