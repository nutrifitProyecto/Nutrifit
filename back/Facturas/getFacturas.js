let table = document.getElementById('factura-table')
let info = []
let inputs = document.querySelectorAll('input')
let crearFact = document.getElementById('crearFact')
let factMeses = document.getElementById('factMeses')
let selectFactCurs = document.getElementById('factCurs')
let selectCosteTotal = document.getElementById('factCosteTotal')

let coste = 0

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
                    </td>
                </tr>`
    });
    cad += `</table>`
    table.innerHTML = cad
}

//Elimina un cliente con respecto al id de este
function eliminarFactura(sendId) {
    $.ajax({
        type: "POST", //POST para enviar los datos al php
        url: "./php/eliminarFactura.php",
        data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
        success: window.location = "./facturasList.html"
    });
}

// Rellena las selects con los nombres de los clientes y entrenadores
function llenarSelects(cliId, entId, route) {
    let selectedCurs = ""
    factMeses.value = 1

    // Select de los entrenadores para llenar la select
    fetch('./php/getClientes.php')
        .then(response => response.json())
        .then((data) => {
            //Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            //Llama a la función y crea una tabla con los entrenadores
            let cad = ``
            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                if (element.id == entId) {
                    cad += `<option value="${element.id}" selected>${element.name} ${element.surname} </option>`
                } else {
                    cad += `<option value="${element.id}">${element.name} ${element.surname} </option>`
                }
            });
            document.getElementById('factCli').innerHTML = cad
        })
        .catch(error => {
            console.log(error);
        });

    // Select de los clientes para llenar la select del html
    fetch('./php/getCursos.php')
        .then(response => response.json())
        .then((data) => {
            //Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            console.log(info);

            //Llama a la función y crea una tabla con los entrenadores
            let cad = `<option value="0">---- Selecciona un curso</option>`
            info.forEach(element => {
                // Dependiendo de la valoración que queramos editar la select nos mostrará un cliente u otro
                if (element.entrenamientoNombre == null) {
                    cad += `<option value="${element.id}">${element.dietaNombre}</option>`
                } else {
                    cad += `<option value="${element.id}">${element.entrenamientoNombre}</option>`
                }
            });
            selectFactCurs.innerHTML = cad

            // Evento cuando se cambia la select
            selectFactCurs.addEventListener('change', () => {
                let selected = selectFactCurs.value

                // Busca la variable selected en el array de info que tiene los dasos de los cursos
                // De esta forma cambia el valor de un campo sin tener que consultar de nuevo a la base de datos
                selectedCurs = info.find(ej => ej.id === selected)

                selectCosteTotal.value = selectedCurs.costeMes * factMeses.value

                // Guarda el coste para multiplicarlo por los meses
                coste = selectedCurs.costeMes
            })
        })
        .catch(error => {
            console.log(error);
        });
}

// Al escribir los meses se calcula automáticamente lo que deberá pagar el cliente
factMeses.addEventListener('keyup' && 'blur', () => {
    selectCosteTotal.value = coste * factMeses.value
    selectCosteTotal.innerHTML = coste * factMeses.value
    document.getElementById('ano').value = coste * factMeses.value
    console.log(selectCosteTotal.value);
})

crearFact.addEventListener('click', () => {
    llenarSelects()
})

//Limpia los campos de la ventana modal
function limpiarCampos() {
    inputs.forEach(element => {
        element.value = ""
    });
}