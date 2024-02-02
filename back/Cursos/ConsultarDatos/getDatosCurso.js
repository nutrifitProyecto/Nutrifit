let paramURL = new URLSearchParams(window.location.search)
let idCurso = paramURL.get('id')
let tipo = paramURL.get('tipo')
let ent = paramURL.get('ent')

//Datos del ENTRENADOR
fetch(`./php/getEntrenador.php?id=${ent}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));

        //Muestra nombre y apellidos del entrenador
        document.getElementById('Entrenador').innerHTML += "Curso de " + info[0].name + " " + info[0].surname
    })
    .catch(error => {
        console.log(error);
    });






if (tipo == 1) {
    fetch(`./php/getEntrenamiento.php?idCurso=${idCurso}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));

        //Muestra nombre y apellidos del entrenador
        console.log(info);
        //document.getElementById('Entrenador').innerHTML += "Curso de " + info[0].name + " " + info[0].surname
    })
    .catch(error => {
        console.log(error);
    });
}
