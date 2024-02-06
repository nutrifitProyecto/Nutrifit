let table = document.getElementById('factura-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getFacturas.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los clientes
        tablaClientes()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los clientes
function tablaClientes() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Cliente</th>
                        <th>Curso</th>
                        <th>Descripción</th>
                        <th>Coste total</th>
                        <th>Meses suscrito</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(fact => {
        cad += `<tr id="column${fact.id}">
                    <td>${fact.id}</td>
                    <td>${fact.cliName} ${fact.cliSurname}</td>`
                    // La select devuelve nombre de dieta y entrenamiento
                    // Si uno está vacío, en pantalla aparecerá el otro
                    if (fact.entrenamientoNombre == null) {
                        cad += `<td>${fact.dietaNombre}</td>`
                    } else {
                        cad += `<td>${fact.entrenamientoNombre}</td>`
                    }
                    cad += `<td>${fact.description}</td>
                    <td>${fact.costeTotal}</td>
                    <td>${fact.mesesSuscripcion}</td>
                    <td>
                        <button onclick="eliminarFactura(${fact.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarFacturaModal" class="btn btn-success" onclick="llenarCampos(${fact.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

//Elimina un cliente con respecto al id de este
function eliminarCliente(sendId) {
    confirm("Seguro que quieres eliminar al usuario?")
    if (confirm == true) {
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarCliente.php",
            data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
            success: window.location = "./clientList.html"
        });
    }
}

function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    //Asigno valores con respecto a los campos de la tabla
    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    editInputs[3].childNodes[1].value = document.getElementById('column' + id).childNodes[11].innerHTML
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}