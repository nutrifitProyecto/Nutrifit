let table = document.getElementById('client-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getEjercicio.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los ejercicios
        tablaEjercicios()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los ejercicios
function tablaEjercicios() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Día</th>
                        <th>Dercripción</th>
                        <th>Duración</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(ej => {
        cad += `<tr id="column${ej.id}">
                    <td>${ej.id}</td>
                    <td>${ej.dia}</td>
                    <td>${ej.description}</td>
                    <td>${ej.duracion}</td>
                    <td>
                        <button onclick="eliminarEjercicio(${ej.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarEjercicioModal" class="btn btn-success" onclick="llenarCampos(${ej.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>
            <button data-bs-toggle="modal" data-bs-target="#crearEjercicoModal" class="btn btn-primary">Crear ejercicio</button>`
    table.innerHTML = cad
}

//Elimina un cliente con respecto al id de este
function eliminarEjercicio(sendId) {
    confirm("Seguro que quieres eliminar el ejercicio?")
    if (confirm) {
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarEjercicio.php",
            data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
            success: window.location = "./ejercicioList.html"
        });
    }
}

function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    //Asigno valores con respecto a los campos de la tabla
    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    editInputs[3].childNodes[4].value = document.getElementById('column' + id).childNodes[7].innerHTML
    
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}