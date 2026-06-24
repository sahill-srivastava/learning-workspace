const inputBox = document.getElementById("input_box");

const addBtn = document.querySelector(".add_btn");
const editBtn = document.querySelector(".edit_btn");
const delBtn = document.querySelector(".delete_btn");

const listContainer = document.querySelector(".list_container")

/*                       Handle States                   */
let items = [];

let editIndex = null;

/*                      Helper Functions                  */
function handler(e) {

    if (editIndex !== null) {
        items[editIndex].text = inputBox.value;
        addBtn.textContent = "Add";
        inputBox.value = "";
        editIndex = null;
    } else {
        let newTask = {
            text: inputBox.value,
            completed: false,
        }

        items.push(newTask)
        inputBox.value = "";
    }

    savedTasks();
    render();

}


//create task element
function createTask(item) {

    const listItem = document.createElement("div");
    listItem.className = "list_item";

    const label = document.createElement("label");
    label.className = "task_label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task_checkbox";
    checkbox.checked = item.completed;

    const span = document.createElement("span");
    span.className = "task_text";
    span.textContent = item.text;

    if (item.completed) {
        span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "task_actions";

    const editBtn = document.createElement("div");
    editBtn.className = "edit_btn button";
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete_btn button";
    deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

    label.append(checkbox, span);
    actions.append(editBtn, deleteBtn);
    listItem.append(label, actions);

    listContainer.append(listItem);
}

//render/display ui
function render() {

    listContainer.innerHTML = "";

    items.forEach(item => {
        createTask(item);
    });
}

function textdeco(checkbox, e) {
    const lab = checkbox.closest(".task_label");
    const task = lab.querySelector(".task_text");
    task.classList.toggle("completed")

    const taskText = task.textContent;

    const index = items.findIndex(item => item.text === taskText)

    items[index].completed = checkbox.checked;

    savedTasks();

}

function delTask(deleteTask) {
    const listItem = deleteTask.closest(".list_item");
    const text = listItem.querySelector(".task_text").textContent;

    const index = items.findIndex(item => item.text === text);

    items.splice(index, 1);

    savedTasks();
    render();
}


function editTask(editTaskEl) {
    const listItem = editTaskEl.closest(".list_item");
    const textEl = listItem.querySelector(".task_text");

    inputBox.value = textEl.textContent;
    addBtn.textContent = "Save"

    const text = textEl.textContent;

    editIndex = items.findIndex(item => item.text === text);
}

// localsestorage
function savedTasks() {
    localStorage.setItem("tasks", JSON.stringify(items));
}

// load items
function loadItems() {

    const data = localStorage.getItem("tasks");

    if (data) {
        items = JSON.parse(data);
    }
}


loadItems();
render();

/*                Attaching event listeners                    */

addBtn.addEventListener("click", handler)
inputBox.addEventListener("keydown", (e) => {
    if(e.key === "Enter") handler();    
})


//delete task
listContainer.addEventListener("click", function (e) {

    const checkbox = e.target.closest(".task_checkbox")
    const deleteTask = e.target.closest(".delete_btn");
    const editTaskEl = e.target.closest(".edit_btn");

    if (deleteTask) {
        delTask(deleteTask);
    }

    if (editTaskEl) {
        editTask(editTaskEl);
    }


    if (checkbox) {
        textdeco(checkbox, e);
    }

})

