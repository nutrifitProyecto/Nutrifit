let table = document.getElementById('client-table')
let info = []

fetch('./getClients.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        console.log(data);
        //Llama a la función y crea una tabla con los clientes
        tablaClientes()

    })
    .catch(error => {
        console.log(error);
    });


function tablaClientes() {
    let cad = `<table>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>passwd</th>
                        <th>tipo</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(client => {
        cad += `<tr>
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.email}</td>
                    <td>${client.password}</td>
                    <td>${client.tipo}</td>
                    <td>
                        <button onclick="eliminarCliente()">Eliminar</button>
                        <button>Editar</button>
                </tr>`
    });
    cad += `</table>
            <button onclick="crearCliente()" data-bs-toggle="modal" data-bs-target="#crearClienteModal">Crear cliente</button>`
    table.innerHTML = cad
}

function crearCliente() {
    
}

function eliminarCliente() {
    console.log("hola");
}