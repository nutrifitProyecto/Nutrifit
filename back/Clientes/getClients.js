let table = document.getElementById('client-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getClients.php')
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
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Passwd</th>
                        <th>Tipo</th>
                        <th>Fecha nacimiento</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(client => {
        cad += `<tr id="column${client.id}">
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.surname}</td>
                    <td>${client.email}</td>
                    <td>${client.password}</td>
                    <td>${client.tipo}</td>
                    <td>${client.fecha_nacimiento}</td>
                    <td>
                        <button onclick="eliminarCliente(${client.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarClienteModal" class="btn btn-success" onclick="llenarCampos(${client.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>
            <button data-bs-toggle="modal" data-bs-target="#crearClienteModal" class="btn btn-primary">Crear cliente</button>`
    table.innerHTML = cad
}

//Elimina un cliente con respecto al id de este
function eliminarCliente(sendId) {
    $.ajax({
        type: "POST", //POST para enviar los datos al php
        url: "./php/eliminarCliente.php",
        data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
        success: window.location = "./clientList.html"
    });
}

function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    //Asigno valores con respecto a los campos de la tabla
    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    editInputs[3].childNodes[1].value = document.getElementById('column' + id).childNodes[11].innerHTML
    editInputs[4].childNodes[4].value = document.getElementById('column' + id).childNodes[13].innerHTML
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}