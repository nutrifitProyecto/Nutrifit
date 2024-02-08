let paramURL = new URLSearchParams(window.location.search)
let email = paramURL.get('email')

let inputs = document.getElementsByName('inputPerfil')

console.log(email);

fetch(`../../back/Clientes/php/verCliente.php?email=${email}`)
    .then(response => response.json())
    .then((data) => {
        //Parsea la respuesta a JSON
        info = JSON.parse(JSON.stringify(data));
        console.log(info);
            
          inputs[0].value = info[0].name
          inputs[1].value = info[0].surname
          console.log(inputs[2]);
          inputs[2].value = info[0].email

        //Llama a la función y crea una tabla con los clientes
        datosCliente()
    })
    .catch(error => {
        console.log(error);
    });

function datosCliente() {

}