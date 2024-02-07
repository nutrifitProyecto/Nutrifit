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
        document.getElementById('Entrenador').innerHTML += "Entrenador: " + info[0].name + " " + info[0].surname
        document.getElementById('dietEntrenador').innerHTML += "Entrenador: " + info[0].name + " " + info[0].surname
    })
    .catch(error => {
        console.log(error);
    });

if (tipo == 1) {
    let infoCad = ``
    let ejercicios = document.getElementById('ejercicios')
    let dietaDisplay = document.getElementById('dietDisplay')

    dietaDisplay.style = "display: none;"

    // Datos del entrenamiento
    fetch(`./php/getEntrenamiento.php?idCurso=${idCurso}`)
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));

            // Muestra nombre y apellidos del entrenador
            document.getElementById('nombre').innerHTML += info[0].nombre + " - " + info[0].costeMes + "€/mes"
            document.getElementById('desc').innerHTML += info[0].description
            console.log(info[0].entId);

            infoCad += `<table class="table table-striped w-100">
                    <tr>
                        <th>Día</th>
                        <th>Descripción</th>
                        <th>Duración</th>
                    </tr>`

            // Recorre el array de ejercicios
            info.forEach(ej => {
                infoCad += `<tr id="column${ej.ejId}">
                        <td>${ej.ejDia}</td>
                        <td>${ej.ejDesc}</td>
                        <td>${ej.ejDur}</td>
            <tr>`
            });
            infoCad += `</table>`
            ejercicios.innerHTML = infoCad
        })
        .catch(error => {
            console.log(error);
        });
} else {
    let entDisplay = document.getElementById('entDisplay')
    entDisplay.style = "display: none;"

    fetch(`./php/getDieta.php?idCurso=${idCurso}`)
        .then(response => response.json())
        .then((data) => {
            // Parsea la respuesta a JSON
            info = JSON.parse(JSON.stringify(data));

            console.log(info);

            document.getElementById('dietNombre').innerHTML += info[0].nombre + " - " + info[0].coste + "€/mes"
            document.getElementById('dietDesc').innerHTML += info[0].dietDesc
            document.getElementById('dietData').innerHTML = `
            <ul>
                <li>Tipo: ${info[0].tipo}</li>
                <li>Valor Calórico: ${info[0].valor_calorico}</li>
                <li>Comidas al día: ${info[0].comidas_dia}</li>
            </ul>`
        })
        .catch(error => {
            console.log(error);
        });
}
