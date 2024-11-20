document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ageInput = document.getElementById("age");
    const addUserBtn = document.getElementById("add-user-btn");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const userList = document.getElementById("user-list");
    const messageBox = document.getElementById("message-box");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let editIndex = null;

   
    function showMessage(message, type = "success") {
        messageBox.textContent = message;
        messageBox.className = `message ${type}`;
        setTimeout(() => messageBox.textContent = "", 3000);
    }

    
    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    
    function renderUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            const userRow = document.createElement("tr");
            userRow.className = index === editIndex ? "editing" : "";  
            userRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Editar</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Excluir</button>
                </td>
            `;
            userList.appendChild(userRow);
        });
    }

    
    function addUser() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const age = ageInput.value.trim();

       
        if (!name || !email || !age) {
            showMessage("Todos os campos são obrigatórios!", "error");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showMessage("Por favor, insira um e-mail válido.", "error");
            return;
        }

        if (isNaN(age) || age <= 0) {
            showMessage("A idade deve ser um número positivo.", "error");
            return;
        }

        if (editIndex === null) {
            
            users.push({ name, email, age });
            showMessage("Usuário adicionado com sucesso!");
        } else {
            
            users[editIndex] = { name, email, age };
            showMessage("Usuário atualizado com sucesso!");
            editIndex = null;
            addUserBtn.textContent = "Adicionar Usuário";
            cancelEditBtn.style.display = "none";
        }

        saveUsers();
        renderUsers();
        resetForm();
    }

    
    function resetForm() {
        nameInput.value = "";
        emailInput.value = "";
        ageInput.value = "";
    }

   
    window.editUser = function(index) {
        const user = users[index];
        nameInput.value = user.name;
        emailInput.value = user.email;
        ageInput.value = user.age;
        addUserBtn.textContent = "Salvar Alterações";
        cancelEditBtn.style.display = "inline";  
        editIndex = index;
    };

   
    window.deleteUser = function(index) {
        users.splice(index, 1);
        showMessage("Usuário excluído com sucesso!");
        saveUsers();
        renderUsers();
    };

   
    function cancelEdit() {
        resetForm();
        addUserBtn.textContent = "Adicionar Usuário";
        cancelEditBtn.style.display = "none";
        editIndex = null;
    }

    
    addUserBtn.addEventListener("click", addUser);
    cancelEditBtn.addEventListener("click", cancelEdit); 

    renderUsers(); 
});
