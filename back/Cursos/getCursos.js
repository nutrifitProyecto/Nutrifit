let table = document.getElementById('curso-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getCursos.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los clientes
        tablaCursos()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los clientes
function tablaCursos() {
    let cad = `<table class="table table-striped w-100">
                    <tr>
                        <th>id</th>
                        <th>Entrenador</th>
                        <th>Coste mes</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(curso => {
        cad += `<tr id="column${curso.id}">
                    <td>${curso.id}</td>
                    <td>${curso.idEntrenador}</td>
                    <td>${curso.costeMes}</td>
                    <td>
                        <button onclick="eliminarCurso(${curso.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarCursoModal" class="btn btn-success" onclick="llenarCampos(${curso.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

// Función asignada al click del botón crear curso
function llenarSelectEntrenadores() {
    // Consulta de los entrenadores para llenar la select
    fetch('../Entrenadores/php/getEntrenador.php')
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            // Llama a la función y crea una tabla con los entrenadores
            let cad = `<option value="0">--- Selecciona un entrenador</option>`
            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`

            });
            document.getElementById('cursoEnt').innerHTML = cad
        })
        .catch(error => {
            console.log(error);
        });
}

//Elimina un cliente con respecto al id de este
function eliminarCliente(sendId) {
    confirm("Seguro que quieres eliminar al usuario?")
    if (confirm) {
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