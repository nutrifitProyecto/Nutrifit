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
                        <th>name</th>
                        <th>email</th>
                        <th>passwd</th>
                        <th>tipo</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(client => {
        cad += `<tr id="${client.id}">
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.email}</td>
                    <td>${client.password}</td>
                    <td>${client.tipo}</td>
                    <td>
                        <button onclick="eliminarCliente()" class="btn btn-danger">Eliminar</button>
                        <button data-bs-target="#editarClienteModal" class="btn btn-success">Editar</button>
                </tr>`
    });
    cad += `</table>
            <button data-bs-toggle="modal" data-bs-target="#crearClienteModal" class="btn btn-primary">Crear cliente</button>`
    table.innerHTML = cad
}

function eliminarCliente() {
    console.log("hola");
}

function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}