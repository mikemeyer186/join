let idInLength = -1;

// body onload functions
async function boardOnload() {
  await init(2);
  await loadTasksfromBackend();
  await downloadFromServer();
  renderTasksinBoard();
}

/** Find the right ID in userTasksArray */
function findLength(ident) {
  idInLength = -1;
  for (let i = 0; userTasksArray.length; i++) {
    idInLength++;
    if (userTasksArray[i].taskID == ident) {
      break;
    }
  }
}

/** search and save the dragged element */
function startDraggin(id) {
  currentDraggedElement = -1;
  for (let i = 0; userTasksArray.length; i++) {
    currentDraggedElement++;
    if (userTasksArray[i].taskID == id) {
      break;
    }
  }
}

/** Allows the drop in this area */
function allowDrop(ev) {
  ev.preventDefault();
}

/** Task status change by dropping */
async function drop(status) {
  userTasksArray[currentDraggedElement]["taskStatus"] = status;
  renderTasksinBoard();
  addUsertaskInTask();
}

/** Push JSON in tasks from board */
async function addTaskBoard(i) {
  findLength(i);
  let indet = idInLength;
  contactCheckedValue = userTasksArray[indet].assignedTo;
  let taskInputTitle = document.getElementById("inputTitleEdit").value;
  let dueDate = document.getElementById("selectDateEdit").value;
  let description = document.getElementById("inputDescriptionEdit").value;
  userTasksArray[indet].taskTitle = taskInputTitle;
  userTasksArray[indet].taskDescription = description;
  userTasksArray[indet].toDueDate = dueDate;
  userTasksArray[indet].priority = prioritySelect;
  userTasksArray[indet].assignedTo = contactCheckedValue;
  await addUsertaskInTask();
  window.location.reload();
}

/** Add usertask in task array */
async function addUsertaskInTask() {
  for (let i = 0; i < userTasksArray.length; i++) {
    let task = userTasksArray[i].taskID;
    tasks[task] = userTasksArray[i];
  }
  await pushTasksinBackend();
}

/** Selected priority task for Popup */
function prioritySelectedEdit(i) {
  if (i == "Hard") {
    prioritySelect = "Hard";
    document
      .getElementById("importanceEditIMGHard")
      .classList.remove("importanceHard");
    document
      .getElementById("importanceEditIMGLow")
      .classList.add("importanceLow");
    document
      .getElementById("importanceEditIMGMid")
      .classList.add("importanceMid");
    document.getElementById("importanceEditIMGHard").src =
      "./assets/img/TaskValueHardSelected.png";
    document.getElementById("importanceEditIMGMid").src =
      "./assets/img/TaskValueMid.png";
    document.getElementById("importanceEditIMGLow").src =
      "./assets/img/TaskValueLow.png";
  }
  if (i == "Mid") {
    prioritySelect = "Mid";
    document
      .getElementById("importanceEditIMGMid")
      .classList.remove("importanceMid");
    document
      .getElementById("importanceEditIMGLow")
      .classList.add("importanceLow");
    document
      .getElementById("importanceEditIMGHard")
      .classList.add("importanceHard");
    document.getElementById("importanceEditIMGHard").src =
      "./assets/img/TaskValueHard.png";
    document.getElementById("importanceEditIMGMid").src =
      "./assets/img/TaskValueMidSelected.png";
    document.getElementById("importanceEditIMGLow").src =
      "./assets/img/TaskValueLow.png";
  }
  if (i == "Low") {
    prioritySelect = "Low";
    document
      .getElementById("importanceEditIMGLow")
      .classList.remove("importanceLow");
    document
      .getElementById("importanceEditIMGMid")
      .classList.add("importanceMid");
    document
      .getElementById("importanceEditIMGHard")
      .classList.add("importanceHard");
    document.getElementById("importanceEditIMGHard").src =
      "./assets/img/TaskValueHard.png";
    document.getElementById("importanceEditIMGMid").src =
      "./assets/img/TaskValueMid.png";
    document.getElementById("importanceEditIMGLow").src =
      "./assets/img/TaskValueLowSelected.png";
  }
}
/** Find used contacts */
function findContact(index, name) {
  for (let i = 0; i < contactCheckedValue.length; i++) {
    if (contactCheckedValue[i].contactName == name) {
      return true;
    }
  }
}

