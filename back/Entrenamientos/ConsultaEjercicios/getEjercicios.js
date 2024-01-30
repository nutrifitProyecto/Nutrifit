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
fetch(`./php/getEntrenamientoEjercicio.php?idEnt=${idEnt}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));

        cad += `<table class="table table-striped">
                    <tr>
                        <th>Día</th>
                        <th>Descripción</th>
                        <th>Duración</th>
                        <th>Eliminar</th>
                    </tr>`

        info.forEach(ej => {
            cad += `<tr id="column${ej.ejId}">
                        <td>${ej.ejDia}</td>
                        <td>${ej.ejDesc}</td>
                        <td>${ej.ejDur}</td>
                        <td><button onclick="eliminarEj(${ej.ejId})">Eliminar</button></td>
            <tr>`
        });
        cad += `</table>
                <button onclick="añadirEjercicio()">Añadir ejercicio</button>`
        ejercicios.innerHTML = cad
    })
    .catch(error => {
        console.log(error);
    });


function eliminarEj(id) {
    console.log(id);
}

function añadirEjercicio() {
    console.log('caca');
}