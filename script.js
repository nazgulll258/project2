const signIn = document.getElementById('sign-in');
const SignBtn = document.getElementById('loginBtn');
const exit = document.getElementById('exit');
const exitDiv = document.getElementById('exit-div');
const Close = document.getElementById('close');
const exitBtn = document.getElementById('exit-btn');
const divOl = document.getElementById('ol-div');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const button = document.getElementById('add-todo');
const names = document.getElementById('name');
const passwords = document.getElementById('password');
const form = document.getElementById('form');
const voiti = document.getElementById('voiti');

let saveId = null;
const register = async(e) => {
    e.preventDefault();
    const name = names.value;
    const password = passwords.value;
    if (!name || !password) {
        alert('Введите корректное имя и пароль');
        names.value = '';
        passwords.value = '';
        return;  
    }
    const users = { name: name, password: password };
    try {
        await axios.post('https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users', users);
        names.value = '';
        passwords.value = '';
    } catch (error) {
      console.error('ощибка'+error);
    }
}

form.addEventListener('submit', register);

const Vhood = async () => {
    try {
        const response = await axios.get('https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users');
        const data = response.data;
        const user = data.find(user => user.name === names.value && user.password === passwords.value);
        
        if (user) {
            alert('Вы успешно вошли');
            currentUserId = user.id;
            GetRequest(user.id);
        } else {
            alert('Неверное имя или пароль');
        }
    } catch (error) {
     
    }
}

voiti.addEventListener('click', Vhood);

const GetRequest = async (id) => {
    try {
        const response = await axios.get(`https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users/${id}/tasks`);
        const tasks = response.data;
        divOl.textContent = '';
        tasks.forEach((task) => {
            const li = document.createElement('li');
            const delet = document.createElement('button');
            const update = document.createElement('button');
            delet.textContent = 'delete';
            delet.addEventListener('click', () => deleteRequest(id, task.id));
            update.textContent = 'update';
            update.addEventListener('click', () => UpdateRequest(id, task.id));
            li.textContent = task.text;
            li.appendChild(delet);
            li.appendChild(update);
            divOl.appendChild(li);
        });
    } catch (error) {
        console.error("error", error);
    }
}

const postRequest = async (e) => {
    e.preventDefault();
    const input = todoInput.value;
    const todo = { text: input };
    try {
        if (currentUserId) {
            await axios.post(`https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users/${currentUserId}/tasks`, todo);
            todoInput.value = '';
            GetRequest(currentUserId);
        }
    } catch (error) {
        console.error("error", error);
    }
}

todoForm.addEventListener('submit', postRequest);

const deleteRequest = async (userId, taskId) => {
    try {
        await axios.delete(`https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users/${userId}/tasks/${taskId}`);
        GetRequest(userId);
    } catch (error) {
        console.error("error", error);
    }
}

const UpdateRequest = async (userId, taskId) => {
    const input = todoInput.value;
    const upd = { text: input };
    try {
        await axios.put(`https://665ee3fc1e9017dc16f1e8bb.mockapi.io/users/${userId}/tasks/${taskId}zz`, upd);
        todoInput.value = '';
        GetRequest(userId);
    } catch (error) {
        console.error("error", error);
    }
}