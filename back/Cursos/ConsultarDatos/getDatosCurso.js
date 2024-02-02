let paramURL = new URLSearchParams(window.location.search)
let idCurso = paramURL.get('id')
let tipo = paramURL.get('tipo')

console.log(idCurso);
console.log(tipo);

//Datos del entrenamiento actual
fetch(`../php/getEntrenador.php?id=${idCurso}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));

        document.getElementById('entName').innerHTML += info[0].nombre
        document.getElementById('entDesc').innerHTML += info[0].description
        //Llama a la función y crea una tabla con los ejercicios
    })
    .catch(error => {
        console.log(error);
    });