/** Save selected contactsPopup */
function selectedContactPopup(name, initiales, color, number) {
  if (document.getElementById("popup" + number + name).classList == "checked") {
    let index = -1;
    contactCheckedValue.find(function (name, i) {
      if (contactCheckedValue.name === name) {
        index = i;
      }
    });
    contactCheckedValue.splice(index, 1);
    document
      .getElementById("popup" + number + name)
      .classList.remove("checked");
    document.getElementById("popup" + number + name).src =
      "./assets/img/icons/checkButton.png";
    console.log(contactCheckedValue);
  } else {
    contactCheckedValue.push({
      contactName: name,
      abbreviation: initiales,
      paint: color,
    });
    console.log(contactCheckedValue);
    document.getElementById("popup" + number + name).src =
      "./assets/img/icons/checkButtonChecked.png";
    document.getElementById("popup" + number + name).classList.add("checked");
  }
}

/** Save new Task with other start status */
async function addTaskBoardStatus(value) {
  if (value == 1) {
    let taskInputTitle = document.getElementById("inputTitle").value;
    let dueDate = document.getElementById("selectDate").value;
    let description = document.getElementById("inputDescription").value;
    userAccounts[activeUser].userTasks.push(tasks.length); // User account get task id
    tasks.push({
      taskTitle: taskInputTitle,
      taskDescription: description,
      toDueDate: dueDate,
      taskCategory: {
        Category: taskCategoryFinaly,
        TaskColor: taskCategoryColorFinaly,
      },
      subTask: checkedSubtaskValue,
      taskID: tasks.length,
      priority: prioritySelect,
      assignedTo: contactCheckedValue,
      taskStatus: "progress",
    });
    await saveAccountsToBackend();
    await pushTasksinBackend();
    window.location.reload();
  }
  if (value == 2) {
    let taskInputTitle = document.getElementById("inputTitle").value;
    let dueDate = document.getElementById("selectDate").value;
    let description = document.getElementById("inputDescription").value;
    userAccounts[activeUser].userTasks.push(tasks.length); // User account get task id
    tasks.push({
      taskTitle: taskInputTitle,
      taskDescription: description,
      toDueDate: dueDate,
      taskCategory: {
        Category: taskCategoryFinaly,
        TaskColor: taskCategoryColorFinaly,
      },
      subTask: checkedSubtaskValue,
      taskID: tasks.length,
      priority: prioritySelect,
      assignedTo: contactCheckedValue,
      taskStatus: "feedback",
    });
    await saveAccountsToBackend();
    await pushTasksinBackend();
    window.location.reload();
  }
  if (value == 3) {
    let taskInputTitle = document.getElementById("inputTitle").value;
    let dueDate = document.getElementById("selectDate").value;
    let description = document.getElementById("inputDescription").value;
    userAccounts[activeUser].userTasks.push(tasks.length); // User account get task id
    tasks.push({
      taskTitle: taskInputTitle,
      taskDescription: description,
      toDueDate: dueDate,
      taskCategory: {
        Category: taskCategoryFinaly,
        TaskColor: taskCategoryColorFinaly,
      },
      subTask: checkedSubtaskValue,
      taskID: tasks.length,
      priority: prioritySelect,
      assignedTo: contactCheckedValue,
      taskStatus: "done",
    });
    await saveAccountsToBackend();
    await pushTasksinBackend();
    window.location.reload();
  } else {
    addTask();
  }
}

/**! RENDERINGS !*/

/** This function is rendering the task boxes in the board */
function renderTasksinBoard() {
  userTasksArray = [];
  let userTasksIds = userAccounts[activeUser].userTasks;
  if (userTasksIds.length > 0) {
    for (let i = 0; i < userTasksIds.length; i++) {
      const taskId = userTasksIds[i];
      userTasksArray.push(tasks[taskId]);
    }
  }
  document.getElementById("boardTodoContent").innerHTML = ``;
  document.getElementById("boardProgressContent").innerHTML = ``;
  document.getElementById("boardFeedbackContent").innerHTML = ``;
  document.getElementById("boardDoneContent").innerHTML = ``;
  for (let i = 0; i < userTasksArray.length; i++) {
    if (userTasksArray[i].taskStatus == "todo") {
      document.getElementById("boardTodoContent").innerHTML += `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${userTasksArray[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div id="${userTasksArray[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${userTasksArray[i].priority}.png" />
      </div>
    </div>`;
      renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
    }
    if (userTasksArray[i].taskStatus == "progress") {
      document.getElementById("boardProgressContent").innerHTML += `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${userTasksArray[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div id="${userTasksArray[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${userTasksArray[i].priority}.png" />
      </div>
    </div>`;
      renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
    }
    if (userTasksArray[i].taskStatus == "feedback") {
      document.getElementById("boardFeedbackContent").innerHTML += `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${userTasksArray[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div id="${userTasksArray[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${userTasksArray[i].priority}.png" />
      </div>
    </div>`;
      renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
    }
    if (userTasksArray[i].taskStatus == "done") {
      document.getElementById("boardDoneContent").innerHTML += `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer">
      <div class="boardBoxContent">
      <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
      <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
      <p class="boardBoxDescription">
        ${userTasksArray[i].taskDescription}
      </p>
      <div class="boardBoxFooter">
        <div id="${userTasksArray[i].taskID}" class="boxContacts">
          </div>
        <img src="./assets/img/icon${userTasksArray[i].priority}.png" />
      </div>
    </div>`;
      renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
    }
  }
  console.log("Tasks successfully loaded into board!");
}

