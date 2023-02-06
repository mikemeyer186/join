let idInLength = -1;
let taskUser = [];

/**
 * onload functions
 */
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    await downloadFromServer();
    renderTasksinBoard();
    checkReload();
}

/**
 *find the right ID in userTasksArray
 * @param {number} ident - id of task
 */
function findLength(ident) {
    idInLength = -1;
    for (let i = 0; userTasksArray.length; i++) {
        idInLength++;
        if (userTasksArray[i].taskID == ident) {
            break;
        }
    }
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
 * shows drop area
 * @param {event} ev - event
 * @param {string} zone - html-element
 */
function allowDrop(ev, zone) {
    ev.preventDefault();
    document.getElementById(zone).classList.add('boardDragArea');
}

/**
 * hides drop area
 * @param {string} zone - html-element
 */
function removeDragZone(zone) {
    document.getElementById(zone).classList.remove('boardDragArea');
}

/**
 * changing status when dropping task card
 * @param {string} status - new status for task
 */
async function drop(status, zone) {
    userTasksArray[currentDraggedElement]['taskStatus'] = status;
    removeDragZone(zone);
    renderTasksinBoard();
    addUsertaskInTask();
}

/**
 * push usertask in task array
 */
async function addUsertaskInTask() {
    for (let i = 0; i < userTasksArray.length; i++) {
        let task = userTasksArray[i].taskID;
        tasks[task] = userTasksArray[i];
    }
    await pushTasksinBackend();
}

/**
 * selected priority task for Popup
 * @param {string} value of priority
 */
function prioritySelectedEdit(i) {
    if (i == 'hard') {
        prioritySelect = 'hard';
        document.getElementById('importanceEditIMGHard').classList.remove('importanceHard');
        document.getElementById('importanceEditIMGLow').classList.add('importanceLow');
        document.getElementById('importanceEditIMGMid').classList.add('importanceMid');
        document.getElementById('importanceEditIMGHard').src = './assets/img/taskValueHardSelected.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/taskValueMid.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/taskValueLow.png';
    }
    if (i == 'mid') {
        prioritySelect = 'mid';
        document.getElementById('importanceEditIMGMid').classList.remove('importanceMid');
        document.getElementById('importanceEditIMGLow').classList.add('importanceLow');
        document.getElementById('importanceEditIMGHard').classList.add('importanceHard');
        document.getElementById('importanceEditIMGHard').src = './assets/img/taskValueHard.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/taskValueMidSelected.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/taskValueLow.png';
    }
    if (i == 'low') {
        prioritySelect = 'low';
        document.getElementById('importanceEditIMGLow').classList.remove('importanceLow');
        document.getElementById('importanceEditIMGMid').classList.add('importanceMid');
        document.getElementById('importanceEditIMGHard').classList.add('importanceHard');
        document.getElementById('importanceEditIMGHard').src = './assets/img/taskValueHard.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/taskValueMid.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/taskValueLowSelected.png';
    }
}

/**
 * delete the contact from the contactCheckedValue
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
 * push the contact in the contactCheckedValue
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
 * get popup content
 * @param {number} taskID - from array
 */
function getPopupContent(taskIDused) {
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskID == taskIDused) {
            popupTaskContent = userTasksArray[i];
        }
    }
}

/**
 * pushing JSON in tasks from board
 * @param {number} i - id of task
 */
async function pushEditTask(i) {
    findLength(i);
    let indet = idInLength;
    contactCheckedValue = userTasksArray[indet].assignedTo;
    let taskInputTitle = document.getElementById('inputTitleEdit').value;
    let dueDate = document.getElementById('selectDateEdit').value;
    let description = document.getElementById('inputDescriptionEdit').value;
    userTasksArray[indet].taskTitle = taskInputTitle;
    userTasksArray[indet].taskDescription = description;
    userTasksArray[indet].toDueDate = dueDate;
    userTasksArray[indet].priority = prioritySelect;
    userTasksArray[indet].assignedTo = contactCheckedValue;
    await addUsertaskInTask();
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
