let inputs = document.querySelectorAll('input')

window.addEventListener('DOMContentLoaded', () => {
    console.log('working');
})

//Comprobación de los campos que se validan
let camposValidados = {
    email: false,
    password: false
}

let regexValidation = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
}

//Valida los campos comprobando con regex
const validarCampo = (expr, input, campo) => {
    if (expr.test(input.value)) {
        console.log("funciona")
        camposValidados[campo] = true
    } else {
        console.log("no va")
        camposValidados[campo] = false
    }
}

function validarForm(e) {
    validarCampo(regexValidation[e.target.name], e.target, e.target.name)
}

//Asignar evento a todos los inputs menos al botón
for (let i = 0; i < inputs.length - 1; i++) {
    inputs[i].addEventListener('keyup', validarForm)
    inputs[i].addEventListener('blur', validarForm)
}

inputs[inputs.length - 1].addEventListener('click', () => {
    for (let i = 0; i < camposValidados.length - 1; i++) {
        if (campo == true) {
            console.log("correcto")
        } else {
            console.log("rompe")
            break
        }
    }
})