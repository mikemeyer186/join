/**
 * body onload functions
 */
function addTaskOnload() {
  init(3);
  renderSubTask();
  loadTasksfromBackend();
  getSelectedSubtask();
}


/**
 * Push JSON in tasks
 * @param {number} index of status 
 */
async function addTask(value) {
  setTaskStatus(value);
  if(checkingEmptyValues() == true) {
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
      taskStatus: selectedTaskStatus,
    });
    await saveAccountsToBackend();
    await pushTasksinBackend();
    localStorage.setItem("reloadingNewPopup", true);
    window.location.href = "board.html"; // go to board side
  }
}


/**
 * Give task a status
 * @param {number} index of status 
 */
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



/**
 * checking of empty values bevor adding task
 * @returns true // false
 */
function checkingEmptyValues() {
  if(document.getElementById("inputTitle").value == false) {
    document.getElementById('mistakeReportTitle').innerHTML = `Please give it a title!`;
    return false; 
  }
  if(contactCheckedValue == false) {
    document.getElementById('mistakeReportContact').innerHTML = `Please select a contact!`;
    return false;
  }
  if(document.getElementById("selectDate").value == false) {
    document.getElementById('mistakeReportDate').innerHTML = `Please select a date!`;
    return false; 
  }
  if(taskCategoryFinaly == false) {
    document.getElementById('mistakeReportCategory').innerHTML = `Please select a category!`;
    return false; 
  }
  if(prioritySelect == undefined) {
    document.getElementById('mistakeReportImportance').innerHTML = `Please select a urgency!`;
    return false; 
  }
  if(document.getElementById("inputDescription").value == false) {
    document.getElementById('mistakeReportDescription').innerHTML = `Please give it a description!`;
    return false; 
  } else {
    return true;
  }
}


/**
 * Push the tasks in the backend and gives report.
 */
async function pushTasksinBackend() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}


/**
 * Rendering the subtasks checkboxes at the footer 
 */
function renderSubTask() {
  subTasks = JSON.parse(localStorage.getItem("subtasks")) || [];
  document.getElementById("addSubtaskCheckbox").innerHTML = ``;
  for (let i = 0; i < subTasks.length; i++) {
    document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList" id="subtaskValue">  
        <input id="${subTasks[i]}" value="${subTasks[i]}" class="subtaskCheckbox pointer" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
  }
}


/**
 * gettin the checked subtask
 */
function getSelectedSubtask() {
  let subtaskCheckboxes = document.querySelectorAll(".subtaskCheckbox");
  subtaskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        checkedSubtaskValue = event.target.value;
      }
    });
  });
}


/**
 * pushing new subtask in the Localstorage
 */
function pushSubtaskLocalStorage() {
  if (document.getElementById("subtaskText").value) {
    document.getElementById("mistakeReportsubtask").innerHTML = ``;
    subTasks.push(document.getElementById("subtaskText").value);
    document.getElementById("subtaskText").value = ``;
    localStorage.setItem("subtasks", JSON.stringify(subTasks));
    renderSubTask();
  } else {
    document.getElementById("mistakeReportsubtask").innerHTML = `Please enter value!`;
  }
}


/**
 * clear subtask input
 */
function clearSubtask() {
  document.getElementById("subtaskText").value = ``;
}


/**
 * Clear the input / selectors
 */
function taskClear() {
  document.getElementById("inputTitle").value = ``;
  document.getElementById("selectDate").value = ``;
  document.getElementById("inputDescription").value = ``;
  document.getElementById("subtaskText").value = ``;
  renderingContactsSelector();
  renderingTaskCategorySelector();
  window.location.reload();
}


/**
 * delet the contact from the contactCheckedValue
 * @param {string} contactName name of contact
 * @param {string} initiales of name 
 * @param {color} color of user 
 * @param {number} ID of user
 */
