let table = document.getElementById('valoracion-table')
let info = []
let inputs = document.querySelectorAll('input')
let cliInfo = ""

limpiarCampos()

fetch('./php/getValoracion.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los entrenadores
        tablaValoraciones()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los entrenadores
function tablaValoraciones() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Cliente</th>
                        <th>Entrenador</th>
                        <th>Valoración</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(rate => {
        cad += `<tr id="column${rate.id}">
                    <td>${rate.id}</td>
                    <td>${rate.cliName} ${rate.cliSurname}</td>
                    <td>${rate.entName} ${rate.entSurname}</td>
                    <td>${rate.rate}</td>
                    <td>
                        <button onclick="eliminarEntrenador(${rate.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarEntrenadorModal" class="btn btn-success" onclick="llenarCampos(${rate.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>
                            <button data-bs-toggle="modal" data-bs-target="#crearEntrenadorModal" class="btn btn-primary">Crear entrenador</button>`
    table.innerHTML = cad
}

//Elimina un entrenador con respecto al id de este
function eliminarEntrenador(sendId) {
    confirm("Seguro que quieres eliminar al entrenador?")
    if (confirm) {
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarEntrenador.php",
            data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
            success: window.location = "./entrenadorList.html"
        });
    }
}

//Rellena los campos de la ventana modal
function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    //Asigno valores con respecto a los campos de la tabla
    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    editInputs[3].childNodes[4].value = document.getElementById('column' + id).childNodes[11].innerHTML
    console.log(editInputs[3].childNodes[4]);
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}