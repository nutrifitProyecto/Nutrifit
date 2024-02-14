<?php
include "../../inc/dbinfo.inc";

// Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Recogida de datos del formulario
$name = $_POST['dietName'];
$desc = $_POST['dietDesc'];
$tipo = $_POST['dietTipo'];
$valor = $_POST['dietValor'];
$comidas = $_POST['dietComidas'];
$coste = $_POST['cursoCoste'];

// Redirect
$ent = $_POST['idEnt'];
$email = $_POST['email'];
$tipo = $_POST['tipo'];

// query para la dieta
$query = "INSERT INTO dietas (nombre, description, tipo, valor_calorico, comidas_dia) VALUES ('$name', '$desc', '$tipo', '$valor', '$comidas')";
$result = $connection->query($query);

// query para el curso
$query = "INSERT INTO cursos (idEntrenador, costeMes, tipo) VALUES ('$ent', '$coste', 2)";
$result = $connection->query($query);

// Una vez creada la dieta y el curso se seleccionan los ids más nuevos para insertarlos en la tabla cursos_dietas y gardar las relaciones
$query = "SELECT cursos.id AS cursoId, dietas.id AS dietId 
        FROM cursos, dietas
        ORDER BY cursoId desc, dietId desc
        LIMIT 1";

$result = $connection->query($query);

if ($result) {
        // Obtener los resultados como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);

        // Convertir a JSON
        $jsonResult = json_encode($data);
        // Decodificar datos para poder guardar variables
        $decodedData = json_decode($jsonResult, true);

        // Guardar en variables para hacer el insert
        $cursoId = $decodedData[0]['cursoId'];
        $dietId = $decodedData[0]['dietId'];

        $insertCursoE = "INSERT INTO cursos_dietas (idCurso, idDieta) VALUES ('$cursoId', '$dietId')";
        $result2 = $connection->query($insertCursoE);
        
        if ($result2) {
                header("Location: ../../../front/Perfil/perfil.html?email=$email&tipo=$tipo");
                exit();
        } else {
                echo "alert('error al crear el usuario')";
        }
} else {
        // Manejar el caso en que la consulta no fue exitosa
        echo "Error en la consulta: " . $connection->error;
}

$connection->close();