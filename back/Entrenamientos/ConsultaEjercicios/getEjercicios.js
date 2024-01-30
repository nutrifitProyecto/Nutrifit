let paramURL = new URLSearchParams(window.location.search)
let idEnt = paramURL.get('id')
let cad = ``
let aaa = []

let ejercicios = document.getElementById('ejercicios')
let select_ejercicios = document.getElementById('select_ejercicios')

document.getElementById('insertEjEntId').value = idEnt

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

        // Recorre el array de ejercicios
        info.forEach(ej => {
            cad += `<tr id="column${ej.ejId}">
                        <td>${ej.ejDia}</td>
                        <td>${ej.ejDesc}</td>
                        <td>${ej.ejDur}</td>
                        <td><button onclick="eliminarEj(${ej.ejId}, ${idEnt})">Eliminar</button></td>
            <tr>`
        });
        cad += `</table>`
        ejercicios.innerHTML = cad
    })
    .catch(error => {
        console.log(error);
    });


function eliminarEj(idEjSend, idEntSend) {
    confirm("Seguro que quieres eliminar el ejercicio del entrenamiento?")
    if (confirm) {
        console.log(idEjSend);
        console.log(idEntSend);
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarEjercicio.php",
            data: {
                idEj: idEjSend,
                idEnt: idEntSend
            }, // Enviar las variables como parte de los datos
            success: window.location = `./consultaEjercicios.html?id=${idEnt}`
        });
    }
}

//Rellena la select con los ejercicios para añadirlos a los entrenamientos
function llenarSelect() {
    let cadEjercicios = ``
    let selectedEj = ""

    fetch(`./php/getEjercicios.php`)
        .then(response => response.json())
        .then((data) => {
            //Parsea la respuesta a JSON
            infoEjercicios = JSON.parse(JSON.stringify(data))

            //Se crean las opciones de la select con los ejercicios
            infoEjercicios.forEach(ej => {
                cadEjercicios += `<option value="${ej.id}">${ej.description}</option>`
            })

            select_ejercicios.innerHTML += cadEjercicios

            //Se le añade un evento a la select, cuando cambie de valor se mostrarán los datos más detallados del ejercicio
            select_ejercicios.addEventListener('change', () => {
                let selectedId = select_ejercicios.value

                //En el array
                selectedEj = infoEjercicios.find(ej => ej.id === selectedId)

                document.getElementById('ejDia').value = selectedEj.dia
                document.getElementById('ejDur').value = selectedEj.duracion
            })
        })
        .catch(error => {
            console.log(error);
        });
}