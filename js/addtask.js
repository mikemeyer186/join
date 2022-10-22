/**
 * pulling tasks from backend
 */
async function loadTasksfromBackend() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
}
/**
 * Push JSON in tasks
 */
function addTask() {
  let taskInputTitle = document.getElementById("inputTitle").value;
  let selectContact = document.getElementById("selectContact").value;
  let dueDate = document.getElementById("selectDate").value;
  let selectCategory = document.getElementById("selectCategory").value;
  //let taskImportance = document.getElemenentById('').value;
  //let categoryColor = document.getElementById('').value;
  //let selectedSubtask = document.getElementById('').value;
  let description = document.getElementById("inputDescription").value;
  tasks.push({
    taskTitle: taskInputTitle,
    description: description,
    dueDate: dueDate,
    taskCategory: selectCategory,
    //"subTask": selectedSubtask,
    taskID: tasks.length,
    //"categoryColor": categoryColor,
    //"priority": taskImportance,
    assignedTo: selectContact,
  });
  pushTasksinBackend();
}

async function pushTasksinBackend() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}
/**
 * Rendering the subtasks checkboxes at the footer
 */
function renderSubTask() {
  subTasks = JSON.parse(localStorage.getItem('subtasks'));
  document.getElementById("addSubtaskCheckbox").innerHTML = ``;
  for (let i = 0; i < subTasks.length; i++) {
    document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList">  
        <input value="${subTasks[i]}" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
  }
}
/**
 * pushing new subtask in the Localstorage
 */
function pushSubtaskLocalStorage() {
  subTasks.push(document.getElementById("subtaskText").value);
  localStorage.setItem("subtasks",JSON.stringify(subTasks));
  renderSubTask();
}
/**
 * Clear the input / selectors
 */
function taskClear() {
  document.getElementById("inputTitle").value = ``;
  document.getElementById("selectContact").value = ``;
  document.getElementById("selectDate").value = ``;
  document.getElementById("selectCategory").value = ``;
  //document.getElemenentById('').value;
  //document.getElementById('').value;
  //document.getElementById('').value;
  document.getElementById("inputDescription").value = ``;
}
/**
 * Change the contact selector in a input field
 */
function changeInputContact() {
  document.getElementById("selectorContact").innerHTML = `
  <input id="newContactText" type="text" placeholder="Contact email">`;
}
/**
 * Change the Category selector in a input field
 */
function changeInputCategory() {
  document.getElementById("selectorCategory").innerHTML = `
  <input id="newCategoryText" type="text" placeholder="New category name">`;
}
