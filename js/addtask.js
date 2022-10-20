function changeInputContact() {
  document.getElementById("selectorContact").innerHTML = `
  <input id="newContactText" type="text" placeholder="Contact email">`;
}
function changeInputCategory() {
  document.getElementById("selectorCategory").innerHTML = `
  <input id="newCategoryText" type="text" placeholder="New category name">`;
}
function addTask() {
  let taskInputTitle = document.getElementById("inputTitle").value;
  let selectContact = document.getElementById("selectContact").value;
  let dueDate = document.getElementById("selectDate").value;
  let selectCategory = document.getElementById("selectCategory").value;
  //let taskImportance = document.getElemenentById('').value;
  //let categoryColor = document.getElementById('').value;
  //let selectedSubtask = document.getElementById('').value;
  let description = document.getElementById("inputDescription").value;
  tasks.push({  "taskTitle": taskInputTitle,
                "description": description,
                "dueDate": dueDate,
                "taskCategory": selectCategory,
                //"subTask": selectedSubtask,
                "taskID": tasks.length,
                //"categoryColor": categoryColor,
                //"priority": taskImportance,
                "assignedTo": selectContact
})
console.log(tasks[0], tasks[1]);
}
function renderSubTask() {
  for (let i = 0; i < subTasks.length; i++) {
    document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList">  
        <input value="${subTasks[i]}" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
  }
}
function taskClear() {
    let taskInputTitle = document.getElementById("inputTitle").value = ``;;
  let selectContact = document.getElementById("selectContact").value = ``;
  let dueDate = document.getElementById("selectDate").value = ``;
  let selectCategory = document.getElementById("selectCategory").value = ``;
  //let taskImportance = document.getElemenentById('').value;
  //let categoryColor = document.getElementById('').value;
  //let selectedSubtask = document.getElementById('').value;
  let description = document.getElementById("inputDescription").value = ``;
}