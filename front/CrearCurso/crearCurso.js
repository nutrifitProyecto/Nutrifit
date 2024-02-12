let paramURL = new URLSearchParams(window.location.search)
let idEnt = paramURL.get('idEnt')
let email = paramURL.get('email')
let tipo = paramURL.get('tipo')

// Inputs y asignar valores
let inputIdEnt = document.getElementById('idEnt')
let inputEmail = document.getElementById('email')
let inputTipo = document.getElementById('tipo')

inputIdEnt.value = idEnt
inputEmail.value = email
inputTipo.value = tipo

// Votón volver al perfil
let volverPerfil = document.getElementById('volverPerfil')

volverPerfil.addEventListener('click', () => {
    window.location.replace(`../Perfil/perfil.html?email=${email}&tipo=${tipo}`)
})