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
  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

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

  datas.push({ name, lastName, email, phone });

  savedatasToLocalStorage();
  renderdatas();
  nameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
}

// Función para mostrar la lista de nombres en el DOM
function renderdatas() {
  nameList.innerHTML = '';

  datas.forEach((data, index) => {
    const li = document.createElement('li');
    li.textContent = `${data.name} ${data.lastName} ${data.email} ${data.phone}`;
    li.innerHTML += `<button onclick="editName(${index})">Editar</button> <button onclick="deleteName(${index})">Eliminar</button>`;
    nameList.appendChild(li);
  });
}

// Función para editar un nombre en la lista
function editName(index) {
  const newName = prompt('Ingrese un nuevo nombre:', datas[index].name);
  const newLastName = prompt('Ingrese un nuevo apellido:', datas[index].lastName);
  const newEmail = prompt('Ingrese un nuevo email:', datas[index].email);
  const newPhone = prompt('Ingrese un nuevo teléfono:', datas[index].phone);

  if (
    newName === null || newName.trim() === '' ||
    newLastName === null || newLastName.trim() === '' ||
    newEmail === null || newEmail.trim() === '' ||
    newPhone === null || newPhone.trim() === ''
  ) {
    return;
  }

  datas[index].name = newName.trim();
  datas[index].lastName = newLastName.trim();
  datas[index].email = newEmail.trim();
  datas[index].phone = newPhone.trim();
  savedatasToLocalStorage();
  renderdatas();
}



// Función para eliminar un nombre de la lista
function deleteName(index) {
  if (confirm('¿Está seguro de eliminar este nombre?')) {
    datas.splice(index, 1);
    savedatasToLocalStorage();
    renderdatas();
  }
}

// Función para guardar los nombres en el almacenamiento local
function savedatasToLocalStorage() {
  localStorage.setItem('datas', JSON.stringify(datas));
}

// Función para cargar los nombres desde el almacenamiento local
function loaddatasFromLocalStorage() {
  const storeddatas = localStorage.getItem('datas');
  if (storeddatas) {
    datas = JSON.parse(storeddatas);
  }
}

// Cargar los nombres desde el almacenamiento local al inicio
loaddatasFromLocalStorage();
renderdatas();

// Agregar el evento de envío al formulario
nameForm.addEventListener('submit', addName);
