// drag and drop variable for task id
var currentDraggedElement;
// body onload functions
async function boardOnload() {
  await init(2);
  await loadTasksfromBackend();
  await downloadFromServer();
  renderTasksinBoard();
}
/**
 * this function is rendering the task boxes in the board
 */
function renderTasksinBoard() {
  document.getElementById("boardTodoContent").innerHTML = ``;
  document.getElementById("boardProgressContent").innerHTML = ``;
  document.getElementById("boardFeedbackContent").innerHTML = ``;
  document.getElementById("boardDoneContent").innerHTML = ``;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskStatus == "todo") {
      document.getElementById("boardTodoContent").innerHTML += `
            <div onclick="taskEditPopup(${tasks[i].taskID})" draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox pointer">
            <div class="boardBoxContent">
            <p class="boardBoxCategory ${tasks[i].taskCategory.TaskColor}">${tasks[i].taskCategory.Category}</p>
            <h4 class="boardBoxTitle">${tasks[i].taskTitle}</h4>
            <p class="boardBoxDescription">
              ${tasks[i].taskDescription}
            </p>
            <div class="boardBoxFooter">
              <div class="boxContacts"></div>
              <img src="./assets/img/icon${tasks[i].priority}.png" />
            </div>
          </div>`;
    }
    if (tasks[i].taskStatus == "progress") {
      document.getElementById("boardProgressContent").innerHTML += `
      <div onclick="taskEditPopup(${tasks[i].taskID})" draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${tasks[i].taskCategory.TaskColor}">${tasks[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${tasks[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${tasks[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div class="boxContacts"></div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    }
    if (tasks[i].taskStatus == "feedback") {
      document.getElementById("boardFeedbackContent").innerHTML += `
      <div onclick="taskEditPopup(${tasks[i].taskID})" draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${tasks[i].taskCategory.TaskColor}">${tasks[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${tasks[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${tasks[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div class="boxContacts"></div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    }
    if (tasks[i].taskStatus == "done") {
      document.getElementById("boardDoneContent").innerHTML += `
      <div onclick="taskEditPopup(${tasks[i].taskID})" draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${tasks[i].taskCategory.TaskColor}">${tasks[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${tasks[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${tasks[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div class="boxContacts"></div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    }
  }
  console.log("Tasks successfully loaded into board!");
}
/**
 * save the dragged element
 */
function startDraggin(id) {
  currentDraggedElement = id;
}
/**
 * allows the drop in this area
 */
function allowDrop(ev) {
  ev.preventDefault();
}
/**
 * task status change by dropping
 */
async function drop(status) {
  tasks[currentDraggedElement]["taskStatus"] = status;
  renderTasksinBoard();
  pushTasksinBackend();
}
/**
 * showing popup Add task
 */
function addTaskPopup() {
  document.getElementById("popup-bg").classList.remove("d-none");
  document.getElementById("popup-addTask").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("popup-addTask").classList.add("popup-slideInAddTask");
    document.getElementById("popup-bg").classList.remove("no-opacity");
  }, 10);
}
/**
 * hiding popup add Task
 */
function hidePopUps() {
  document.getElementById("popup-addTask").classList.remove("popup-slideInAddTask");
  document.getElementById("popup-Task").classList.remove("popup-slideInTask");
  document.getElementById("popup-bg").classList.add("no-opacity");
  setTimeout(() => {
    document.getElementById("popup-addTask").classList.add("d-none");
    document.getElementById("popup-bg").classList.add("d-none");
  }, 250);
}
/**
 * showing popup from task // Comeback
 */
function taskEditPopup(taskID) {
  document.getElementById("popup-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("popup-bg").classList.remove("no-opacity");
    document.getElementById("popup-Task").classList.add("popup-slideInTask");
  }, 10);
  //document.getElementById('popup-addTask').innerHTML = `

  //`;
}
