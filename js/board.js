var currentDraggedElement;
// body onload functions 
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    await downloadFromServer();
    renderTasksinBoard();
}
function renderTasksinBoard() {
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].taskStatus == "todo") {
            document.getElementById("boardTodo").innerHTML = ``;
            document.getElementById("boardTodo").innerHTML += `
            <div class="boxHeader">
            <h2>To do</h2>
            <img class="pointer" src="./assets/img/plus button v1.png" />
            </div>
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
      document.getElementById("boardProgress").innerHTML = ``;
      document.getElementById("boardProgress").innerHTML += `
            <div class="boxHeader">
            <h2>In progress</h2>
            <img class="pointer" src="./assets/img/plus button v1.png" />
            </div>
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
      document.getElementById("boardFeedback").innerHTML = ``;
      document.getElementById("boardFeedback").innerHTML += `
            <div class="boxHeader">
            <h2>Await feedback</h2>
            <img class="pointer" src="./assets/img/plus button v1.png" />
            </div>
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
      document.getElementById("boardDone").innerHTML = ``;
      document.getElementById("boardDone").innerHTML += `
            <div class="boxHeader">
            <h2>Done</h2>
            <img class="pointer" src="./assets/img/plus button v1.png" />
            </div>
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
    console.log("Tasks successfully loaded into board!");
  }
}
function startDraggin(id){
  currentDraggedElement = id - 1;
}
function allowDrop(ev){
  ev.preventDefault();
}
function drop(status) {
  tasks[currentDraggedElement]['taskStatus'] = status;
  renderTasksinBoard();
}