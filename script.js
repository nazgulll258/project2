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

const Signin = () => {
    signIn.style.display = 'block';
};
SignBtn.addEventListener('click', Signin);

const Exit = () => {
    exitDiv.style.display = 'block';
};
exit.addEventListener('click', Exit);

const Closer = () => {
    signIn.style.display = 'none';
};
Close.addEventListener('click', Closer);

const Exitt = () => {
    exitDiv.style.display = 'none';
};
exitBtn.addEventListener('click', Exitt);

const postRequest = async(e) => {
    e.preventDefault();
    const input = todoInput.value;
    if (!input) return;
    const todo = { text: input };
    try {
        await axios.post(`https://665d9e48e88051d604078a02.mockapi.io/todo/api/todo`, todo);
        todoInput.value = '';
        getRequest();
    } catch (error) {
        console.error("Error posting todo:", error);
    }
};
button.addEventListener('click', postRequest);

const getRequest = async() => {
    try {
        const response = await axios.get('https://665d9e48e88051d604078a02.mockapi.io/todo/api/todo');
        const todo = response.data;
        divOl.textContent = '';
        todo.map((todos) => {
            const li = document.createElement('li');
            const inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.addEventListener('click', () => toggleTextDecoration(li));
            li.textContent = todos.text;
            const delet = document.createElement('button');
            const remove = document.createElement('button');
            remove.textContent = 'Remove';
            remove.addEventListener('click', () => UpdateReguest(todos.id));
            delet.textContent = 'Delete';
            delet.addEventListener('click', () => deleteRequest(todos.id));
            delet.className = 'delet';
            li.className = 'li';
            li.appendChild(inp);
            li.appendChild(delet);
            li.appendChild(remove);
            divOl.appendChild(li);
        });
    } catch (error) {
        console.error(error, 'error');
    }
};

window.addEventListener('DOMContentLoaded', getRequest);

const deleteRequest = async(id) => {
    try {
        await axios.delete(`https://665d9e48e88051d604078a02.mockapi.io/todo/api/todo/${id}`);
        getRequest();
    } catch (error) {
        console.error(error);
    }
};

const UpdateReguest = async(id) => {
    const input = todoInput.value;
    if (!input) return;
    const todos = { text: input }
    try {
        await axios.put(`https://665d9e48e88051d604078a02.mockapi.io/todo/api/todo/${id}`,todos );
        getRequest();
        todoInput.value = '';
    } catch (error) {
        console.error(error);
    }
};

function toggleTextDecoration(element) {
    if (element.style.textDecoration === 'line-through') {
        element.style.textDecoration = 'none';
    } else {
        element.style.textDecoration = 'line-through';
    }
}
