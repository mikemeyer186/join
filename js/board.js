let idInLength = -1;

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
 * Find the right ID in userTasksArray
 * @param {number} ident task
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
 * search and save the dragged element
 * @param {number} id of dragged element
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
 * Allows the drop in this area
 * @param {*} event allows the drop
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Task status change by dropping
 * @param {string} status New status for task
 */
async function drop(status) {
    userTasksArray[currentDraggedElement]['taskStatus'] = status;
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
 * Selected priority task for Popup
 * @param {string} value of priority
 */
function prioritySelectedEdit(i) {
    if (i == 'Hard') {
        prioritySelect = 'Hard';
        document.getElementById('importanceEditIMGHard').classList.remove('importanceHard');
        document.getElementById('importanceEditIMGLow').classList.add('importanceLow');
        document.getElementById('importanceEditIMGMid').classList.add('importanceMid');
        document.getElementById('importanceEditIMGHard').src = './assets/img/TaskValueHardSelected.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/TaskValueMid.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/TaskValueLow.png';
    }
    if (i == 'Mid') {
        prioritySelect = 'Mid';
        document.getElementById('importanceEditIMGMid').classList.remove('importanceMid');
        document.getElementById('importanceEditIMGLow').classList.add('importanceLow');
        document.getElementById('importanceEditIMGHard').classList.add('importanceHard');
        document.getElementById('importanceEditIMGHard').src = './assets/img/TaskValueHard.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/TaskValueMidSelected.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/TaskValueLow.png';
    }
    if (i == 'Low') {
        prioritySelect = 'Low';
        document.getElementById('importanceEditIMGLow').classList.remove('importanceLow');
        document.getElementById('importanceEditIMGMid').classList.add('importanceMid');
        document.getElementById('importanceEditIMGHard').classList.add('importanceHard');
        document.getElementById('importanceEditIMGHard').src = './assets/img/TaskValueHard.png';
        document.getElementById('importanceEditIMGMid').src = './assets/img/TaskValueMid.png';
        document.getElementById('importanceEditIMGLow').src = './assets/img/TaskValueLowSelected.png';
    }
}

/**
 * find contact for checked users
 * @param {string} name of user
 * @returns true
 */
function findContact(name) {
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == name) {
            return true;
        }
    }
}

/**
 * delet the contact from the contactCheckedValue
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
 * finding index of contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @returns - index
 */
function findContactIndex(contactName) {
    let index;
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == contactName) {
            index = i;
        }
    }
    return index;
}

/**
 * delet the contact from the contactCheckedValue
 * @param {string} contactName name of contact
 * @param {string} initiales of name
 * @param {color} color of user
 * @param {number} ID of user
 */
function selectedContactPopup(contactName, initiales, color, number) {
    let index = findContactIndex(contactName);

    if (document.getElementById('popup' + number + contactName).classList.contains('checked')) {
        deletContact(index, contactName, number);
    } else {
        addContact(contactName, initiales, color, number);
    }
}

/**
 * Give task a status
 * @param {number} value of status
 */
function setTaskStatus(value) {
    if (value == 1) {
        selectedTaskStatus = 'progress';
    }
    if (value == 2) {
        selectedTaskStatus = 'feedback';
    }
    if (value == 3) {
        selectedTaskStatus = 'done';
    }
    if (value == 4) {
        selectedTaskStatus = 'todo';
    }
}

/**
 * get popup content
 * @param {number} taskID from array
 */
function getPopupContent(taskIDused) {
    for (let i = 0; i < userTasksArray.length; i++) {
        if (userTasksArray[i].taskID == taskIDused) {
            popupTaskContent = userTasksArray[i];
        }
    }
}

/**
 * Push JSON in tasks from board
 * @param {number} ID of Task
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
 * adding new contact to user account and show details
 */
function addContactToUserFromTask() {
    let inputName = document.getElementById('selectContact');
    let inputEmail = document.getElementById('selectContact');
    let inputPhone = '';
    let inputInitials = getContactInitials(inputName.value).toUpperCase();
    let inputColor = getRandomColor();
    let contactObject = {
        contactName: inputName.value,
        contactEmail: inputEmail.value,
        contactPhone: inputPhone,
        contactInitials: inputInitials,
        contactColor: inputColor,
    };
    userAccounts[activeUser].userContacts.push(contactObject);
    saveAccountsToBackend();
    rechangeContactInput();
    selectorContactIndex--;
    renderingContactsSelector();
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
