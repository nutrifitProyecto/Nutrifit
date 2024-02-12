let table = document.getElementById('valoracion-table')
let info = []
let inputs = document.querySelectorAll('input')

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
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarEntrenadorModal" class="btn btn-success" onclick="llenarSelectEntrenadores(${rate.idCliente}, ${rate.idEntrenador}, 'Edit'), llenarCampos(${rate.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

//Elimina una valoración con respecto al id de este
function eliminarEntrenador(sendId) {
    $.ajax({
        type: "POST", //POST para enviar los datos al php
        url: "./php/eliminarValoracion.php",
        data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
        success: window.location = "./valoracionList.html"
    });
}

// Rellena las selects con los nombres de los clientes y entrenadores
function llenarSelectEntrenadores(cliId, entId, route) {
    // Select de los entrenadores para llenar la select
    fetch('../Entrenadores/php/getEntrenador.php')
        .then(response => response.json())
        .then((data) => {
            //Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            //Llama a la función y crea una tabla con los entrenadores
            let cad = ``
            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                if (element.id == entId) {
                    cad += `<option value="${element.id}" selected>${element.name} ${element.surname} </option>`
                } else {
                    cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`
                }
            });
            document.getElementById('rate' + route + 'Ent').innerHTML = cad
        })
        .catch(error => {
            console.log(error);
        });

    // Select de los clientes para llenar la select del html
    fetch('./php/getClients.php')
        .then(response => response.json())
        .then((data) => {
            //Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            //Llama a la función y crea una tabla con los entrenadores
            let cad = ``
            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                if (element.id == cliId) {
                    cad += `<option value="${element.id}" selected>${element.name} ${element.surname} </option>`
                } else {
                    cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`
                }
            });
            document.getElementById('rate' + route + 'Client').innerHTML = cad
        })
        .catch(error => {
            console.log(error);
        });
}

//Rellena los campos de la ventana modal
function llenarCampos(id) {
    let editRate = document.getElementById('rateEditRate')
    let editId = document.getElementById('rateEditId')

    //Asigno la valoración con respecto a los campos de la tabla
    editId.value = document.getElementById('column' + id).childNodes[1].innerHTML
    editRate.value = document.getElementById('column' + id).childNodes[7].innerHTML
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}