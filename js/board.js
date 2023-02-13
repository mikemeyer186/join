/**
 * onload functions
 */
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    renderTasksinBoard();
    checkReload();
}

/**
 * starting drag event
 * @param {number} id - id of dragged element
 */
function startDraggin(id) {
    currentDraggedElement = -1;
    for (let i = 0; userTasksArray.length; i++) {
        currentDraggedElement++;
        if (userTasksArray[i].taskID == id) {
            break;
        }
    }
}

/**
 * showing drop area
 * @param {event} ev - event
 * @param {string} zone - html-element
 */
function allowDrop(ev, zone) {
    ev.preventDefault();
    document.getElementById(zone + 'Drop').classList.add('dropZone');
    document.getElementById(zone + 'Content').classList.add('halfOpacity');
    document.getElementById(zone + 'DropText').classList.remove('d-none');
}

/**
 * hiding drop area
 * @param {string} zone - html-element
 */
function removeDragZone(zone) {
    document.getElementById(zone + 'Drop').classList.remove('dropZone');
    document.getElementById(zone + 'Content').classList.remove('halfOpacity');
    document.getElementById(zone + 'DropText').classList.add('d-none');
}

/**
 * changing status when dropping task card
 * @param {string} status - new status for task
 */
async function drop(status, zone) {
    userTasksArray[currentDraggedElement]['taskStatus'] = status;
    removeDragZone(zone);
    renderTasksinBoard();
    await addUsertaskInTask();
}

/**
 * pushing usertask in task array
 */
async function addUsertaskInTask() {
    for (let i = 0; i < userTasksArray.length; i++) {
        let taskID = userTasksArray[i].taskID;
        tasks[taskID] = userTasksArray[i];
    }
    await pushTasksinBackend();
}

/**
 * --- OLD addtask.js --- delete the contact from the contactCheckedValue
 * @param {number} index of contact
 * @param {number} number id of contact in html-id
 * @param {string} contactName name of contact
 */
function deletContact(index, contactName, number) {
    contactCheckedValue.splice(index, 1);
    document.getElementById('popup' + number + contactName).classList.remove('checked');
    document.getElementById('popup' + number + contactName).src = './assets/img/icons/checkButton.png';
}

/**
 * --- OLD addtask.js --- push the contact in the contactCheckedValue
 * @param {number} index of contact
 * @param {number} number id of contact in html-id
 * @param {string} contactName name of contact
 */
function addContact(contactName, initiales, color, number) {
    contactCheckedValue.push({
        contactName: contactName,
        abbreviation: initiales,
        paint: color,
    });
    document.getElementById('popup' + number + contactName).src = './assets/img/icons/checkButtonChecked.png';
    document.getElementById('popup' + number + contactName).classList.add('checked');
}

/**
 * getting task content for popup, with the right taskID
 * @param {number} taskIDused - index of task from card on the board
 */
function getPopupContent(taskIDused) {
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskID == taskIDused) {
            popupTaskContent = userTasksArray[i];
        }
    }
}

/**
 * finding the index of edited task in usertask array
 * @returns - index
 */
function findIndexOfUserTask() {
    let indexTask;
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskID == popupTaskContent.taskID) {
            indexTask = i;
        }
    }
    return indexTask;
}

/**
 * pushing edited task in usertasks array
 */
async function pushEditTask() {
    let indexTask = findIndexOfUserTask();
    let taskInputTitle = document.getElementById('inputTitle').value;
    let dueDate = document.getElementById('selectDate').value;
    let description = document.getElementById('inputDescription').value;

    if (checkingEmptyValues()) {
        userTasksArray[indexTask].taskTitle = taskInputTitle;
        userTasksArray[indexTask].taskDescription = description;
        userTasksArray[indexTask].toDueDate = dueDate;
        userTasksArray[indexTask].priority = prioritySelect;
        userTasksArray[indexTask].taskCategory = {
            Category: taskCategoryFinaly,
            TaskColor: taskCategoryColorFinaly,
        };

        await addUsertaskInTask();
        localStorage.setItem('reloadingEditPopup', true);
        window.location.reload();
    }
}

