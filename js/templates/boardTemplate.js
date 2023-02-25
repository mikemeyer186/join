/**
 * template for task cards
 * @param {number} i - index of iteration
 * @returns - html-template
 */
function taskCardTemplate(i, process) {
    return /*html*/ `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer" title="${userTasksArray[i].taskTitle}">
        <div class="boardBoxContent">
          <div class="boardBoxContent-top">
            <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
            <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
            <p class="boardBoxDescription">${userTasksArray[i].taskDescription}</p>
            <div class="boardBoxProcessContainer">
              <div class="boardBoxProcess">
                <div class="boardBoxProcessBar" style="width: ${process.percentage}%"></div>
              </div>
              <div class="boardBoxProcessText">
                <span>${process.done}/${process.sum} done</span>
              </div>
            </div>
          </div>
          <div class="boardBoxFooter">
            <div id="${userTasksArray[i].taskID}" class="boxContacts"></div>
            <img src="./assets/img/icon${userTasksArray[i].priority}.png" />
          </div>
        </div>
      </div>
    `;
}

/**
 * template for abbreviation of assigned contacts in task card
 * @param {number} i - iteration of user tasks
 * @param {number} contactId - index of contact
 * @returns - html-template
 */
function abbreviationTaskTemplate(i, contactId) {
    return /*html*/ `
      <div class="abbreviationIconsBox" id="abbreviationIconsBox${contactId + 1}" style="background-color: ${
        userTasksArray[i].assignedTo[contactId].paint
    }">${userTasksArray[i].assignedTo[contactId].abbreviation}</div>
    `;
}

/**
 * template for abbreviation of assigned contacts in task card if more than 3 contacts assigned
 * @param {number} i - iteration of user tasks
 * @returns - html-template
 */
function abbreviationTaskTemplateMore(i) {
    return /*html*/ `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${userTasksArray[i].assignedTo[2].paint}">+${
        userTasksArray[i].assignedTo.length - 2
    }</div>
  `;
}

/**
 * template for task edit popup
 * @returns - html-template
 */
function taskEditTemplate() {
    return /*html*/ `
      <div>
        <p class="boardBoxCategoryPopup ${popupTaskContent.taskCategory.TaskColor}">${popupTaskContent.taskCategory.Category}</p>
        <h1>${popupTaskContent.taskTitle}</h1>
        <p>${popupTaskContent.taskDescription}</p>
        <div class="popupTaskDateTitle">
          <b>Due date:</b><span id="popupTaskDate">${popupTaskContent.toDueDate}</span>
        </div>
        <div class="popupTaskValue">
          <b>Priority: </b>
          <div>
            <img style="object-fit: cover;" src="./assets/img/${popupTaskContent.priority}PopUpIcon.png">
          </div>
        </div>
        <div class="popupSubtasks">
          <b>Subtasks:</b>
          <div id="popupSubtasksRender"></div>
        </div>
        <div class="popupTaskContacts">
          <b>Assigned to:</b>
          <div id="popupContactsRender"></div>
        </div>
      </div>
    `;
}

/**
 * template for assigned contacts task popup
 * @param {*} i - iteration of assigned contacts
 * @returns - html-template
 */
function taskEditContactsTemplate(i) {
    return /*html*/ `
      <div class="popupContactsCell">
        <div class="contact-pic-Task" style="background-color: ${popupTaskContent.assignedTo[i].paint};">
          <span>${popupTaskContent.assignedTo[i].abbreviation}</span>
        </div>
        <span>${popupTaskContent.assignedTo[i].contactName}</span>
      </div>
    `;
}

/**
 * template for subtasks in task popup
 * @param {number} i - iteration of subtask array
 * @param {string} box - checked or unchecked
 * @returns - html-template
 */
function taskEditSubtaskTemplate(i, value, box) {
    return /*html*/ `
      <div class="subtaskList">
        <div class="subtaskList-task" onclick="taskEditCheckSubTask(${i})">
          <input id="checkbox${i}" class="subtaskCheckbox pointer" type="checkbox" onchange="taskEditCheckSubTask(${i})" ${box}>
          <p class="subtaskList-text">${value}</p>
        </div> 
        <span class="subtaskList-delete" title="delete subtask" onclick="taskDeleteSubTask(${i})">delete</span>
      </div>
  `;
}

/**
 * template for edit-task popup
 * @param {string} priorityPaths - addition for image path of priority-button
 * @returns - html-template
 */
