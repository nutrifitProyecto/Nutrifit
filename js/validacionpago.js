function validarFormulario() {
  // Obtener los valores de los campos del formulario
  var nombre = document.getElementById('nombre').value.trim();
  var apellido = document.getElementById('apellido').value.trim();
  var correo = document.getElementById('correo').value.trim();
  var tarjeta = document.getElementById('tarjeta').value.trim();
  var fecha = document.getElementById('fecha').value.trim();
  var cvv = document.getElementById('cvv').value.trim();

  // Expresiones regulares para validar el correo y la tarjeta de crédito
  var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var tarjetaRegex = /^\d{16}$/;

  // Validar que los campos no estén vacíos
  if (nombre === '' || apellido === '' || correo === '' || tarjeta === '' || fecha === '' || cvv === '') {
      alert('Por favor, complete todos los campos.');
      return false;
  }

  // Validar el formato del correo electrónico
  if (!correoRegex.test(correo)) {
      alert('Por favor, introduzca un correo electrónico válido.');
      return false;
  }

  // Validar el formato de la tarjeta de crédito
  if (!tarjetaRegex.test(tarjeta)) {
      alert('Por favor, introduzca un número de tarjeta válido (16 dígitos).');
      return false;
  }

  // Validar el formato de la fecha (MM/DD/YYYY)


  // Validar que el CVV tenga 3 o 4 dígitos
  if (!cvv.match(/^\d{3,4}$/)) {
      alert('Por favor, introduzca un CVV válido (3 o 4 dígitos).');
      return false;
  }

  // Si todo está correcto, se envía el formulario
  return true;
}
// ENLAZAR CON BASE DE DATOS 
function pagar() {


  
  }