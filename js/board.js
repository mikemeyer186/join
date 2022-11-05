// body onload functions
async function boardOnload() {
  await init(2);
  await loadTasksfromBackend();
  await downloadFromServer();
  renderTasksinBoard();
  console.log(userAccounts[activeUser].userTasks);
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
        <div id="${tasks[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    renderAbbrevaitionInBox(tasks[i].taskID, i);
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
          </div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    renderAbbrevaitionInBox(tasks[i].taskID, i);
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
        <div id="${tasks[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    renderAbbrevaitionInBox(tasks[i].taskID, i);
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
        <div id="${tasks[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${tasks[i].priority}.png" />
      </div>
    </div>`;
    renderAbbrevaitionInBox(tasks[i].taskID, i);
    }
  }
  console.log("Tasks successfully loaded into board!");
}
/** 
 * Rendering the abbrevaition in the boxes 
 */
function renderAbbrevaitionInBox(ident, b){
  document.getElementById(ident).innerHTM = ``;
  if(tasks[b].assignedTo.length > 3) { 
  for(let i = 0; i < 2; i++){
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox${i + 1}" style="background-color: ${tasks[b].assignedTo[i].paint}">${tasks[b].assignedTo[i].abbreviation}</div>`;
  }
  document.getElementById(ident).innerHTML += `
  <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${tasks[b].assignedTo[2].paint}">+${tasks[b].assignedTo.length - 2}</div>`;
}
if(tasks[b].assignedTo.length == 3) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${tasks[b].assignedTo[0].paint}">${tasks[b].assignedTo[0].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox2" style="background-color: ${tasks[b].assignedTo[1].paint}">${tasks[b].assignedTo[1].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${tasks[b].assignedTo[2].paint}">${tasks[b].assignedTo[2].abbreviation}</div>
    `;
}
if(tasks[b].assignedTo.length == 2) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${tasks[b].assignedTo[0].paint}">${tasks[b].assignedTo[0].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox2" style="background-color: ${tasks[b].assignedTo[1].paint}">${tasks[b].assignedTo[1].abbreviation}</div>`;
}
if(tasks[b].assignedTo.length == 1) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${tasks[b].assignedTo[0].paint}">${tasks[b].assignedTo[0].abbreviation}</div>`;
}
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
    document.getElementById("popup-Task").classList.add("d-none");
    document.getElementById("popup-bg").classList.add("d-none");
  }, 250);
}
/**
 * showing popup from task // Comeback
 */
function taskEditPopup(taskIDused) {
  document.getElementById("popup-Task").classList.remove("d-none");
  document.getElementById("popup-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("popup-bg").classList.remove("no-opacity");
    document.getElementById("popup-Task").classList.add("popup-slideInTask");
  }, 10);
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].taskID == taskIDused) {
      popupTaskContent = tasks[i];
    }
  }
  document.getElementById('taskPopUpContent').innerHTML = `
  <p class="boardBoxCategoryPopup ${popupTaskContent.taskCategory.TaskColor}">${popupTaskContent.taskCategory.Category}</p>
  <h1>${popupTaskContent.taskTitle}</h1>
  <p>${popupTaskContent.taskDescription}</p>
  <div class="popupTaskDateTitle">
    <b>Due date:</b><id="popupTaskDate">
    ${popupTaskContent.toDueDate}
  </div>
  <div class="popupTaskValue">
    <b>Priority: </b>
    <div>
      <img style="object-fit: cover;"src="./assets/img/${popupTaskContent.priority}PopUpIcon.png">
    </div>
  </div>
  <div class="popupTaskContacts">
    <b>Assigned to:</b>
    <div id="popupContactsRender">
    </div>
  </div>
  <div class="popup-addTask-top"></div>
    <img
      onclick="editPopupTask(${popupTaskContent.taskID})"
      class="editButton pointer"
      src="./assets/img/editButton.png"
    />
  </div>
  `;
  popupRenderContacts();
}
function editPopupTask(ident) {
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].taskID == ident) {
      popupTaskContent = tasks[i];
    }
  }
  document.getElementById('taskPopUpContent').innerHTML = `
  <form>
        <input
          value="${popupTaskContent.taskTitle}"
          id="inputTitle"
          type="text"
          placeholder="Enter a title"
          required
        />
        <h3>Description</h3>
        <input
          value="${popupTaskContent.taskDescription}"
          id="inputDescription"
          type="text"
          placeholder="Enter a Description"
          required
        />
        <h3 style="margin-bottom: 10px;">Due date</h3>
        <i onclick="showDatePopUp()" class="fa-regular fa-calendar-minus fa-xl pointer"></i>
        <input
          id="selectDate"
          type="text"
          value="${popupTaskContent.toDueDate}"
          placeholder="dd/mm/yyyy"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          required
        />
        <div style="margin-top: 30px;" id="importanceLvl">
          <img
            class="importanceHard"
            id="importanceIMGHard"
            value="taskHard"
            onclick="prioritySelected(1)"
            src="./assets/img/TaskValueHard.png"
          />
          <img
            class="importanceMid"
            id="importanceIMGMid"
            value="taskMid"
            onclick="prioritySelected(2)"
            src="./assets/img/TaskValueMid.png"
          />
          <img
            class="importanceLow"
            id="importanceIMGLow"
            value="taskLow"
            onclick="prioritySelected(3)"
            src="./assets/img/TaskValueLow.png"
          />
          </div>
          <h3>Assigned to</h3>
          <div id="selectorContact">
            <div onclick="renderingContactsSelector()" class="selectorHeader pointer">
              Select contacts to assign 
              <img class="selectorArrow" src="./assets/img/selectorArrow.png">
            </div>
            <div class="selectorPupupContacts" id="selectorContactRender">
              <!-- renderzone for contact selctor -->
            </div>
          </div>
          <img class="okButton" src="./assets/img/okButton.png">
    </form>
  `;
}
/**
 * rendering contacts in footer of the Task Pupup
 */
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