/**
 * finding index of task in user account (userTasks)
 * @returns - index
 */
function findIndexOfUserAccount() {
    let indexUserTask;
    for (let i = 0; i < userAccounts[activeUser].userTasks.length; i++) {
        if (userAccounts[activeUser].userTasks[i] == popupTaskContent.taskID) {
            indexUserTask = i;
        }
    }
    return indexUserTask;
}

/**
 * deleting task from user
 */
async function deleteTask() {
    let indexUserTask = findIndexOfUserAccount();
    userAccounts[activeUser].userTasks.splice(indexUserTask, 1);
    await saveAccountsToBackend();
    localStorage.setItem('reloadingEditPopup', true);
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

/**
 * getting the initials of new contact name
 * @param {string} inputName - is the typed name
 * @returns - one or two letters
 */
function getContactInitials(inputName) {
    let stringName = inputName;
    let stringLetters = stringName.match(/\b(\w)/g);
    let initials;

    if (stringLetters.length > 1) {
        initials = stringLetters[0] + stringLetters[1];
    } else {
        initials = stringLetters[0];
    }
    return initials;
}

/**
 * generating random rgb-colors
 * @returns - string with rgb-color
 */
function getRandomColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    let rgbColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return rgbColor;
}

/**
 * generating random number betwenn 0 and 255
 * @param {number} max - is 255 for rgb
 * @returns - random number
 */
function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * rendering the task cards in the board
 * @param {string} searchResult - value from search input
 */
function renderTasksinBoard(searchResult) {
    if (searchResult) {
        userTasksArray = searchResult;
    } else {
        fillUserTasksFromTasks();
    }
    cleanBoardContent();
    renderTasksinBoardStatus('todo');
    renderTasksinBoardStatus('progress');
    renderTasksinBoardStatus('feedback');
    renderTasksinBoardStatus('done');
}

/**
 * rendering tasks in right status area in board
 * @param {string} status - status of task
 */
function renderTasksinBoardStatus(status) {
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskStatus == status) {
            let capStatus = status.charAt(0).toUpperCase() + status.slice(1);
            document.getElementById(`board${capStatus}Content`).innerHTML += taskCardTemplate(i);
            renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
        }
    }
}

/**
 * rendering abbreviation of assigned contacts in task card
 * @param {number} taskId - id of task
 * @param {number} i - iteration of user task
 */
function renderAbbrevaitionInBox(taskId, i) {
    document.getElementById(taskId).innerHTML = ``;

    if (userTasksArray[i].assignedTo.length <= 3) {
        for (let j = 0; j < userTasksArray[i].assignedTo.length; j++) {
            document.getElementById(taskId).innerHTML += abbreviationTaskTemplate(i, j);
        }
    } else {
        for (let j = 0; j < 2; j++) {
            document.getElementById(taskId).innerHTML += abbreviationTaskTemplate(i, j);
            document.getElementById(taskId).innerHTML += abbreviationTaskTemplateMore(i);
        }
    }
}

/**
 * cleaning the html-content
 */
function cleanBoardContent() {
    document.getElementById('boardTodoContent').innerHTML = ``;
    document.getElementById('boardProgressContent').innerHTML = ``;
    document.getElementById('boardFeedbackContent').innerHTML = ``;
    document.getElementById('boardDoneContent').innerHTML = ``;
}

/**
 * sliding edit popup and rendering the content
 * @param {number} taskId - id of task
 */
function taskEditPopup(taskId) {
    getPopupContent(taskId);
    document.getElementById('page-container').classList.add('overflowHidden');
    document.getElementById('popup-Task').classList.remove('d-none');
    document.getElementById('popup-bg').classList.remove('d-none');
    document.getElementById('taskPopUpContent').innerHTML = taskEditTemplate();
    taskEditPopupContacts();
    taskEditPopupSubtasks();

    setTimeout(() => {
        document.getElementById('popup-bg').classList.remove('no-opacity');
        document.getElementById('popup-Task').classList.add('popup-slideInTask');
    }, 10);
}

