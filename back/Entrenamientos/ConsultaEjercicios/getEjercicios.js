let paramURL = new URLSearchParams(window.location.search)
let idEnt = paramURL.get('id')
let cad = ``  

let ejercicios = document.getElementById('ejercicios')

//Datos del entrenamiento actual
fetch(`./php/getEntrenamiento.php?id=${idEnt}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));

        document.getElementById('entName').innerHTML += info[0].nombre
        document.getElementById('entDesc').innerHTML += info[0].description
        //Llama a la función y crea una tabla con los ejercicios
    })
    .catch(error => {
        console.log(error);
    });

/*
fetch(`./php/getEjercicios.php?id=${idEnt}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        info.forEach(ej => {
            cad += `<p>${ej.dia}</p>
            <p>${ej.description}</p>
            <p>${ej.duracion}</p>
            <hr>`
        });
        //Llama a la función y crea una tabla con los ejercicios
    })
    .catch(error => {
        console.log(error);
    });
*/

//Ejercicios del entrenamiento
fetch(`./php/getEntrenamientoEjercicio.php?id=${idEnt}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        info.forEach(ej => {
            cad += `<p>${ej.dia}</p>
            <p>${ej.description}</p>
            <p>${ej.duracion}</p>
            <hr>`
        });
        ejercicios.innerHTML = cad
        //Llama a la función y crea una tabla con los ejercicios
    })
    .catch(error => {
        console.log(error);
    });