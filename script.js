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
function addName(event) {
  event.preventDefault();
  const name = nameInput.value.trim(); // trim() eliminar los espacios en blanco de los extremos de una cadena
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
// validacion campo vacio
  if (name === '') {
    alert('Por favor, ingrese un nombre válido.');
    return;
  }
  if (lastName === '') {
    alert('Por favor, ingrese un Apellido válido.');
    return;
  }
  if (email === '') {
    alert('Por favor, ingrese un email válido.');
    return;
  }
  if (phone === '') {
    alert('Por favor, ingrese un telefono válido.');
    return;
  }

  datas.unshift({ name, lastName, email, phone }); // agrego los nuevos datos al principio  

  saveDatasToLocalStorage();
  renderDatas();
  nameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
}

// Función para mostrar la lista de nombres del DOM
/*function renderDatas() {
  nameList.innerHTML = '';

  datas.forEach((data, index) => {
    const li = document.createElement('li');
    li.textContent = `${data.name} ${data.lastName} ${data.email} ${data.phone}`;
    li.innerHTML += `<button onclick="editName(${index})">Editar</button> <button onclick="deleteName(${index})">Eliminar</button>`;
    nameList.appendChild(li);
  });
}*/

function renderDatas() {
  nameList.innerHTML = ''; // Vacía el contenido previo de la tabla

  datas.forEach((data, index) => {
    const tr = document.createElement('tr'); // Crea una nueva fila

    // Crea y agrega celdas para cada valor en el objeto data
    const nameCell = document.createElement('td');
    nameCell.textContent = data.name;
    tr.appendChild(nameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = data.lastName;
    tr.appendChild(lastNameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = data.email;
    tr.appendChild(emailCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = data.phone;
    tr.appendChild(phoneCell);

    // Crea las celdas para los botones de editar y eliminar
    const editCell = document.createElement('td'); // crea el elmento
    editCell.className = "areaButtonsE";
    const editButton = document.createElement('i'); // creo el boton
    //editButton.textContent = 'Editar'; // texto del boton
    editButton.className = 'bi bi-pencil'; // Agrega CSS para el ícono en vez del texto
    editCell.addEventListener('click', () => editName(index)); // accion al click llama a la funcion corrspondiente
    editCell.appendChild(editButton); // agrega al boton al td
    tr.appendChild(editCell); // agrega el td a la fila tr

    const deleteCell = document.createElement('td');
    deleteCell.className = 'areaButtons';
    const deleteButton = document.createElement('i');
    deleteButton.className = 'bi bi-trash'; // Agrega CSS para el ícono
    deleteCell.addEventListener('click', () => deleteName(index)); // al hacer click sobre la celda elimino
    deleteCell.appendChild(deleteButton);
    tr.appendChild(deleteCell);
    

    // Agrega la fila completa a la tabla
    nameList.appendChild(tr);
  });
}



// Función para editar un nombre en la lista
function editName(index) { //muestra el cuadro de dialogo para modificar el valor
  const newName = prompt('Ingrese un nuevo nombre:', datas[index].name);
  const newLastName = prompt('Ingrese un nuevo apellido:', datas[index].lastName);
  const newEmail = prompt('Ingrese un nuevo email:', datas[index].email);
  const newPhone = prompt('Ingrese un nuevo teléfono:', datas[index].phone);

  if ( // verifica si esta nulo o vacio
    newName === null || newName.trim() === '' ||
    newLastName === null || newLastName.trim() === '' ||
    newEmail === null || newEmail.trim() === '' ||
    newPhone === null || newPhone.trim() === ''
  ) {
    return;
  }

  datas[index].name = newName.trim(); // actualizamos el valor de la variable por el nuevo dato trim para eliminar los espacios en blanco al principio y final
  datas[index].lastName = newLastName.trim();
  datas[index].email = newEmail.trim();
  datas[index].phone = newPhone.trim();
  saveDatasToLocalStorage(); // Guardar los datos actualizados en el almacenamiento local
  renderDatas(); // publica la tabla con los datos actualizados
}



// Función para eliminar un nombre de la lista
function deleteName(index) {
  if (confirm('¿Está seguro de eliminar este nombre?')) {
    datas.splice(index, 1);
    saveDatasToLocalStorage();
    renderDatas();
  }
}

// Función para guardar los nombres en el almacenamiento local
function saveDatasToLocalStorage() {
  localStorage.setItem('datas', JSON.stringify(datas));
}

// Función para cargar los nombres desde el almacenamiento local
function loadDatasFromLocalStorage() {
  const storeddatas = localStorage.getItem('datas');
  if (storeddatas) {
    datas = JSON.parse(storeddatas);
  }
}

// Cargar los nombres desde el almacenamiento local al inicio
loadDatasFromLocalStorage();
renderDatas();

// Agregar el evento de envío al formulario
nameForm.addEventListener('submit', addName);
