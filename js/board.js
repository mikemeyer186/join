// drag and drop variable for task id
var currentDraggedElement;
var popupTaskContent = []; 
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
        <div id="${tasks[i].taskID}" class="boxContacts">
        <p></p>
        </div>
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
        <div id="boxContacts">
        <div class="abbreviationIconsBox" style="background-color: ${tasks[i].assignedTo[0].paint}">${tasks[i].assignedTo[0].abbreviation}</div>
        <div class="abbreviationIconsBox" style="background-color: ${tasks[i].assignedTo[1].paint}">${tasks[i].assignedTo[1].abbreviation}</div>
        <div class="abbreviationIconsBox" style="background-color: ${tasks[i].assignedTo[2].paint}">+${tasks[i].assignedTo.length - 2}</div>
        </div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    }
  }
  console.log("Tasks successfully loaded into board!");
}
/**
 * render abbreviation in boxes
 */
function renderAbbreviationIcons() {
  document.getElementById('').innerHTML = ``; 
  for(let i = 0; i < this; i++){
    document.getElementById('') += `
    <span class="abbreviationIconsBox">${lorem}</span>
    `; 
  }
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
function taskEditPopup(taskIDused) {
 
  document.getElementById("popup-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("popup-bg").classList.remove("no-opacity");
    document.getElementById("popup-Task").classList.add("popup-slideInTask");
  }, 10);
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].taskID == taskIDused) {
      popupTaskContent = tasks[i];
      console.log(popupTaskContent);
    }
  }
  document.getElementById('taskPopUpContent').innerHTML = `
  <p class="boardBoxCategoryPopup ${popupTaskContent.taskCategory.TaskColor}">${popupTaskContent.taskCategory.Category}</p>
  <h1>${popupTaskContent.taskTitle}</h1>
  <p>${popupTaskContent.taskDescription}</p>

  <div class="popupTaskDateTitle"><b>Due date:</b><id="popupTaskDate">${popupTaskContent.toDueDate}</div></div>
  <div class="popupTaskValue"><b>Priority: </b><div><img style="object-fit: cover;"src="./assets/img/${popupTaskContent.priority}PopUpIcon.png"></div></div>
  <div class="popupTaskContacts">
  <b>Assigned to:</b>
  <div id="popupContactsRender">

  </div>
  `;
  popupRenderContacts();
}

function popupRenderContacts() {
  document.getElementById('popupContactsRender').innerHTML = ``;
  for(let i = 0; i < popupTaskContent.assignedTo.length; i++) {
    document.getElementById('popupContactsRender').innerHTML += `
    <div class="popupContactsCell">
    <div class="contact-pic-Task" style="background-color: ${popupTaskContent.assignedTo[i].paint};">
      <span>${popupTaskContent.assignedTo[i].abbreviation}</span>
    </div>
      <span>${popupTaskContent.assignedTo[i].contactName}</span>
    </div>
    `; 
  }
}
