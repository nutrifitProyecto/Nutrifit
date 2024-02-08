let sesion = []

$(document).ready(function () {
    // Realizar una solicitud al servidor para verificar el estado de la sesión
    $.ajax({
        url: '../../back/Session/getSession.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            sesion = data
            console.log();
            if (sesion.autenticado) {
                console.log('Usuario autenticado:', sesion.autenticado + "\n" + sesion.email);
                // Aquí puedes realizar acciones específicas para usuarios autenticados
            } else {
                console.log('Usuario no autenticado');
                // Aquí puedes realizar acciones específicas para usuarios no autenticados
            }
        },
        error: function (error) {
            console.error('Error en la solicitud AJAX:', error);
        }
    });
});

