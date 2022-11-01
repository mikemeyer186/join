// muss noch in die main.js 
var selectorCategoryIndex = 0;
var categorySelectedColor; 
var selectedCategoryValue = [];
var taskCategoryFinaly = [];
var taskCategoryColorFinaly = [];
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
  //let selectContact = document.getElementById("selectContact").value;
  let dueDate = document.getElementById("selectDate").value;
  //let selectCategory = document.getElementById("selectCategory").value;
  //let selectColor = document.getElementById().value; 
  let description = document.getElementById("inputDescription").value;
  tasks.push({ 
    taskTitle: taskInputTitle,
    taskDescription: description,
    toDueDate: dueDate,
    taskCategory: 
                        {Category: taskCategoryFinaly, 
                        TaskColor: taskCategoryColorFinaly},
    subTask: checkedSubtaskValue,
    taskID: tasks.length,
    priority: prioritySelect,
    //assignedTo: selectContact,
    taskStatus: "todo"
  });
  userAccounts[activeUser].userTasks.push(tasks.length); // User account get task id
  localStorage.setItem("activeUser", JSON.stringify(userAccounts[activeUser]));
  await pushTasksinBackend();
  window.location.href = "board.html" // go to board side
}
/**
 * Push the tasks in the backend and gives report. 
 */
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
  <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">Select task category <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
  <div id="selectorCategoryRender">
    <!-- Rendering selector content here -->
  </div>`
  renderingTaskCategorySelector();
  }
/**
 * rendering task cateogry´s in selector (Onclick)
 */
function renderingTaskCategorySelector() {
  let staticCategorys = [
    {taskCategory: "New category", taskColor: "grayCategory", cagtegoryID: 0},
    {taskCategory: "Sales", taskColor: "purpleCategory", cagtegoryID: 1},
    {taskCategory: "Backoffice", taskColor: "blueCategory", cagtegoryID: 2}
  ];
  taskCategorySelector = JSON.parse(localStorage.getItem('taskCategory')) || [];
  if(selectorCategoryIndex == 0) {
    document.getElementById('selectorCategoryRender').innerHTML = ``; 
    for(let j = 0; j < staticCategorys.length; j++) {
      document.getElementById('selectorCategoryRender').innerHTML += `
        <div onclick="selectedCategory('${staticCategorys[j].taskCategory}','${staticCategorys[j].taskColor}')" class="selectorCell pointer">
          <div>${staticCategorys[j].taskCategory}</div>
          <div><img src="./assets/img/categoryColors/${staticCategorys[j].taskColor}.png"</div>
        </div>
      `;
    }
    for(let i = 0; i < taskCategorySelector.length; i++) {
      document.getElementById('selectorCategoryRender').innerHTML += `
      <div onclick="selectedCategory('${taskCategorySelector[i].taskCategory}','${taskCategorySelector[i].taskColor}')" class="selectorCell pointer">
      <div class="selectorCellCategory">${taskCategorySelector[i].taskCategory}</div>
      <div class="selectorCellColor"><img src="./assets/img/categoryColors/${taskCategorySelector[i].taskColor}.png"/></div>
      </div>
      `;
    }
    selectorCategoryIndex++;
  } else {
    document.getElementById('selectorCategoryRender').innerHTML = ``; 
    selectorCategoryIndex--; 
  }
}
/**
 * getting selected Category 
 */
function selectedCategory(category, color) {
 if(category == 'New category') {
    changeInputCategory();
  } else {
    taskCategoryFinaly = category; 
    taskCategoryColorFinaly = color; 
    document.getElementById('selectorCategory').innerHTML = `
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
function addCategoryColor(value) {
  console.log('Funktion läuft an!');
  if(document.getElementById('newCategoryText').value) {
    console.log('if abfrage bestanden ');
    categorySelectedColor = value;  
    document.getElementById('categoryColorCells').innerHTML = ``;
    document.getElementById('categoryColorCells').innerHTML = `
    <img class="thisColor" src="./assets/img/categoryColors/${categorySelectedColor}.png"/>
    `;
    document.getElementById('mistakeReportCategory').innerHTML = ``; 
  } else {
    console.log('if abfrage verkackt');
    document.getElementById('mistakeReportCategory').innerHTML = `Please enter category first!`;
  }
}
async function addCategory() {
  newCategory = document.getElementById('newCategoryText').value; 
  if(categorySelectedColor && newCategory) {
  taskCategorySelector = JSON.parse(localStorage.getItem('taskCategory')) || [];
    console.log(taskCategorySelector);
    taskCategorySelector.push({taskCategory: newCategory, taskColor: categorySelectedColor});
    console.log(taskCategorySelector);
    localStorage.setItem('taskCategory', JSON.stringify(taskCategorySelector));
    console.log(JSON.parse(localStorage.getItem('taskCategory')));
    console.log('Neue Category gepusht!');
    rechangeCategoryInput();
    renderingTaskCategorySelector();
  } else {
    document.getElementById('mistakeReportCategory').innerHTML = `Please select color!`;
  }
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
        <i onclick="addCategory()" class="fa-solid fa-check fa-xl pointer"></i>
      </div>
  <input id="newCategoryText" type="text" placeholder="New category name" required>
  <div id="categoryColorCells"style="margin-top: 10px; margin-left: 20px; ">
  <img onclick="addCategoryColor('grayCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/grayCategory.png">
  <img onclick="addCategoryColor('redCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/redCategory.png">
  <img onclick="addCategoryColor('greenCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/greenCategory.png">
  <img onclick="addCategoryColor('orangeCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/orangeCategory.png">
  <img onclick="addCategoryColor('purpleCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/purpleCategory.png">
  <img onclick="addCategoryColor('blueCategory')" class="categoryColor" src="./assets/img/categoryColors/blueCategory.png">
  </div>
  <div id="mistakeReportCategory"></div>
  </div>`;
}
/**
 * priority change color and gives value
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