/** Rendering the abbrevaition in the boxes */
function renderAbbrevaitionInBox(ident, b) {
  document.getElementById(ident).innerHTM = ``;
  if (userTasksArray[b].assignedTo.length > 3) {
    for (let i = 0; i < 2; i++) {
      document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox${
      i + 1
    }" style="background-color: ${userTasksArray[b].assignedTo[i].paint}">${
        userTasksArray[b].assignedTo[i].abbreviation
      }</div>`;
    }
    document.getElementById(ident).innerHTML += `
  <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${
    userTasksArray[b].assignedTo[2].paint
  }">+${userTasksArray[b].assignedTo.length - 2}</div>`;
  }
  if (userTasksArray[b].assignedTo.length == 3) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${userTasksArray[b].assignedTo[0].paint}">${userTasksArray[b].assignedTo[0].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox2" style="background-color: ${userTasksArray[b].assignedTo[1].paint}">${userTasksArray[b].assignedTo[1].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${userTasksArray[b].assignedTo[2].paint}">${userTasksArray[b].assignedTo[2].abbreviation}</div>
    `;
  }
  if (userTasksArray[b].assignedTo.length == 2) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${userTasksArray[b].assignedTo[0].paint}">${userTasksArray[b].assignedTo[0].abbreviation}</div>
    <div class="abbreviationIconsBox" id="abbreviationIconsBox2" style="background-color: ${userTasksArray[b].assignedTo[1].paint}">${userTasksArray[b].assignedTo[1].abbreviation}</div>`;
  }
  if (userTasksArray[b].assignedTo.length == 1) {
    document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox1" style="background-color: ${userTasksArray[b].assignedTo[0].paint}">${userTasksArray[b].assignedTo[0].abbreviation}</div>`;
  }
}

/** Rendering contacts in addTask Popup at board */
function renderingContactsSelectorPopup(index) {
  let activeUserContacts = userAccounts[activeUser].userContacts;
  if (selectorContactIndex == 0) {
    document.getElementById("selectorContactRenderPopup").innerHTML = ``;
    for (let i = 0; i < activeUserContacts.length; i++) {
      if (
        findContact(
          index,
          userAccounts[activeUser].userContacts[i].contactName
        ) === true
      ) {
        document.getElementById("selectorContactRenderPopup").innerHTML += `
        <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
          <nobr>${activeUserContacts[i].contactName}</nobr>
          <div id="contactSelectorCheckboxes">
          <img id="popup${i}${activeUserContacts[i].contactName}" class="checked" src="./assets/img/icons/checkButtonChecked.png">
        </div>
        </div>
      `;
      } else {
        document.getElementById("selectorContactRenderPopup").innerHTML += `
        <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
          <nobr>${activeUserContacts[i].contactName}</nobr>
          <div id="contactSelectorCheckboxes">
          <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
        </div>
        </div>
      `;
      }
    }
    document.getElementById("selectorContactRenderPopup").innerHTML += `
        <div onclick="changeInputContact()" class="selectorCellContact">
          <nobr>Invite new contact</nobr>
          <div id="contactSelectorCheckboxes">
          <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
        </div>
        </div>`;
    selectorContactIndex++;
  } else {
    findLength(index);
    userTasksArray[idInLength].assignedTo = contactCheckedValue;
    document.getElementById("selectorContactRenderPopup").innerHTML = ``;
    selectorContactIndex--;
  }
}

/** Rendering contacts in footer of the Task Pupup */
function popupRenderContacts() {
  document.getElementById("popupContactsRender").innerHTML = ``;
  for (let i = 0; i < popupTaskContent.assignedTo.length; i++) {
    document.getElementById("popupContactsRender").innerHTML += `
    <div class="popupContactsCell">
    <div class="contact-pic-Task" style="background-color: ${popupTaskContent.assignedTo[i].paint};">
      <span>${popupTaskContent.assignedTo[i].abbreviation}</span>
    </div>
      <span>${popupTaskContent.assignedTo[i].contactName}</span>
    </div>
    `;
  }
}

