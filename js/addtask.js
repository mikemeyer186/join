/**
 * Add the Tasks in the LocalStorage
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
  backend.setItem("tasks", JSON.stringify(tasks));
  console.log(JSON.parse(backend.getItem("tasks")));
}
/**
 * Rendering the subtasks checkboxes at the footer
 */
function renderSubTask() {
  console.log(subTasks.length);
  if (subTasks == true) {
    subTasks = [];
    subTasks.push(JSON.parse(localStorage.getItem("subTasks")));
    console.log(subTasks.length);
    for (let i = 0; i <= subTasks.length; i++) {
      document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList">  
        <input value="${subTasks[i]}" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
    }
  } else {
    subTasks.push("Subtask","Subtask2");
    localStorage.setItem("subtasks", subTasks);
  }
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
 * pushing new subtask in the Localstorage
 */
function pushSubtaskLocalStorage() {
  renderSubTask();
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