function editTaskPopUpTemplate(priorityPaths) {
    return /*html*/ `
    <form class="formAddtaskPopup">

      <div class="formGroup">
        <input value="${popupTaskContent.taskTitle}" id="inputTitle" type="text" placeholder="Enter a title" required>
        <div id="mistakeReportTitle"></div>
      </div>

      <h3 class="margin-t-25">Description</h3>
      <div class="formGroup">
          <textarea id="inputDescription" placeholder="Enter a description" required>${popupTaskContent.taskDescription}</textarea>
          <div id="mistakeReportDescription"></div>
      </div>

      <h3>Category</h3>
      <div class="formGroup">
          <div id="selectorCategory">
              <div class="selectorHeader pointer inputTextGrey" onclick="renderingTaskCategorySelector()">
                <div class="selected">${popupTaskContent.taskCategory.Category}
                  <img src="./assets/img/categoryColors/${popupTaskContent.taskCategory.TaskColor}.png">
                </div>
                <img class="selectorArrow" src="./assets/img/selectorArrow.png" />
              </div>
              <div id="selectorCategoryRender">
                  <!-- rendering category selector -->
              </div>
          </div>
          <div id="mistakeReportCategory"></div>
      </div>

      <h3 class="margin-t-35">Due date</h3>
      <div class="formGroup">
          <i class="fa-regular fa-calendar-minus fa-xl" onclick="openCalendar()" style="cursor:pointer"></i>
          <input id="selectDate" class="inputTextGrey" value="${popupTaskContent.toDueDate}" type="text" placeholder="Enter date" onfocus="(this.type='date')"
              onblur="(this.type='text')" required />
          <div id="mistakeReportDate"></div>
      </div>

      <div class="formGroup centered">
          <div id="importanceLvl"> 
              <img class="importanceHard" id="importanceIMGHard" value="taskHard" onclick="prioritySelected(1)"
                  src="./assets/img/taskValue${priorityPaths.hard}.png" />
              <img class="importanceMid" id="importanceIMGMid" value="taskMid" onclick="prioritySelected(2)"
                  src="./assets/img/taskValue${priorityPaths.mid}.png" />
              <img class="importanceLow" id="importanceIMGLow" value="taskLow" onclick="prioritySelected(3)"
                  src="./assets/img/taskValue${priorityPaths.low}.png" />
          </div>
          <div id="mistakeReportImportance"></div>
      </div>

      <div class="formGroup">
          <div id="selectorContact">
              <div onclick="renderingContactsSelectorPopup(${popupTaskContent.taskID})"
                  class="selectorHeader pointer">
                  <div>
                      <span class="inputTextGrey">Selected contacts to assign</span>
                      <span id="selectorContactAssigned"></span>
                  </div>
                  <img class="selectorArrow" src="./assets/img/selectorArrow.png" />
              </div>
              <div id="selectorContactRenderPopup">
                  <!-- rendering contact selector -->
              </div>
          </div>
          <div id="mistakeReportContact"></div>
      </div>

      <h3 class="margin-t-45" id="subtaskTitle">Subtasks</h3>
      <div class="checkAndCrossIcons">
          <i onclick="clearSubtask()" class="fa-solid fa-xmark fa-xl pointer"></i>
          <img src="./assets/img/icons/trennstrich.png" />
          <i onclick="pushSubtaskLocalStorage()" class="fa-solid fa-check fa-xl pointer"></i>
      </div>
      <div class="formGroup">
          <input id="subtaskText" type="text" placeholder="Add new subtask" />
          <div id="mistakeReportsubtask"></div>
      </div>
      <div class="taskFooter">
          <div id="addSubtaskCheckbox"></div>
      </div>
      <div class="formGroup centered">
        <button class="editTask-button-blue" onclick="pushEditTask(); return false;">Save<img src="./assets/img/icons/icon_check_white.png" alt="Create"></button>
      </div>
    </form>
    <div class="formGroup centered">
      <button class="editTask-button-red" onclick="deleteTask()">Delete<img class="editTask-delete-icon" src="./assets/img/icons/icon_close_white.png" alt="Delete"></button>
    </div>
  `;
}

/**
 * html-template for no task in board
 * @returns - html
 */
function noTasksTemplate() {
    return /*html*/ `
      <div class="noTasks">
          <span class="noTasksText">You have no task on your board. Add new tasks with the button "Add task +".</span>
      </div>
  `;
}
