let paramURL = new URLSearchParams(window.location.search)
let email = paramURL.get('email')
let tipo = paramURL.get('tipo')

let idCliente
let info = []

let inputs = document.getElementsByClassName('form-control')
let btonEditarDatos = document.getElementById('btonEditarDatos')
let datosPago = document.getElementById('datosPago')

// Inputs de la ventana de pago
let inputsPago = document.getElementsByName('inputsDatosPago')

// Mostrar y ocultar conenedores
let mostrarDatosPago = document.getElementById('mostrarDatosPago')
let mostrar = mostrarDatosPago.getAttribute('mostrar')

function datosSesion() {
    if (tipo == 1) {
        datosCliente()
    } else if (tipo == 2) {
        datosEntrenador()
    }
}

window.addEventListener("load", function () {
    // Recoge los datos de la sesión
    datosSesion()
})

// Consulta a los datos del cliente y los introduce en los inputs
function datosCliente() {
    document.getElementById('tipo').value = tipo
    // Ocultar dats de cliente
    document.getElementById('datosCliente').classList.add('d-flex')
    document.getElementById('datosCliente').classList.remove('d-none')
    document.getElementById('descEnt').classList.add('d-none')
    document.getElementById('mostrarDatosPago').classList.add('d-flex')

    // Cambio action para editar clientes
    document.getElementById('formPerfil').action = "../../back/Clientes/php/editarPerfil.php"

    fetch(`../../back/Clientes/php/verCliente.php?email=${email}`)
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            idCliente = info[0].id

            inputs[0].value = info[0].name
            inputs[1].value = info[0].surname
            inputs[2].value = info[0].email
            inputs[3].value = info[0].fecha_nacimiento
            inputs[4].value = info[0].weight
            inputs[5].value = info[0].height
        })
        .catch(error => {
            console.log(error);
        });

    // Vista datos de pago y poder editarlos
    mostrarDatosPago.addEventListener('click', () => {
        console.log(idCliente);
        // Muestra datos de pago
        if (mostrarDatosPago.getAttribute(mostrar) == "true") {
            datosPago.style.display = 'none'
            mostrarDatosPago.innerHTML = "Mostrar datos de pago"
            mostrarDatosPago.setAttribute(mostrar, "false")
        } else { // Oculta datos de pago
            getDatosPago()
            datosPago.style.display = 'block'
            mostrarDatosPago.innerHTML = "Ocultar datos de pago"
            mostrarDatosPago.setAttribute(mostrar, "true")
        }
    })

    function getDatosPago() {
        document.getElementById('idCliente').value = idCliente
        document.getElementById('emailCliente').value = email

        fetch(`../../back/DatosPago/verDatosPago.php?id=${idCliente}`)
            .then(response => response.json())
            .then((data) => {
                // Parsea la respuesta a JSON
                info = JSON.parse(JSON.stringify(data));

                inputsPago[1].childNodes[3].value = info[0].nombreTitular
                inputsPago[2].childNodes[3].value = info[0].num_tarjeta
                inputsPago[3].childNodes[3].value = info[0].cvv
                inputsPago[4].childNodes[1].value = info[0].fecha_caducidad
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function datosEntrenador() {
    // Asignar el tipo al input para hacer la redirección correctamente
    document.getElementById('tipo').value = tipo

    // Ocultar y mostrar inputs
    document.getElementById('datosCliente').classList.remove('d-flex')
    document.getElementById('datosCliente').classList.add('d-none')
    document.getElementById('descEnt').classList.remove('d-none')
    document.getElementById('mostrarDatosPago').classList.add('d-none')

    // Cambiar action para etitar entrenador
    document.getElementById('formPerfil').action = "../../back/Entrenadores/php/editarPerfil.php"

    fetch(`../../back/Entrenadores/php/verEntrenador.php?email=${email}`)
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));
            idCliente = info[0].id

            // Información de la base de datos en los inputs
            inputs[0].value = info[0].name
            inputs[1].value = info[0].surname
            inputs[2].value = info[0].email
            inputs[6].value = info[0].description
            
            // Mostrar cursos del entrenador
            cursosEntrenador(info[0].id)
        })
        .catch(error => {
            console.log(error);
        });
}

// Quita el diabled del input para editar los datos 
btonEditarDatos.addEventListener('click', () => {
    console.log("enableds");
    inputs[2].disabled = false
})

/*
function cursosEntrenador(id) {
    let cursos = document.getElementById('cursosEntrenador')

    cursos.innerHTML = "pollas"

    console.log(id);

    fetch(`../../back/Cursos/php/getCursoById.php?id=${id}`)
    .then(response => response.json())
    .then((data) => {
        // Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        idCliente = info[0].id

        // Información de la base de datos en los inputs
        inputs[0].value = info[0].name
        inputs[1].value = info[0].surname
        inputs[2].value = info[0].email
        inputs[6].value = info[0].description
        
        // Mostrar cursos del entrenador
        cursosEntrenador(info[0].id)
    })
    .catch(error => {
        console.log(error);
    });

}
*/