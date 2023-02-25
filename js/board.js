/**
 * onload functions
 */
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    renderTasksinBoard();
    checkReload();
    //touchEvents();
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
        userTasksArray[indexTask].subTask = subTasks;
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
    localStorage.setItem('reloadingDeletePopup', true);
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
    } else {
        document.getElementById('noTasksComment').innerHTML = noTasksTemplate();
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
            let processPerc = calculatePercentage(i);
            document.getElementById(`board${capStatus}Content`).innerHTML += taskCardTemplate(i, processPerc);
            renderAbbrevaitionInBox(userTasksArray[i].taskID, i);
        }
    }
}

/**
 * calculating the percentage of checked subtasks and returns object with specific data
 * @param {number} i - index of subtask
 * @returns - object with sum of all subtasks, done subtasks and percentage of checked subtasks
 */
function calculatePercentage(i) {
    let percentage = 0;
    let allSubtasks = userTasksArray[i].subTask;
    let sumSubtasks = allSubtasks.length;
    let checked = 0;

    if (allSubtasks.length > 0) {
        allSubtasks.forEach((subtask) => {
            if (subtask.checkbox == 'checked') {
                checked++;
            }
        });
        percentage = (checked / sumSubtasks) * 100;
    }
    return { sum: sumSubtasks, done: checked, percentage: percentage };
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
    hideAllDeleteBtns();

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

    if (popupTaskContent.subTask.length > 0) {
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
        box.checked = false;
        subTasks[i].checkbox = 'unchecked';
    } else if (!box.checked) {
        box.checked = true;
        subTasks[i].checkbox = 'checked';
    }
    saveCheckedSubTasksToBackend();
}

function taskEditDeleteSubTask(i) {
    subTasks.splice(i, 1);
    saveCheckedSubTasksToBackend();
    taskEditPopupSubtasks();
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
 */
function editPopupTask() {
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
    showAllDeleteBtns();
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

/**
 * hiding the delete buttons of subtasks in popup
 */
function hideAllDeleteBtns() {
    const delBtns = document.querySelectorAll('.subtaskList-delete');
    delBtns.forEach((btn) => btn.classList.add('d-none'));
}

/**
 * showing of all delete buttons of subtasks
 */
function showAllDeleteBtns() {
    const delBtns = document.querySelectorAll('.subtaskList-delete');
    delBtns.forEach((btn) => btn.classList.remove('d-none'));
}

/*
function touchEvents() {
    let cards = document.querySelectorAll('.boardBox');

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let value = cards[i].attributes[0].value;
        let idNumber = value.match(/\d+/)[0];
        dragTouchEvents(card, idNumber);
    }
}

function dragTouchEvents(card, idNumber) {
    card.addEventListener('touchstart', (event) => {
        event.preventDefault();
        startDraggin(idNumber);
    });
}*/
