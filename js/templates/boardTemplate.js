let taskUser = [];

/**! RENDERINGS !*/

/**
 * This function is rendering the task boxes in the board
 * @param {string} searchResult
 */
function renderTasksinBoard(searchResult) {
    if (searchResult) {
        userTasksArray = searchResult;
    } else {
        fillUserTasksFromTasks();
    }
    document.getElementById('boardTodoContent').innerHTML = ``;
    document.getElementById('boardProgressContent').innerHTML = ``;
    document.getElementById('boardFeedbackContent').innerHTML = ``;
    document.getElementById('boardDoneContent').innerHTML = ``;
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskStatus == 'todo') {
            document.getElementById('boardTodoContent').innerHTML += `
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
        if (userTasksArray[i].taskStatus == 'progress') {
            document.getElementById('boardProgressContent').innerHTML += `
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
        if (userTasksArray[i].taskStatus == 'feedback') {
            document.getElementById('boardFeedbackContent').innerHTML += `
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
        if (userTasksArray[i].taskStatus == 'done') {
            document.getElementById('boardDoneContent').innerHTML += `
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
}

/**
 * Rendering the abbrevaition in the boxes
 * @param {number} ID of box
 * @param {number} index of usertaskarray value
 */
function renderAbbrevaitionInBox(ident, b) {
    document.getElementById(ident).innerHTM = ``;
    if (userTasksArray[b].assignedTo.length > 3) {
        for (let i = 0; i < 2; i++) {
            document.getElementById(ident).innerHTML += `
      <div class="abbreviationIconsBox" id="abbreviationIconsBox${i + 1}" style="background-color: ${userTasksArray[b].assignedTo[i].paint}">${
                userTasksArray[b].assignedTo[i].abbreviation
            }</div>`;
        }
        document.getElementById(ident).innerHTML += `
    <div class="abbreviationIconsBox" id="abbreviationIconsBox3" style="background-color: ${userTasksArray[b].assignedTo[2].paint}">+${
            userTasksArray[b].assignedTo.length - 2
        }</div>`;
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

/**
 * Rendering contacts in addTask Popup at board
 * @param {number} ID task
 */
function renderingContactsSelectorPopup(index) {
    contactCheckedValue = tasks[index].assignedTo;
    let activeUserContacts = userAccounts[activeUser].userContacts;
    if (selectorContactIndex == 0) {
        document.getElementById('selectorContactRenderPopup').innerHTML = ``;
        for (let i = 0; i < activeUserContacts.length; i++) {
            if (findContact(userAccounts[activeUser].userContacts[i].contactName) === true) {
                document.getElementById('selectorContactRenderPopup').innerHTML += `
          <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" class="checked" src="./assets/img/icons/checkButtonChecked.png">
          </div>
          </div>
        `;
            } else {
                document.getElementById('selectorContactRenderPopup').innerHTML += `
          <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
          </div>
          </div>
        `;
            }
        }
        document.getElementById('selectorContactRenderPopup').innerHTML += `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <nobr>Invite new contact</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
          </div>
          </div>`;
        selectorContactIndex++;
    } else {
        contactCheckedValue = tasks[idInLength].assignedTo;
        document.getElementById('selectorContactRenderPopup').innerHTML = ``;
        selectorContactIndex--;
    }
}

/**
 * Rendering contacts in footer of the Task Pupup
 */
function popupRenderContacts() {
    document.getElementById('popupContactsRender').innerHTML = ``;
    for (let i = 0; i < popupTaskContent.assignedTo.length; i++) {
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

/**! TEMPLATES !*/

/**
 * Template popup Add task
 * @param {string} value of task status
 */
async function addTaskPopup(value) {
    document.getElementById('addTaskPopup').classList.remove('d-none');
    document.getElementById('popup-bg').classList.remove('d-none');
    document.getElementById('page-container').classList.add('overflowHidden');
    document.getElementById('boardContentID').classList.add('overflowHidden');
    document.getElementById('popup-addTask').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('popup-addTask').classList.add('popup-slideInAddTask');
        document.getElementById('popup-bg').classList.remove('no-opacity');
    }, 10);
    document.getElementById('addTaskButtonValue').innerHTML = `
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
              onclick="prioritySelectedEdit('Hard')"
              src="./assets/img/taskValueHard.png"
            />
            <img
              class="importanceMid"
              id="importanceEditIMGMid"
              value="taskMid"
              onclick="prioritySelectedEdit('Mid')"
              src="./assets/img/taskValueMid.png"
            />
            <img
              class="importanceLow"
              id="importanceEditIMGLow"
              value="taskLow"
              onclick="prioritySelectedEdit('Low')"
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
    document.getElementById('popup-addTask').classList.remove('popup-slideInAddTask');
    document.getElementById('popup-Task').classList.remove('popup-slideInTask');
    document.getElementById('popup-bg').classList.add('no-opacity');
    setTimeout(() => {
        document.getElementById('popup-addTask').classList.add('d-none');
        document.getElementById('popup-Task').classList.add('d-none');
        document.getElementById('popup-bg').classList.add('d-none');
        document.getElementById('addTaskPopup').classList.add('d-none');
    }, 250);
}

/**
 * Template popup from task
 * @param {number} taskID
 */
function taskEditPopup(taskIDused) {
    document.getElementById('page-container').classList.add('overflowHidden');
    document.getElementById('popup-Task').classList.remove('d-none');
    document.getElementById('popup-bg').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('popup-bg').classList.remove('no-opacity');
        document.getElementById('popup-Task').classList.add('popup-slideInTask');
    }, 10);
    getPopupContent(taskIDused);
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