/**! TEMPLATES !*/

/** Template popup Add task */
async function addTaskPopup(value) {
  let taskStatusValue = value;
  document.getElementById("popup-bg").classList.remove("d-none");
  document.getElementById("popup-addTask").classList.remove("d-none");
  setTimeout(() => {
    document
      .getElementById("popup-addTask")
      .classList.add("popup-slideInAddTask");
    document.getElementById("popup-bg").classList.remove("no-opacity");
  }, 10);
  document.getElementById("addTaskButtonValue").innerHTML = `
  <h1>Add Task</h1>
  <button class="buttonCreate pointer" onclick="addTaskBoardStatus(${taskStatusValue})">Create Task ✓</button>`;
}

/** Template the addTask Popup */
function showAddTaskPopup(value) {
  if (window.innerWidth < 800) {
    document.getElementById("addTaskPopup").classList.toggle("translate0");
    document.getElementById("header-mobile-addTask").classList.toggle("d-none");
  } else {
    addTaskPopup(value);
  }
}

/** Template the edit Popup */
function editPopupTask(ident) {
  findLength(ident);
  let indet = idInLength;
  for (let i = 0; i < userTasksArray.length; i++) {
    if (userTasksArray[i].taskID == ident) {
      popupTaskContent = userTasksArray[i];
    }
  }
  document.getElementById("taskPopUpContent").innerHTML = `
  <form>
        <input
          value="${popupTaskContent.taskTitle}"
          id="inputTitleEdit"
          type="text"
          placeholder="Enter a title"
          required
        />
        <h3>Description</h3>
        <input
          value="${popupTaskContent.taskDescription}"
          id="inputDescriptionEdit"
          type="text"
          placeholder="Enter a Description"
          required
        />
        <h3 style="margin-bottom: 10px;">Due date</h3>
        <i onclick="showDatePopUp()" class="fa-regular fa-calendar-minus fa-xl pointer"></i>
        <input
          id="selectDateEdit"
          type="text"
          value="${popupTaskContent.toDueDate}"
          placeholder="dd/mm/yyyy"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          required
        />
        <div style="margin-top: 30px;" id="importanceLvlEdit">
          <img
            class="importanceHard"
            id="importanceEditIMGHard"
            value="taskHard"
            onclick="prioritySelectedEdit('Hard')"
            src="./assets/img/TaskValueHard.png"
          />
          <img
            class="importanceMid"
            id="importanceEditIMGMid"
            value="taskMid"
            onclick="prioritySelectedEdit('Mid')"
            src="./assets/img/TaskValueMid.png"
          />
          <img
            class="importanceLow"
            id="importanceEditIMGLow"
            value="taskLow"
            onclick="prioritySelectedEdit('Low')"
            src="./assets/img/TaskValueLow.png"
          />
          </div>
          <h3>Assigned to</h3>
          <div id="selectorContactPopup">
            <div onclick="renderingContactsSelectorPopup(${popupTaskContent.taskID})" class="selectorHeader pointer">
              Select contacts to assign 
              <img class="selectorArrow" src="./assets/img/selectorArrow.png">
            </div>
            <div class="selectorPupupContacts" id="selectorContactRenderPopup">
              <!-- renderzone for contact selctor -->
            </div>
          </div>
          <img class="okButton pointer" onclick="addTaskBoard(${popupTaskContent.taskID});" src="./assets/img/okButton.png">
    </form>
  `;
  prioritySelectedEdit(popupTaskContent.priority);
}

/** Hiding the template of popup add Task */
function hidePopUps() {
  document
    .getElementById("popup-addTask")
    .classList.remove("popup-slideInAddTask");
  document.getElementById("popup-Task").classList.remove("popup-slideInTask");
  document.getElementById("popup-bg").classList.add("no-opacity");
  setTimeout(() => {
    document.getElementById("popup-addTask").classList.add("d-none");
    document.getElementById("popup-Task").classList.add("d-none");
    document.getElementById("popup-bg").classList.add("d-none");
  }, 250);
}

/* Template popup from task */
function taskEditPopup(taskIDused) {
  document.getElementById("popup-Task").classList.remove("d-none");
  document.getElementById("popup-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("popup-bg").classList.remove("no-opacity");
    document.getElementById("popup-Task").classList.add("popup-slideInTask");
  }, 10);
  for (let i = 0; i < userTasksArray.length; i++) {
    if (userTasksArray[i].taskID == taskIDused) {
      popupTaskContent = userTasksArray[i];
    }
  }
  document.getElementById("taskPopUpContent").innerHTML = `
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