let table = document.getElementById('client-table')
let info = []

fetch('./getClients.php')
    .then(response => response.json())
    .then((data) => {
        info = JSON.parse(JSON.stringify(data));
        console.log(data);
        tablaClientes()

    })
    .catch(error => {
        console.log(error);
    });


function tablaClientes() {
    let cad = `<table>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>email</td>
                        <td>passwd</td>
                    </tr>`
    info.forEach(client => {
        cad += `<tr>
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.email}</td>
                    <td>${client.password}</td>
                    <td>
                        <button>Eliminar</button>
                        <button>Editar</button>
                </tr>`
    });
    cad += `</table>`
    console.log(cad);
    table.innerHTML = cad
}