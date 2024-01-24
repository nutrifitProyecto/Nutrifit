let table = document.getElementById('client-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./getClients.php')
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


function tablaClientes() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>passwd</th>
                        <th>tipo</th>
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
                    <td>
                        <button onclick="eliminarCliente()" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarClienteModal" class="btn btn-success" onclick="llenarCampos(${client.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>
            <button data-bs-toggle="modal" data-bs-target="#crearClienteModal" class="btn btn-primary">Crear cliente</button>`
    table.innerHTML = cad
}

function eliminarCliente() {
    console.log("hola");
}

function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    editInputs[3].childNodes[1].value = document.getElementById('column' + id).childNodes[11].innerHTML
}

function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}