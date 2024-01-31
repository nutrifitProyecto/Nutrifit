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
                        <th>Tipo</th>
                        <th>Opciones</th>
                    </tr>`
    info.forEach(curso => {
        cad += `<tr id="column${curso.id}">
                    <td>${curso.id}</td>
                    <td>${curso.entName} ${curso.entSurname}</td>
                    <td>${curso.costeMes}</td>
                    <td>`
                    if (curso.tipo == 1) {
                        cad += `Entrenamiento`
                    } else {
                        cad += `Dieta`
                    }
                    cad += `</td>
                    <td>
                        <button onclick="eliminarCurso(${curso.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarCursoModal" class="btn btn-success" onclick="llenarCampos(${curso.id}), llenarSelectEntrenadores(${curso.idEnt}, 'Edit')">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

// Función asignada al click del botón crear curso
function llenarSelectEntrenadores(idEnt, route) {
    let cad = ``
    // Consulta de los entrenadores para llenar la select
    fetch('../Entrenadores/php/getEntrenador.php')
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            // Llama a la función y crea una tabla con los entrenadores

            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                if (element.id == idEnt) {
                    cad += `<option value="${element.id}" selected>${element.name} ${element.surname} </option>`
                } else {
                    cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`
                }
            });
            console.log(route);
            console.log(document.getElementById('cursoEnt'));
            document.getElementById('curso' + route + 'Ent').innerHTML += cad
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

    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    console.log(document.getElementById('column' + id).childNodes[7].innerHTML);
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}