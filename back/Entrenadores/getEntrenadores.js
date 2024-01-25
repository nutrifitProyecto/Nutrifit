let table = document.getElementById('entrenador-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getEntrenador.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con los entrenadores
        tablaEntrenadores()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos los entrenadores
function tablaEntrenadores() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Descripción</th>
                        <th>opciones</th>
                    </tr>`
    info.forEach(ent => {
        cad += `<tr id="column${ent.id}">
                    <td>${ent.id}</td>
                    <td>${ent.name}</td>
                    <td>${ent.surname}</td>
                    <td>${ent.email}</td>
                    <td>${ent.password}</td>
                    <td>${ent.description}</td>
                    <td>
                        <button onclick="eliminarEntrenador(${ent.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarEntrenadorModal" class="btn btn-success" onclick="llenarCampos(${ent.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>
            <button data-bs-toggle="modal" data-bs-target="#crearEntrenadorModal" class="btn btn-primary">Crear entrenador</button>`
    table.innerHTML = cad
}

//Elimina un entrenador con respecto al id de este
function eliminarEntrenador(sendId) {
    confirm("Seguro que quieres eliminar al usuario?")
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