let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

displayTask();

function addTask() {
    let input = document.getElementById("name");
    let task = input.value.trim();

    if (task == "") {
        alert("Please enter task");
        return;
    }

    if (editIndex === -1) {
        tasks.push(task);
    } else {
        tasks[editIndex] = task;
        editIndex = -1;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTask();
}

function displayTask() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((item, index) => {
        list.innerHTML += `
        <li class="list-group-item">
            ${item}
            <div>
                <button class="edit-btn" onclick="editTask(${index})">
                    <img src="./assests/images/pen.png" alt="">
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">
                    <img src="./assests/images/delete.png" alt="">
                </button>
            </div>
        </li>
        `;
    });
}

function editTask(index) {
    document.getElementById("name").value = tasks[index];
    editIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
}