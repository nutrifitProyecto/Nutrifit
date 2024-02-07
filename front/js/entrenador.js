let div=document.getElementById("infoEntrenador");
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
 
//Crear la tabla con todos los entrenadores
function anyadirTexto() {
    let cad = ``;
    info.forEach(ent => {
        cad += `
        <div class="cajac">
                <div class="informacioncajac">
                    <img src="${ent.imgentrenador}" alt="img" srcset="">
                    <p class="nombrec">${ent.name + " " + ent.surname}</p>
                    <p class="opinionc">${ent.description}</p>
                    <form action="./perdidadepeso.html">
                        <button style="cursor:pointer">Leer mas</button>
                    </form>
                </div>
            </div>`; //añadir que redireccione a perdidadepeso.html con el id de cada entrenador
    });
        div.innerHTML = cad
}