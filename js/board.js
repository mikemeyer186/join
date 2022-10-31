var currentDraggedElement;
// body onload functions 
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    await downloadFromServer();
    renderTasksinBoard();
}
function renderTasksinBoard() {
  document.getElementById("boardTodoContent").innerHTML = ``;
  document.getElementById("boardProgressContent").innerHTML = ``;
  document.getElementById("boardFeedbackContent").innerHTML = ``;
  document.getElementById("boardDoneContent").innerHTML = ``;
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].taskStatus == "todo") {
            document.getElementById("boardTodoContent").innerHTML += `
            <div draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox">
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks[i].taskCategory}</p>
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
            <div draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox">
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks[i].taskCategory}</p>
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
            <div draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox">
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks[i].taskCategory}</p>
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
            <div draggable="true" ondragstart="startDraggin(${tasks[i].taskID})" class="boardBox">
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks[i].taskCategory}</p>
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
function startDraggin(id){
  currentDraggedElement = id;
}
function allowDrop(ev){
  ev.preventDefault();
}
async function drop(status) {
  tasks[currentDraggedElement]['taskStatus'] = status;
  renderTasksinBoard();
}

/**
 * showing popup "Add task"
 */
 function addTaskPopup() {
  document.getElementById('popup-bg').classList.remove('d-none');

  setTimeout(() => {
      document.getElementById('popup-addTask').classList.add('popup-slideIn');
      document.getElementById('popup-bg').classList.remove('no-opacity');
  }, 10);
}
/**
 * hiding popup "new contact"
 */
 function hideNewContactPopUp() {
  document.getElementById('popup-addTask').classList.remove('popup-slideIn');
  document.getElementById('popup-bg').classList.add('no-opacity');

  setTimeout(() => {
      document.getElementById('popup-bg').classList.add('d-none');
  }, 250);
}

