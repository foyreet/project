// project.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const sortTasksByTimeBtn = document.getElementById('sortTasksByTime');
    const sortTasksByStatusBtn = document.getElementById('sortTasksByStatus');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `${task.text} (${task.time})`;

            if (task.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', () => toggleTaskCompletion(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Остановить событие клика от распространения на родителя
                deleteTask(index);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDateTime = taskTime.value;

        if (taskText && taskDateTime) {
            tasks.push({ text: taskText, time: taskDateTime, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            taskTime.value = '';
            renderTasks();
        }
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function sortTasksByTime() {
        tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
        renderTasks();
    }

    function sortTasksByStatus() {
        tasks.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    sortTasksByTimeBtn.addEventListener('click', sortTasksByTime);
    sortTasksByStatusBtn.addEventListener('click', sortTasksByStatus);

    renderTasks();
});