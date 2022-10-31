/**
 * onload functions
 */
function addTaskOnload() {
  init(3);
  renderSubTask();
  loadTasksfromBackend();
  getSelectedSubtask();
}

/**
 * Push JSON in tasks
 */
async function addTask() {
  let taskInputTitle = document.getElementById("inputTitle").value;
  let selectContact = document.getElementById("selectContact").value;
  let dueDate = document.getElementById("selectDate").value;
  let selectCategory = document.getElementById("selectCategory").value;
  let description = document.getElementById("inputDescription").value;
  tasks.push({
    taskTitle: taskInputTitle,
    taskDescription: description,
    toDueDate: dueDate,
    taskCategory: selectCategory,
    subTask: checkedSubtaskValue,
    taskID: tasks.length,
    priority: prioritySelect,
    assignedTo: selectContact,
    taskStatus: "todo"
  });
  await pushTasksinBackend();
  window.location.href = "board.html"
}

async function pushTasksinBackend() {
  await backend.setItem("tasks", JSON.stringify(tasks));
  console.log('Pushed in backend succes!')
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
        console.log(checkedSubtaskValue);
      }
    });
  });
}
/**
 * pushing new subtask in the Localstorage
 */
function pushSubtaskLocalStorage() {
  subTasks.push(document.getElementById("subtaskText").value);
  document.getElementById('subtaskText').value = ``;
  localStorage.setItem("subtasks", JSON.stringify(subTasks));
  renderSubTask();
}
/**
 * clear subtask input 
 */
function clearSubtask() {
  document.getElementById('subtaskText').value = ``; 
}
/**
 * Clear the input / selectors
 */
function taskClear() {
  document.getElementById("inputTitle").value = ``;
  document.getElementById("selectContact").value = ``;
  document.getElementById("selectDate").value = ``;
  document.getElementById("selectCategory").value = ``;
  document.getElementById("inputDescription").value = ``;
  document.getElementById("subtaskText").value = ``;
  window.location.reload(); 
}
/**
 * rechange the contact input in a selector 
 */
function rechangeContactInput() {
  document.getElementById('selectorContact').innerHTML = `
  <select id="selectContact" class="selectors pointer">
  <option value="" disabled selected>
    Select contacts to assign
  </option>
  <option value="you">You</option>
  <option value="Maximilian Vogel">Maximilian Vogel</option>
  <option value="" onclick="changeInputContact()">
    Invite new contact
  </option>
  </select>`; 
}
/**
 * Change the contact selector in a input field
 */
function changeInputContact() {
  document.getElementById("selectorContact").innerHTML = `
  <div>
  <div class="checkAndCrossIconsEmail">
        <i onclick="rechangeContactInput()" class="fa-solid fa-xmark fa-xl contactX pointer"></i> 
        <img src="./assets/img/icons/trennstrich.png">
        <i onclick="" class=" pointer fa-solid fa-check fa-xl contactCheck"></i>
        </div>
  <input id="selectContact" type="email" placeholder="Contact email" required>
  </div>`;
}
/**
 * rechange the category input
 */
function rechangeCategoryInput() {
  document.getElementById('selectorCategory').innerHTML = `
  <select id="selectCategory" class="selectors pointer">
  <option value="" disabled selected>Select task category</option>
  <option onclick="changeInputCategory(); renderSubTask();" value="newCategory">
    New category
  </option>
  <option value="sales">Sales</option>
  <option value="backoffice">Backoffice</option>
  </select>`;
}
/**
 * Change the Category selector in a input field
 */
function changeInputCategory() {
  document.getElementById("selectorCategory").innerHTML = `
  <div class="inputCategory">
  <div class="checkAndCrossIconsCategory">
        <i onclick="rechangeCategoryInput()" class="fa-solid fa-xmark fa-xl pointer"></i> 
        <img src="./assets/img/icons/trennstrich.png">
        <i onclick="" class="fa-solid fa-check fa-xl pointer"></i>
      </div>
  <input id="newCategoryText" type="text" placeholder="New category name" required>
  <div style="margin-top: 10px; margin-left: 20px; ">
  <img class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/grayCategory.png">
  <img class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/redCategory.png">
  <img class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/greenCategory.png">
  <img class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/orangeCategory.png">
  <img class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/purpleCategory.png">
  <img class="categoryColor" src="./assets/img/categoryColors/blueCategory.png">
  </div>
  </div>`;
}
/**
 * priority change color
 */
function prioritySelected(i) {
  if (i == 1) {
    prioritySelect = "Hard";
    document.getElementById("importanceIMGHard").classList.remove("importanceHard");
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