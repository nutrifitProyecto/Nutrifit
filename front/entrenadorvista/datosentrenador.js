let paramURL= new URLSearchParams(window.location.search);
let ident= paramURL.get("ident");
let info=[];

let divizq= document.getElementById("contentEntrenador");

fetch(`../../back/Entrenadores/php/getEntrenador.php?id=${ident}`)
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

function anyadirTexto(){
        let cad=`
        <h1>${info[0].name + " " + info[0].surname}</h1>
        <p>${info[0].description}</p>
        <button type="button">COMPRAR</button>`;
    console.log(divizq);
    divizq.innerHTML=cad;
}