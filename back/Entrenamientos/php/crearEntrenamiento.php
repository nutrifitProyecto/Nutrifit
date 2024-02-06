<?php
include "../../inc/dbinfo.inc";

//Conectar con la base de datos
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$name = $_POST['trainName'];
$desc = $_POST['trainDesc'];
$coste = $_POST['cursoCoste'];
$ent = $_POST['cursoEnt'];

// query para crear el entrenamiento
$query = "INSERT INTO entrenamientos (nombre, description) VALUES ('$name', '$desc')";
$result = $connection->query($query);

// query para crear el curso
$query = "INSERT INTO cursos (idEntrenador, costeMes, tipo) VALUES ('$ent', '$coste', 1)";
$result = $connection->query($query);

// Una vez creado el entrenamiento y el curso se seleccionan los ids más nuevos para insertarlos en la tabla cursos_entrenamientos y gardar las relaciones
$query = "SELECT cursos.id AS cursoId, entrenamientos.id AS entId 
        FROM cursos, entrenamientos
        ORDER BY cursoId desc, entId desc
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
        $entId = $decodedData[0]['entId'];

        $insertCursoE = "INSERT INTO cursos_entrenamientos (idCurso, idEntrenamiento) VALUES ('$cursoId', '$entId')";
        $result2 = $connection->query($insertCursoE);
        
        if ($result2) {
                header('Location: ../entrenamientoList.html');
                exit();
        } else {
                echo "alert('error al crear el usuario')";
        }
} else {
        // Manejar el caso en que la consulta no fue exitosa
        echo "Error en la consulta: " . $connection->error;
}

// Cerrar la conexión, si es necesario
$connection->close();
