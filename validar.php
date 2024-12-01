<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Eliminar los guiones del valor de la cédula
    $cedula = str_replace('-', '', $_POST['cedula']);
    
    function validarCedula($cedula) {
        // Asegurarse de que la cédula tenga 11 dígitos
        if (strlen($cedula) != 11 || !ctype_digit($cedula)) {
            return false;
        }

        $peso = [1, 2]; // Alternar entre estos pesos
        $suma = 0;

        for ($i = 0; $i < 10; $i++) {
            $numero = $cedula[$i] * $peso[$i % 2];
            $suma += ($numero >= 10) ? $numero - 9 : $numero;
        }

        $digitoVerificador = (10 - ($suma % 10)) % 10;

        return $digitoVerificador == $cedula[10];
    }

    echo json_encode([
        'valid' => validarCedula($cedula),
        'cedula' => $cedula
    ]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>