function selectedContact(contactName, initiales, color, number) {
  let index = findContactIndex(contactName);

    if (document.getElementById("popup" + number + contactName).classList.contains("checked")) {
      deletContact(index, contactName, number);
    } else {
      addContact(contactName, initiales, color, number);
    }
}


/**
 * getting selected Category 
 * @param {string} category text
 * @param {color} color of category
 */
function selectedCategory(category, color) {
  if (category == "New category") {
    changeInputCategory();
  } else {
    taskCategoryFinaly = category;
    taskCategoryColorFinaly = color;
    document.getElementById("selectorCategory").innerHTML = `
    <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">
    <div class="selected">
    ${category}
    <img src="./assets/img/categoryColors/${color}.png" />
    </div>
    <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
    <div id="selectorCategoryRender">
      <!-- Rendering selector content here -->
    </div>`;
  }
}


/**
 * Add new category color in selector
 * @param {string} color 
 */
function addCategoryColor(value) {
  if (document.getElementById("newCategoryText").value) {
    categorySelectedColor = value;
    document.getElementById("categoryColorCells").innerHTML = ``;
    document.getElementById("categoryColorCells").innerHTML = `
    <img class="thisColor" src="./assets/img/categoryColors/${categorySelectedColor}.png"/>
    `;
    document.getElementById("mistakeReportCategory").innerHTML = ``;
  } else {
    document.getElementById("mistakeReportCategory").innerHTML = `Please enter category first!`;
  }
}


/**
 * Add new category in selector
 */
function addCategory() {
  newCategory = document.getElementById("newCategoryText").value;
  if (categorySelectedColor && newCategory) {
    taskCategorySelector = JSON.parse(localStorage.getItem("taskCategory")) || [];
    taskCategorySelector.push({
      taskCategory: newCategory,
      taskColor: categorySelectedColor,
    });
    localStorage.setItem("taskCategory", JSON.stringify(taskCategorySelector));
    rechangeCategoryInput();
    renderingTaskCategorySelector();
  } else {
    document.getElementById("mistakeReportCategory").innerHTML = `Please select color!`;
  }
}


/**
 * priority change color and gives value
 * @param {number} value of selected priority
 */
function prioritySelected(i) {
  if (i == 1) {
    prioritySelect = "Hard";
    document
      .getElementById("importanceIMGHard")
      .classList.remove("importanceHard");
    document.getElementById("importanceIMGLow").classList.add("importanceLow");
    document.getElementById("importanceIMGMid").classList.add("importanceMid");
    document.getElementById("importanceIMGHard").src ="./assets/img/TaskValueHardSelected.png";
    document.getElementById("importanceIMGMid").src ="./assets/img/TaskValueMid.png";
    document.getElementById("importanceIMGLow").src ="./assets/img/TaskValueLow.png";
  }
  if (i == 2) {
    prioritySelect = "Mid";
    document.getElementById("importanceIMGMid").classList.remove("importanceMid");
    document.getElementById("importanceIMGLow").classList.add("importanceLow");
    document.getElementById("importanceIMGHard").classList.add("importanceHard");
    document.getElementById("importanceIMGHard").src ="./assets/img/TaskValueHard.png";
    document.getElementById("importanceIMGMid").src ="./assets/img/TaskValueMidSelected.png";
    document.getElementById("importanceIMGLow").src ="./assets/img/TaskValueLow.png";
  }
  if (i == 3) {
    prioritySelect = "Low";
    document.getElementById("importanceIMGLow").classList.remove("importanceLow");
    document.getElementById("importanceIMGMid").classList.add("importanceMid");
    document.getElementById("importanceIMGHard").classList.add("importanceHard");
    document.getElementById("importanceIMGHard").src ="./assets/img/TaskValueHard.png";
    document.getElementById("importanceIMGMid").src ="./assets/img/TaskValueMid.png";
    document.getElementById("importanceIMGLow").src ="./assets/img/TaskValueLowSelected.png";
  }
}
