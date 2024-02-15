let paramURL= new URLSearchParams(window.location.search);
let ident= paramURL.get("ident");
let info=[];
let infoDietas=[]; 
let infoEntrenamientos=[];

let divizq= document.getElementById("contentEntrenador");

fetch(`../../back/Entrenadores/php/getEntrenadorById.php?id=${ident}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea un texto con los entrenadores
        anyadirTexto();
    })
    .catch(error => {
        console.log(error);
    });

function anyadirTexto(){
    let cad=`
        <h2>${info[0].name + " " + info[0].surname}</h2>
        <p>${info[0].description}</p>
        <button type="button">COMPRAR</button>`;
    divizq.innerHTML=cad;
    
}

let entCurEnt=document.getElementById("entrenadorCursosEntrenamiento");


fetch(`../../back/Cursos/php/getCursosByDietas.php?id=${ident}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        infoDietas = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los clientes
        anyadirDietas();
    })
    .catch(error => {
        console.log(error);
    });

function anyadirDietas(){
    let cad=``;
    infoDietas.forEach(diet => {
        cad+=`
        <div class="entrenamientos cajap">
            <h3>${diet.Dieta}</h3>
            <p>${diet.Descripcion_Dieta}
            </p>
            <button type="button">EMPEZAR</button>
        </div>`
    });
    entCurEnt.innerHTML+=cad;
}

fetch(`../../back/Cursos/php/getCursosByEnt.php?id=${ident}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        infoEntrenamientos = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los clientes
        anyadirEntrenamiento();
    })
    .catch(error => {
        console.log(error);
    });

function anyadirEntrenamiento(){
    let cad=``;
    infoEntrenamientos.forEach(ent => {
        cad+=`
        <div class="entrenamientos cajap">
            <h3>${ent.Entrenamiento}</h3>
            <p>${ent.Descripcion_Entrenamiento}
            </p>
            <button type="button">EMPEZAR</button>
        </div>`
    });
    entCurEnt.innerHTML+=cad;
}

//crear la funcion que redireccione los botonesd e los cursos a la pagina de cursos y muestre su informacion 