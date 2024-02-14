let paramURL = new URLSearchParams(window.location.search)
let idEnt = paramURL.get('idEnt')
let email = paramURL.get('email')
let tipo = paramURL.get('tipo')

// Inputs y asignar valores
let inputIdEnt = document.getElementById('idEnt')
let inputEmail = document.getElementById('email')
let inputTipo = document.getElementById('tipo')
let inputIdEntDiet = document.getElementById('idEntDiet')
let inputEmailDiet = document.getElementById('emailDiet')
let inputTipoDiet = document.getElementById('tipoDiet')

inputIdEnt.value = idEnt
inputEmail.value = email
inputTipo.value = tipo
inputIdEntDiet.value = idEnt
inputEmailDiet.value = email
inputTipoDiet.value = tipo


// Votón volver al perfil
let volverPerfil = document.getElementById('volverPerfil')

volverPerfil.addEventListener('click', () => {
    window.location.replace(`../Perfil/perfil.html?email=${email}&tipo=${tipo}`)
})

// Formularios
let formCrearDieta = document.getElementById('crearDieta')
let formCrearEntrenamiento = document.getElementById('crearEntrenamiento')

let cambioCurso = document.getElementById('cambioCurso')
let mostrar = cambioCurso.getAttribute('mostrar')

cambioCurso.addEventListener('click', () => {
    // Cambiar de formularios
    if (cambioCurso.getAttribute(mostrar) == "ent") {
        formCrearEntrenamiento.style.display = 'block'
        formCrearDieta.style.display = 'none'

        cambioCurso.innerHTML = "Cambiar a dieta"
        cambioCurso.setAttribute(mostrar, "diet")
    } else {
        formCrearEntrenamiento.style.display = 'none'
        formCrearDieta.style.display = 'block'

        cambioCurso.innerHTML = "Cambiar a entrenamiento"
        cambioCurso.setAttribute(mostrar, "ent")
    }
})