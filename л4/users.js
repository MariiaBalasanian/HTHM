const tableBody = document.getElementById('userTableBody');
const userForm = document.getElementById('addUserForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
  const users = getUsers();
  tableBody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" value="${user.name}" onchange="editUser(${index}, 'name', this.value)"></td>
      <td><input type="email" value="${user.email}" onchange="editUser(${index}, 'email', this.value)"></td>
      <td><button onclick="deleteUser(${index})">🗑️</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function addUser(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !email) return;

  const users = getUsers();
  users.push({ name, email });
  saveUsers(users);
  renderUsers();
  userForm.reset();
}

function deleteUser(index) {
  const users = getUsers();
  users.splice(index, 1);
  saveUsers(users);
  renderUsers();
}

function editUser(index, field, value) {
  const users = getUsers();
  users[index][field] = value;
  saveUsers(users);
}

userForm.addEventListener('submit', addUser);
window.addEventListener('DOMContentLoaded', renderUsers);
