let table = document.getElementById('dieta-table')
let info = []
let inputs = document.querySelectorAll('input')

limpiarCampos()

fetch('./php/getDieta.php')
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        //Llama a la función y crea una tabla con las dietas
        tablaDietas()
    })
    .catch(error => {
        console.log(error);
    });

//Crear la tabla con todos las dietas
function tablaDietas() {
    let cad = `<table class="table table-striped">
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Valor calórico</th>
                        <th>Comidas al día</th>
                        <th>Opciones</th>
                    </tr>`
    info.forEach(diet => {
        cad += `<tr id="column${diet.id}">
                    <td>${diet.id}</td>
                    <td>${diet.nombre}</td>
                    <td>${diet.description}</td>
                    <td>${diet.tipo}</td>
                    <td>${diet.valor_calorico}</td>
                    <td>${diet.comidas_dia}</td>
                    <td>
                        <button onclick="eliminarDieta(${diet.id})" class="btn btn-danger">Eliminar</button>
                        <button id="btnEditar" data-bs-toggle="modal" data-bs-target="#editarDietaModal" class="btn btn-success" onclick="llenarCampos(${diet.id})">Editar</button>
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

//Elimina una dieta con respecto al id de este
function eliminarDieta(sendId) {
    confirm("Seguro que quieres eliminar la dieta?")
    if (confirm) {
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarDieta.php",
            data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
            success: window.location = "./dietaList.html"
        });
    }
}

// Función asignada al click del botón crear curso
function llenarSelectEntrenadores() {
    let cad = `<option value="0">--- Selecciona un entrenador</option>`
    // Consulta de los entrenadores para llenar la select
    fetch('../Entrenadores/php/getEntrenador.php')
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            // Llama a la función y crea una tabla con los entrenadores

            info.forEach(element => {
                // Se rellena la select con los entrenadores
                cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`
            });
            document.getElementById('cursoEnt').innerHTML = cad
        })
        .catch(error => {
            console.log(error);
        });
}

//Rellena los campos de la ventana modal
function llenarCampos(id) {
    let editInputs = document.getElementsByName('showValues')

    //Asigno valores con respecto a los campos de la tabla
    // Inputs del modal                     contenido del documento
    //Id
    editInputs[0].childNodes[1].value = document.getElementById('column' + id).childNodes[1].innerHTML
    //Nombre
    editInputs[1].childNodes[4].value = document.getElementById('column' + id).childNodes[3].innerHTML
    //Desc
    editInputs[3].childNodes[4].value = document.getElementById('column' + id).childNodes[5].innerHTML
    //Tipo
    editInputs[2].childNodes[4].value = document.getElementById('column' + id).childNodes[7].innerHTML
    //Valor
    editInputs[4].childNodes[4].value = document.getElementById('column' + id).childNodes[9].innerHTML
    //Comidas
    editInputs[5].childNodes[4].value = document.getElementById('column' + id).childNodes[11].innerHTML
}

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}