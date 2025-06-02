document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskPriority = document.getElementById("taskPriority").value;
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = `${taskInput.value} (${taskDate.value}) [${taskPriority}] 
            <button onclick="editTask(this)">Edit</button>
            <button onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(li);
        saveTask(taskInput.value, taskDate.value, taskPriority);
        taskInput.value = "";
    }
}

function removeTask(button) {
    button.parentElement.remove();
    updateLocalStorage();
}

function editTask(button) {
    let taskText = prompt("Edit task:", button.parentElement.textContent.split(" (")[0]);
    if (taskText) {
        button.parentElement.firstChild.textContent = taskText;
        updateLocalStorage();
    }
}

function saveTask(text, date, priority) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, date, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} (${task.date}) [${task.priority}] 
            <button onclick="editTask(this)">Edit</button>
            <button onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(li);
    });
}

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.firstChild.textContent;
        let details = text.match();
        tasks.push({ text: text.split(" (")[0], date: details[1], priority: details[2] });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
