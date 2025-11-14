document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Загрузка задач из localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-text';
            taskSpan.textContent = task.text;
            if (task.completed) {
                taskSpan.classList.add('completed');
            }
            
            taskSpan.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    renderTasks();
});