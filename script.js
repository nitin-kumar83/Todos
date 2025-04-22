const inputField = document.getElementById("myInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("task-count");
const filterAll = document.getElementById("all-task");
const filterActive = document.getElementById("active-task");
const filterComplete = document.getElementById("completed-task");
const arrow = document.getElementById("toggle-arrow");
const footer = document.querySelector("footer");
let count = 0;

function updateVisibility(){
    const hasTasks = taskList.children.length > 0;
    arrow.style.display = hasTasks ? 'block': 'none';
    footer.style.display = hasTasks ? 'flex': 'none';
}

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && inputField.value.trim() !== "") {
        addTask(inputField.value.trim());
        inputField.value = "";
    }
});

function addTask(taskText) {
    const li = document.createElement("li");
    li.setAttribute("data-id", count);
    li.innerHTML = `
        <div class="space">
          <div>
           <input type="checkbox" class="toggle" />
           <label>${taskText}</label>  
          </div>   
          <div class="destroy"><i class="fa-solid fa-xmark"></i></div>
        </div>
    `;

    setTimeout(() => {
        li.classList.add("show");
    }, 10);

    taskList.appendChild(li);
    count++;
    updateTaskCount();
    updateVisibility();

    li.querySelector(".toggle").addEventListener("change", function () {
        li.classList.toggle("completed", this.checked);
        li.querySelector("label").style.textDecoration = this.checked ? "line-through" : "none";
        updateTaskCount();
    });

    li.querySelector(".destroy").addEventListener("click", function () {
        li.classList.remove("show");
        setTimeout(() => {
            li.remove();
            updateTaskCount();
            updateVisibility();
        }, 300);
    });
}
updateVisibility();

function updateTaskCount() {
    const allTasks = document.querySelectorAll("#taskList li").length;
    const activeTasks = document.querySelectorAll("#taskList li:not(.completed)").length;
    const completedTasks = document.querySelectorAll("#taskList li.completed").length;

    taskCount.textContent = `${activeTasks} item${activeTasks !== 1 ? "s" : ""} left`;

    const clearButton = document.getElementById('clear-completed');
    clearButton.style.display = completedTasks > 0 ? 'block' : 'none';
}

function filterTasks(filter = "all") {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach((task) => {
        if (filter === "all") {
            task.style.display = "flex";
        } else if (filter === "active") {
            task.style.display = task.classList.contains("completed") ? "none" : "flex";
        } else if (filter === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        }
    });

    updateTaskCount();
}

filterAll.addEventListener("click", () => {
    filterTasks("all");
});

filterActive.addEventListener("click", () => {
    filterTasks("active");
});

filterComplete.addEventListener("click", () => {
    filterTasks("completed");
});

document.getElementById("toggle-arrow").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".toggle");
    const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);

    checkboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
        checkbox.closest("li").classList.toggle("completed", !allChecked);
        checkbox.closest("li").querySelector("label").style.textDecoration = !allChecked ? "line-through" : "none";
    });

    updateTaskCount();
});

document.getElementById('clear-completed').addEventListener('click', function() {
    const completedTasks = document.querySelectorAll("#taskList li.completed");

    completedTasks.forEach(tasks => {
        tasks.remove();
    })
})