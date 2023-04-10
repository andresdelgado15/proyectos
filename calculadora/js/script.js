function agregar(valor) {
	var resultado = document.getElementById('resultado');
	resultado.value += valor;
}

function borrar() {
	var resultado = document.getElementById('resultado');
	resultado.value = '';
}

function calcular() {
	var resultado = document.getElementById('resultado');
	try {
		resultado.value = eval(resultado.value);
	} catch (error) {
		resultado.value = 'Error';
	}
}