/**
 * rendering assigned contacts in edit task popup
 */
function taskEditPopupContacts() {
    document.getElementById('popupContactsRender').innerHTML = ``;

    for (let i = 0; i < popupTaskContent.assignedTo.length; i++) {
        document.getElementById('popupContactsRender').innerHTML += taskEditContactsTemplate(i);
    }
}

/**
 * rendering subtasks in edit task popup
 */
function taskEditPopupSubtasks() {
    document.getElementById('popupSubtasksRender').innerHTML = ``;

    if (popupTaskContent.subTask) {
        subTasks = popupTaskContent.subTask;
        for (let i = 0; i < subTasks.length; i++) {
            let value = subTasks[i].value;
            let box = subTasks[i].checkbox;
            document.getElementById('popupSubtasksRender').innerHTML += taskEditSubtaskTemplate(i, value, box);
        }
    } else {
        document.getElementById('popupSubtasksRender').innerHTML = `<span class="subtaskList">No subtasks added</span>`;
    }
}

/**
 * setting checkbox value to subtask (checked or unchecked)
 * @param {number} i - iteration checkboxes in subtasks
 */
function taskEditCheckSubTask(i) {
    let box = document.getElementById(`checkbox${i}`);
    if (box.checked) {
        subTasks[i].checkbox = 'checked';
    } else if (!box.checked) {
        subTasks[i].checkbox = 'unchecked';
    }
    saveCheckedSubTasksToBackend();
}

/**
 * saving checked subtask from popup to backend
 */
async function saveCheckedSubTasksToBackend() {
    let usedTaskID = popupTaskContent.TaskID;
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskID == usedTaskID) {
            userTasksArray[i].subTask = subTasks;
        }
    }
    await addUsertaskInTask();
}

/**
 * opening the edit task popup
 * @param {number} taskID - id of selected task
 */
function editPopupTask(taskID) {
    let priorityPaths = setSelectedPriorityPath();
    document.getElementById('addTaskPopup').innerHTML = '';
    document.getElementById('taskPopUpContent').innerHTML = editTaskPopUpTemplate(priorityPaths);
    document.getElementById('popup-close-icon').classList.add('d-none');
    document.getElementById('popup-edit-icon').classList.add('d-none');
    document.getElementById('taskPopUpContent').scrollTo(0, 0);
    contactCheckedValue = popupTaskContent.assignedTo;
    prioritySelect = popupTaskContent.priority;
    taskCategoryFinaly = popupTaskContent.taskCategory.Category;
    taskCategoryColorFinaly = popupTaskContent.taskCategory.TaskColor;
    selectorContactIndex = 0;
    showAssignedContacts();
    taskEditPopupSubtasksRender();
}

/**
 * setting the path for selected priority of task to show the right image in edit task popup
 * @returns - object of priority path-strings
 */
function setSelectedPriorityPath() {
    let prioritySelected = popupTaskContent.priority;
    let lowPriorityPath = 'Low';
    let midPriorityPath = 'Mid';
    let hardPriorityPath = 'Hard';

    if (prioritySelected == 'low') {
        lowPriorityPath = 'LowSelected';
    } else if (prioritySelected == 'mid') {
        midPriorityPath = 'MidSelected';
    } else if (prioritySelected == 'hard') {
        hardPriorityPath = 'HardSelected';
    }

    return { low: lowPriorityPath, mid: midPriorityPath, hard: hardPriorityPath };
}

/**
 * rendering subtasks in edit task popup for changing and adding
 */
function taskEditPopupSubtasksRender() {
    document.getElementById('addSubtaskCheckbox').innerHTML = ``;

    if (popupTaskContent.subTask.length > 0) {
        subTasks = popupTaskContent.subTask;

        for (let i = 0; i < subTasks.length; i++) {
            let value = subTasks[i].value;
            let box = subTasks[i].checkbox;
            document.getElementById('addSubtaskCheckbox').innerHTML += taskEditSubtaskTemplate(i, value, box);
        }
        saveCheckedSubTasksToBackend();
    }
}
