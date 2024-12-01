// Formatear cédula con guiones automáticamente
function formatearCedula(input) {
    let valor = input.value.replace(/-/g, ''); // Eliminar guiones previos
    if (valor.length > 3 && valor.length <= 10) {
        input.value = `${valor.substring(0, 3)}-${valor.substring(3)}`;
    } else if (valor.length > 10) {
        input.value = `${valor.substring(0, 3)}-${valor.substring(3, 10)}-${valor.substring(10, 11)}`;
    } else {
        input.value = valor; // Sin guiones si no se alcanzan los primeros 3 dígitos
    }
}

// Enviar el formulario y mostrar el resultado
document.getElementById('form-cedula').addEventListener('submit', function (e) {
    e.preventDefault();
    const cedula = document.getElementById('cedula').value;

    fetch('validar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cedula=${cedula}`
    })
    .then(response => response.json())
    .then(data => {
        const resultado = document.getElementById('resultado');
        if (data.valid) {
            resultado.textContent = `La cédula ${data.cedula} es válida.`;
            resultado.style.color = 'green';
        } else {
            resultado.textContent = `La cédula ${data.cedula} no es válida.`;
            resultado.style.color = 'red';
        }
    })
    .catch(error => console.error('Error:', error));
});