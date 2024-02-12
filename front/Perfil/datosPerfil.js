let paramURL = new URLSearchParams(window.location.search)
let email = paramURL.get('email')
let tipo = paramURL.get('tipo')

let idCliente
let idEnt
let info = []

let inputs = document.getElementsByClassName('form-control')
let btonEditarDatos = document.getElementById('btonEditarDatos')
let datosPago = document.getElementById('datosPago')

// Inputs de la ventana de pago
let inputsPago = document.getElementsByName('inputsDatosPago')

// Mostrar y ocultar conenedores
let mostrarDatosPago = document.getElementById('mostrarDatosPago')
let mostrar = mostrarDatosPago.getAttribute('mostrar')

// Crear cursos
let btnCrearCurs = document.getElementById('btnCrearDiet')

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

    btnCrearCurs.style.display = 'none'

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
            mostrarDatosPago.innerHTML = `<i class="fa-solid fa-wallet"></i>`
            mostrarDatosPago.setAttribute(mostrar, "false")
        } else { // Oculta datos de pago
            getDatosPago()
            datosPago.style.display = 'block'
            mostrarDatosPago.innerHTML = `<i class="fa-solid fa-wallet"></i>`
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
            idEnt = info[0].id

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

// Mostrar en el perfil los cursos del entrenador
function cursosEntrenador(id) {
    fetch(`../../back/Cursos/php/getCursoByIdEnt.php?idEntrenador=${id}`)
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));

            // Selecciona el contenedor donde mostrar los datos
            const container = document.getElementById("dataContainer");

            // Itera sobre el array y crea el HTML para cada elemento

            console.log(info);

            info.forEach(curso => {

                // Crea un nuevo elemento div con las clases de Bootstrap para columnas
                const nuevoElemento = document.createElement("div");
                //nuevoElemento.classList.add("col-md-2", "mb-3");

                // Crear card y aplicarle estilos
                const card = document.createElement("div")
                card.classList.add("card")
                card.classList.add("ms-2")
                card.classList.add("me-2")
                card.classList.add("mb-4")
                card.style.width = "21rem"

                // Body de la carta
                const cBody = document.createElement('div')
                cBody.classList.add('card-body')

                // Titulo curso
                const title = document.createElement('h5')
                title.classList.add('card-title')
                title.style.color = '#ff6b08'

                // Descripción curso
                const desc = document.createElement('p')
                desc.classList.add('card-text')

                const eliminar = document.createElement('button')
                const editar = document.createElement('button')

                if (curso.cTipo == 1) {
                    // Título
                    title.textContent = curso.entName + " " + curso.cCoste + "€/mes"
                    title.classList.add('fs-4')
                    cBody.appendChild(title)

                    // Descripción
                    desc.textContent = curso.entDesc
                    desc.classList.add('text-break')
                    cBody.appendChild(desc)

                    // btn eliminar
                    eliminar.textContent = "Eliminar"
                    eliminar.id = "curs" + curso.cId
                    eliminar.classList.add('btn')
                    eliminar.classList.add('btn-danger')
                    cBody.appendChild(eliminar)
                } else {
                    // Título
                    title.textContent = curso.dietNom + " " + curso.cCoste + "€/mes"
                    title.classList.add('fs-4')
                    cBody.appendChild(title)

                    // Descripción
                    desc.textContent = curso.dietDesc
                    desc.classList.add('text-break')
                    cBody.appendChild(desc)

                    // btn eliminar
                    eliminar.textContent = "Eliminar"
                    eliminar.id = "curs" + curso.cId
                    eliminar.classList.add('btn')
                    eliminar.classList.add('btn-danger')
                    cBody.appendChild(eliminar)
                }
                console.log(card);
                card.appendChild(cBody)
                //nuevoElemento.appendChild(card)

                // Añade el nuevo elemento al contenedor
                container.appendChild(card);
            });

            info.forEach(curso => {
                document.getElementById('curs' + curso.cId).addEventListener('click', () => {
                    eliminarCurso(curso.cId, )
                })
            })
            console.log(container);
        })
        .catch(error => {
            console.log(error);
        });

        // Redirect a crear cursos
    btnCrearDiet.addEventListener('click', () => {
        window.location.replace(`../CrearCurso/crearCurso.html?idEnt=${idEnt}&email=${email}&tipo=${tipo}`)
    })

    function eliminarCurso(idCurs) {
        console.log(idCurs);
        $.ajax({
            type: "POST", //POST para enviar los datos al php
            url: "./php/eliminarDieta.php",
            data: { idToDelete: sendId }, // Enviar la variable como parte de los datos
            success: window.location = "./dietaList.html"
        });
    }
}
