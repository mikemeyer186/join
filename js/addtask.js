var checkedValue;


/**
 * pulling tasks from backend
 */
async function loadTasksfromBackend() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
}
/**
 * Push JSON in tasks
 */
function addTask() {
  let taskInputTitle = document.getElementById("inputTitle").value;
  let selectContact = document.getElementById("selectContact").value;
  let dueDate = document.getElementById("selectDate").value;
  let selectCategory = document.getElementById("selectCategory").value;
  //let taskImportance = document.getElemenentById('').value;
  //let categoryColor = document.getElementById('').value;
  let selectedSubtask = getSelectedSubtask();
  let description = document.getElementById("inputDescription").value;
  tasks.push({
    taskTitle: taskInputTitle,
    description: description,
    dueDate: dueDate,
    taskCategory: selectCategory,
    subTask: selectedSubtask,
    taskID: tasks.length,
    //categoryColor: categoryColor,
    //priority: taskImportance,
    assignedTo: selectContact,
  });
  //pushTasksinBackend();
}

async function pushTasksinBackend() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}
/**
 * Rendering the subtasks checkboxes at the footer
 */
function renderSubTask() {
  subTasks = JSON.parse(localStorage.getItem("subtasks")) || [];
  if (subTasks == false) {
    document.getElementById("addSubtaskCheckbox").innerHTML += `
            <div class="subtaskList">  
            <input value="subtaskPlaceholder" type="checkbox">
            <p>Subtask1</p>
            </div>`;
  } else {
    document.getElementById("addSubtaskCheckbox").innerHTML = ``;
    for (let i = 0; i < subTasks.length; i++) {
      document.getElementById("addSubtaskCheckbox").innerHTML += `
        <div class="subtaskList" id="subtaskValue">  
        <input id="${subTasks[i]}" value="${subTasks[i]}" class="subtaskCheckbox" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
    }
  }
}

/**
 * gettin the checked subtask
 */
function getSelectedSubtask() {
   let subtaskCheckboxes = document.querySelectorAll('.subtaskCheckbox');
   subtaskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      if(event.target.checked) {
        console.log(event.target.checked);
      } else {
        alert('Bitte Subtask auswählen!');
      }
    })
   })
}

/**
 * pushing new subtask in the Localstorage
 */
function pushSubtaskLocalStorage() {
  subTasks.push(document.getElementById("subtaskText").value);
  localStorage.setItem("subtasks", JSON.stringify(subTasks));
  renderSubTask();
}
/**
 * Clear the input / selectors
 */
function taskClear() {
  document.getElementById("inputTitle").value = ``;
  document.getElementById("selectContact").value = ``;
  document.getElementById("selectDate").value = ``;
  document.getElementById("selectCategory").value = ``;
  //document.getElemenentById('').value;
  //document.getElementById('').value;
  //document.getElementById('').value;
  document.getElementById("inputDescription").value = ``;
}
/**
 * Change the contact selector in a input field
 */
function changeInputContact() {
  document.getElementById("selectorContact").innerHTML = `
  <input id="newContactText" type="text" placeholder="Contact email">`;
}
/**
 * Change the Category selector in a input field
 */
function changeInputCategory() {
  document.getElementById("selectorCategory").innerHTML = `
  <div class="inputCategory">
  <img class="checkSelector" src="./assets/img/checkedIconSelector.png">
  <input id="newCategoryText" type="text" placeholder="New category name">
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
    document
      .getElementById("importanceIMGHard")
      .classList.remove("importanceHard");
    document.getElementById("importanceIMGLow").classList.add("importanceLow");
    document.getElementById("importanceIMGMid").classList.add("importanceMid");
    document.getElementById("importanceIMGHard").src =
      "./assets/img/TaskValueHardSelected.png";
    document.getElementById("importanceIMGMid").src =
      "./assets/img/TaskValueMid.png";
    document.getElementById("importanceIMGLow").src =
      "./assets/img/TaskValueLow.png";
  }
  if (i == 2) {
    document
      .getElementById("importanceIMGMid")
      .classList.remove("importanceMid");
    document.getElementById("importanceIMGLow").classList.add("importanceLow");
    document
      .getElementById("importanceIMGHard")
      .classList.add("importanceHard");
    document.getElementById("importanceIMGHard").src =
      "./assets/img/TaskValueHard.png";
    document.getElementById("importanceIMGMid").src =
      "./assets/img/TaskValueMidSelected.png";
    document.getElementById("importanceIMGLow").src =
      "./assets/img/TaskValueLow.png";
  }
  if (i == 3) {
    document
      .getElementById("importanceIMGLow")
      .classList.remove("importanceLow");
    document.getElementById("importanceIMGMid").classList.add("importanceMid");
    document
      .getElementById("importanceIMGHard")
      .classList.add("importanceHard");
    document.getElementById("importanceIMGHard").src =
      "./assets/img/TaskValueHard.png";
    document.getElementById("importanceIMGMid").src =
      "./assets/img/TaskValueMid.png";
    document.getElementById("importanceIMGLow").src =
      "./assets/img/TaskValueLowSelected.png";
  }
}
