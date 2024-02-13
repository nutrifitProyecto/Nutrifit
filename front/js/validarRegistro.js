let inputs = document.getElementsByTagName('input')

let form = document.forms['formulario_registro']
let inputsF = document.querySelectorAll('#formulario_registro input')

// regex para validar
const validation = {
    passwd: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z09-]+\.[a-zA-Z0-9-.]+$/,
}

// Comprobación de campos
const camposValidados = {
    nombre: false,
    apellido: false,
    passwd: false,
    email: false
}

// cuando carga la página
window.onload = cargarDatos

function cargarDatos() {
    form.onsubmit = mandarDatos

    camposRequired()

    // Asignar un evento por cada input
    inputsF.forEach((input) => {
        input.addEventListener('keyup', validateForm)
        input.addEventListener('blur', validateForm)
    })
}

function mandarDatos(e) {
    
/*
    if (camposValidados.nombre == true && camposValidados.apellido == true && camposValidados.passwd == true && camposValidados.email == true) {
        const formData = new FormData(form);

        for (const entry of formData.entries()) {
            console.log(entry[0], entry[1]);
        }

        fetch('../../back/src/registerClient.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json()) // Puedes ajustar esto según el formato de respuesta esperado
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor
                console.log(data);
                // Puedes redirigir o realizar otras acciones según sea necesario
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });
    } else {
        console.log("no se han podido enviar");
    }
    */
}

function camposRequired() {
    // Todos los campos deben tener valor
    form.elements["nombre"].setAttribute("required", "true")
    form.elements["apellido"].setAttribute("required", "true")
    form.elements["fechaNacimiento"].setAttribute("required", "true")
    form.elements["peso"].setAttribute("required", "true")
    form.elements["email"].setAttribute("required", "true")
    form.elements["passwd"].setAttribute("required", "true")
    form.elements["passwd2"].setAttribute("required", "true")
}

//Validar el formulario
function validateForm(e) {
    switch (e.target.name) {
        case "passwd":
            //Llamada a la función que valida la contraseña
            validarCampo(validation.passwd, e.target, 'passwd')
            validarConfpasswd()
            break
        case "email":
            //Llamada a la función que valida el email
            validarCampo(validation.email, e.target, 'email')
            break
        case "passwd2":
            //Comprueba que las contraseñas sean iguales
            validarConfpasswd()
            break
        case "nombre":
            //Comprueba que el campo no esté vacío
            validarNom(e.target, 'nombre')
            break
        case "apellido":
            //Comprueba que el campo no esté vacío
            validarNom(e.target, 'apellido')
            break
    }
}

// * Validar nombre
const validarNom = (input, campo) => {
    if (input.value != "") {
        camposValidados[campo] = true
    } else {
        camposValidados[campo] = false
    }
}

// * Las dos contraseñas coinciden
const validarConfpasswd = () => {
    const inputPasswd1 = document.getElementById('rg-passwd')
    const inputPasswd2 = document.getElementById('rg2-passwd')

    if (inputPasswd1.value !== inputPasswd2.value) {
        // No coinciden las contraseñas
        document.getElementById(`rg2-passwd`).style.border = '2px solid red'
        camposValidados['passwd'] = false
    } else {
        if (inputPasswd2.value != "") {
            // ? Son iguales y no son nulas
            document.getElementById(`rg2-passwd`).style.border = '1px solid white'
            camposValidados['passwd'] = true
        }
    }
}

// * Cambia los estilos a los campos no validados
const validarCampo = (expr, input, campo) => {
    if (expr.test(input.value)) {
        // ? Campo correcto
        document.getElementById(`rg-${campo}`).style.border = '1px solid white'
        camposValidados[campo] = true
    } else {
        // ! Campo incorrecto
        document.getElementById(`rg-${campo}`).style.border = '2px solid red'
        camposValidados[campo] = false
    }
}