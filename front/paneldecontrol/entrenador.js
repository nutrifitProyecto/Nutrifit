let div = document.getElementById("infoEntrenador"); //arriba
let divabajo=document.getElementById("infoEntrenadorAbajo"); //abajo
let info = []

fetch('../../back/Entrenadores/php/getEntrenador.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los entrenadores
        anyadirTexto();
    })
    .catch(error => {
        console.log(error);
    });

function anyadirTexto() {
    let cad = ``;
    let cadAbajo=``;
    info.forEach(ent => {
        cad += `
        <div class="cajac">
            <div class="informacioncajac">
                <img src="" alt="img"> 
                <p class="nombrec">${ent.name + " " + ent.surname}</p>
                <p class="opinionc">${ent.description}</p>
                <button  onclick="fun(${ent.id})" style="cursor:pointer">Leer mas</button>
            </div>
        </div>`;

        cadAbajo+=`
        <div class="cajac">
            <div class="informacioncajac">
                <p class="precio">$30p/mes</p>
                <ul>
                    <li><img src="../img/tik.png" alt="" id="tick-icon">Entrenamiento personalizado</li>
                    <li><img src="../img/tik.png" alt="" id="tick-icon">Mantenimiento integral</li>
                    <li><img src="../img/tik.png" alt="" id="tick-icon">Asesoramiento alimenticio</li>
                    <li><img src="../img/tik.png" alt="" id="tick-icon">Seguimiento Continuo y Ajustes</li>
                </ul>
                <button type="button">EMPEZAR</button>
            </div>
        </div>`;
    });
    div.innerHTML = cad;
    divabajo.innerHTML=cadAbajo;
}

function fun(id){
    window.location=`../entrenadorvista/perdidadepeso.html?ident=${id}`;
}