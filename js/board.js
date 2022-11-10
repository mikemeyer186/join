let idInLength = -1;


// body onload functions
async function boardOnload() {
  await init(2);
  await loadTasksfromBackend();
  await downloadFromServer();
  renderTasksinBoard();
  checkReload();
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
    document.getElementById("importanceEditIMGHard").classList.remove("importanceHard");
    document.getElementById("importanceEditIMGLow").classList.add("importanceLow");
    document.getElementById("importanceEditIMGMid").classList.add("importanceMid");
    document.getElementById("importanceEditIMGHard").src ="./assets/img/TaskValueHardSelected.png";
    document.getElementById("importanceEditIMGMid").src ="./assets/img/TaskValueMid.png";
    document.getElementById("importanceEditIMGLow").src ="./assets/img/TaskValueLow.png";
  }
  if (i == "Mid") {
    prioritySelect = "Mid";
    document.getElementById("importanceEditIMGMid").classList.remove("importanceMid");
    document.getElementById("importanceEditIMGLow").classList.add("importanceLow");
    document.getElementById("importanceEditIMGHard").classList.add("importanceHard");
    document.getElementById("importanceEditIMGHard").src ="./assets/img/TaskValueHard.png";
    document.getElementById("importanceEditIMGMid").src ="./assets/img/TaskValueMidSelected.png";
    document.getElementById("importanceEditIMGLow").src ="./assets/img/TaskValueLow.png";
  }
  if (i == "Low") {
    prioritySelect = "Low";
    document.getElementById("importanceEditIMGLow").classList.remove("importanceLow");
    document.getElementById("importanceEditIMGMid").classList.add("importanceMid");
    document.getElementById("importanceEditIMGHard").classList.add("importanceHard");
    document.getElementById("importanceEditIMGHard").src ="./assets/img/TaskValueHard.png";
    document.getElementById("importanceEditIMGMid").src ="./assets/img/TaskValueMid.png";
    document.getElementById("importanceEditIMGLow").src ="./assets/img/TaskValueLowSelected.png";
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


/** Give task a status */
function setTaskStatus(value){
  if (value == 1) {
    selectedTaskStatus = "progress";
  }
  if (value == 2) {
    selectedTaskStatus = "feedback";
  }
  if (value == 3) {
    selectedTaskStatus = "done";
  }
  if (value == 4) {
    selectedTaskStatus = "todo";
  }
}

/** get popup content */
function getPopupContent(taskIDused) {
  for (let i = 0; i < userTasksArray.length; i++) {
    if (userTasksArray[i].taskID == taskIDused) {
      popupTaskContent = userTasksArray[i];
    }
  }
}


/** Push JSON in tasks from board */
async function pushEditTask(i) {
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
  localStorage.setItem("reloadingEditPopup", true);
  window.location.reload();
}

/**
 * filling usertasksArray with original tasks
 */
function fillUserTasksFromTasks() {
  userTasksArray = [];
  let userTasksIds = userAccounts[activeUser].userTasks;
  if (userTasksIds.length > 0) {
    for (let i = 0; i < userTasksIds.length; i++) {
      let taskId = userTasksIds[i];
      userTasksArray.push(tasks[taskId]);
    }
  }
}

/**
 * searching for tasks in board
 */
 function searchTasksInBoard() {
  let search = document.getElementById('searchInput');
  search = search.value.toLowerCase().trim();
  fillUserTasksFromTasks();

  if (!search) {
      renderTasksinBoard();
  } else {
      let searchResult = userTasksArray.filter((e) => e.taskTitle.toLowerCase().includes(search));
      renderTasksinBoard(searchResult);
  }
}