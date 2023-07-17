const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario= document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta= document.querySelector('#tarjeta .numero'),
      nombreTarjeta= document.querySelector('#tarjeta .nombre'),
      Logo = document.querySelector('#Logo'),
      firma= document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year'),
	  ccv = document.querySelector('#tarjeta .ccv');

      //voltear la tarjeta
      const verfrente= () =>{
        if(tarjeta.classList.contains('active')){
            tarjeta.classList.remove('active');
        }
      }
//*girar la tarjeta
    tarjeta.addEventListener('click', () => {
        tarjeta.classList.toggle('active');
    })
//abrir el formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

//*llenar los select del mes
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option')
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}
//completar los años
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let opcion = document.createElement('option')
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

//*espacio de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

    //esto se usa para que lo ponga en la tarjeta
	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';
		Logo.innerHTML = '';
	}

    // esto se usa para ver si es visa o mastercard

    if(valorInput[0] == 4){
		Logo.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'imagenes/logos/visa.png';
		Logo.appendChild(imagen);

	} else if(valorInput[0] == 5){
		Logo.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'imagenes/logos/mastercard.png';
		Logo.appendChild(imagen);
	}

    verfrente();
})

//*espacio del nombre de la tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput
    .replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'MANUEL ESCOBAR';
	}

	verfrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	verfrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	verfrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});