const addTaskBtn = document.getElementById('add-task-btn');
const descTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');

        if (todoItemElems.length >= 6) {
            todosWrapper.classList.add('scroll');
        } else {
            todosWrapper.classList.remove('scroll');
        }
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

descTaskInput.addEventListener('keyup', (event) => {
    if(event.code === 'Enter') {
        addTask();
    }
});

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    if (descTaskInput.value !== ''){
        tasks.push(new Task(descTaskInput.value));
        updateLocal();
        fillHtmlList();
        descTaskInput.value = '';
    }
}

const deleteTask = index => {
    todoItemElems[index].classList.add('deletion')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 1000)
}