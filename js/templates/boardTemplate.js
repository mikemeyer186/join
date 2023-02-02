/**
 * template for task cards
 * @param {number} i - index of iteration
 * @returns - html-template
 */
function taskCardTemplate(i) {
    return /*html*/ `
      <div onclick="taskEditPopup(${userTasksArray[i].taskID})" draggable="true" ondragstart="startDraggin(${userTasksArray[i].taskID})" class="boardBox pointer">
        <div class="boardBoxContent">
          <div class="boardBoxContent-top">
            <p class="boardBoxCategory ${userTasksArray[i].taskCategory.TaskColor}">${userTasksArray[i].taskCategory.Category}</p>
            <h4 class="boardBoxTitle">${userTasksArray[i].taskTitle}</h4>
            <p class="boardBoxDescription">${userTasksArray[i].taskDescription}</p>
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
            <img style="object-fit: cover;"src="./assets/img/${popupTaskContent.priority}PopUpIcon.png">
          </div>
        </div>
        <div class="popupTaskContacts">
          <b>Assigned to:</b>
          <div id="popupContactsRender"></div>
        </div>
        <div class="popup-addTask-top">
          <img onclick="editPopupTask(${popupTaskContent.taskID})" class="editButton pointer" src="./assets/img/editButton.png"/>
        </div>
      </div>
    `;
}

/**
 * template for assigned contacts for edit task popup
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

/*****  old code  ******/

/**
 * Template popup Add task
 * @param {string} value of task status
 */
async function addTaskPopup(value) {
    document.getElementById('addTaskPopup').classList.remove('d-none');
    document.getElementById('popup-bg').classList.remove('d-none');
    document.getElementById('page-container').classList.add('overflowHidden');
    document.getElementById('boardContentID').classList.add('overflowHidden');
    document.getElementById('popup-Task').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('popup-Task').classList.add('popup-slideInAddTask');
        document.getElementById('popup-bg').classList.remove('no-opacity');
    }, 10);
    document.getElementById('addTaskPopupHeader').innerHTML = `
    <h1>Add Task</h1>
    <button class="buttonCreate pointer" onclick="addTask(${value})">Create Task ✓</button>`;
}

/**
 * Template the edit Popup
 * @param {number} ident of task
 */
function editPopupTask(ident) {
    findLength(ident);
    let indet = idInLength;
    getPopupContent(ident);
    document.getElementById('taskPopUpContent').innerHTML = `
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
          <i class="fa-regular fa-calendar-minus fa-xl"></i>
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
              onclick="prioritySelectedEdit('hard')"
              src="./assets/img/taskValueHard.png"
            />
            <img
              class="importanceMid"
              id="importanceEditIMGMid"
              value="taskMid"
              onclick="prioritySelectedEdit('mid')"
              src="./assets/img/taskValueMid.png"
            />
            <img
              class="importanceLow"
              id="importanceEditIMGLow"
              value="taskLow"
              onclick="prioritySelectedEdit('low')"
              src="./assets/img/taskValueLow.png"
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
            <img class="okButton pointer" onclick="pushEditTask(${popupTaskContent.taskID});" src="./assets/img/okButton.png">
      </form>
    `;
    prioritySelectedEdit(popupTaskContent.priority);
}

/**
 * Hiding the template of popup add Task
 */
function hidePopUps() {
    document.getElementById('page-container').classList.remove('overflowHidden');
    document.getElementById('popup-Task').classList.remove('popup-slideInAddTask');
    document.getElementById('popup-Task').classList.remove('popup-slideInTask');
    document.getElementById('popup-bg').classList.add('no-opacity');
    setTimeout(() => {
        document.getElementById('popup-Task').classList.add('d-none');
        document.getElementById('popup-Task').classList.add('d-none');
        document.getElementById('popup-bg').classList.add('d-none');
    }, 250);
}
