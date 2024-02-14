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

// fetch('../../back/Cursos/php/getCursos.php')
//     .then(response => response.json())
//     .then((data) => {
//         //Parsea la respuesta a JSON
//         infoCursos = JSON.parse(JSON.stringify(data));
//         //Llama a la función y crea el texto html de abajo
//         anyadirTextoAbajo();
//     })
//     .catch(error => {
//         console.log(error);
//     });

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
                <img src="" alt="img"> 
                <p class="nombrec">${ent.name + " " + ent.surname}</p>
                <p class="opinionc">${ent.description}</p>
                <button onclick="fun(${ent.id})" style="cursor:pointer">Leer mas</button>
            </div>
        </div>`;


        });
    }
    divarriba.innerHTML = cad;
}

// function anyadirTextoAbajo(){
//     let cadAbajo=``;

//     infoCursos.forEach(curs => {
//         cadAbajo+=`
//         <div class="cajac">
//             <div class="informacioncajac">
//             <p class="precio">${curs.costeMes} €/mes</p>
//             <ul>
//                 <li><img src="../img/tik.png" alt="" id="tick-icon">Entrenamiento personalizado</li>
//                 <li><img src="../img/tik.png" alt="" id="tick-icon">Mantenimiento integral</li>
//                 <li><img src="../img/tik.png" alt="" id="tick-icon">Asesoramiento alimenticio</li>
//                 <li><img src="../img/tik.png" alt="" id="tick-icon">Seguimiento Continuo y Ajustes</li>
//             </ul>
//             <button onclick="fun(${curs.idEntrenador})" style="cursor:pointer" type="button">EMPEZAR</button>
//             </div>
//         </div>`;

//     });
//     divabajo.innerHTML=cadAbajo;
// }

function fun(id) {
    window.location = `../entrenadorvista/perdidadepeso.html?ident=${id}`;
}