let paramURL = new URLSearchParams(window.location.search)
let email = paramURL.get('email')

let inputs = document.getElementsByClassName('form-control')
let btonEditarDatos = document.getElementById('btonEditarDatos')

fetch(`../../back/Clientes/php/verCliente.php?email=${email}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        console.log(info);
            
          inputs[0].value = info[0].name
          inputs[1].value = info[0].surname
          inputs[2].value = info[0].email
          inputs[3].value = info[0].fecha_nacimiento
          inputs[4].value = info[0].weight
          inputs[5].value = info[0].height

        //Llama a la función y crea una tabla con los clientes
    })
    .catch(error => {
        console.log(error);
    });

// Quita el diabled del input para editar los datos del usuario 
btonEditarDatos.addEventListener('click', () => {
    inputs[2].disabled = false
})


