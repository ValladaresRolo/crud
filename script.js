// Obtener referencias a los elementos del DOM
const nameForm = document.getElementById('name-form'); // id formulario
const nameInput = document.getElementById('name-input'); // id nombre
const lastNameInput = document.getElementById('lastName-input');// id apellido
const emailInput = document.getElementById('email-input'); // id email
const phoneInput = document.getElementById('phone-input'); // id telefono
const nameList = document.getElementById('name-list'); // lista


// Array para almacenar los nombres
let datas = [];

// Función para agregar un nombre a la lista
function adddata (event) { 
    event.preventDefault(); // Evita que el formulario se envíe
    const name = nameInput.value.trim(); // trim() funcion propia de js para que no se guarde espacios vacios antes o despues del valor ingresado
    // compruebo que la constante name no este vacia
    if (name === '') {
      alert('Por favor, ingrese un nombre válido.'); // envio un alerta para que ingrese valor respectivo
      return;
    }
  
    datas.push(data); // agrego el valor ingresado al array names de la constante name
    
    nameInput.value = ''; // vacio el valor de la constante nameImput
  }