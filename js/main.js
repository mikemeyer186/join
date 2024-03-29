let userAccounts = [];
let activeUser;
let subTasks = [];
let tasks = [];
let taskCategory = [];
let prioritySelect;
let taskCategorySelector = [];
let taskContactSelector = [];
let currentDraggedElement;
let popupTaskContent = [];
let selectorCategoryIndex = 0;
let selectorContactIndex = 0;
let categorySelectedColor;
let selectedCategoryValue = [];
let taskCategoryFinaly;
let taskCategoryColorFinaly = [];
let contactSelected = [];
let contactCheckedValue = [];
let filterLetters = [];
let contactList = [];
let userTasksArray = [];
let selectedTaskStatus;
let staticCategorys = [
    { taskCategory: 'New category', taskColor: 'grayCategory', cagtegoryID: 0 },
    { taskCategory: 'Sales', taskColor: 'purpleCategory', cagtegoryID: 1 },
    { taskCategory: 'Backoffice', taskColor: 'blueCategory', cagtegoryID: 2 },
    { taskCategory: 'Design', taskColor: 'orangeCategory', cagtegoryID: 3 },
    { taskCategory: 'Development', taskColor: 'greenCategory', cagtegoryID: 4 },
    { taskCategory: 'Media', taskColor: 'redCategory', cagtegoryID: 5 },
    { taskCategory: 'Marketing', taskColor: 'grayCategory', cagtegoryID: 6 },
];

/**
 * initial function
 * @param {number} i - number of navigation link
 */
async function init(i) {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    showActiveUserIcon();
    highlightedNavbar(i);
}

/**
 * including the header, sidebar and add-task popup
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * including add-task popup only
 */
async function includeAddTaskPopup() {
    const element = document.getElementById('addTaskPopup');
    file = element.getAttribute('w3-include-html');
    let resp = await fetch(file);
    if (resp.ok) {
        element.innerHTML = await resp.text();
    } else {
        element.innerHTML = 'Page not found';
    }
}

/**
 * pushing tasks in backend
 */
async function pushTasksinBackend() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

/**
 * loading tasks from backend
 */
async function loadTasksfromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * loading user accounts from backend database
 */
async function loadAccountsFromBackend() {
    await downloadFromServer();
    userAccounts = JSON.parse(backend.getItem('userAccounts')) || [];
}

/**
 * saving user accounts in backend database
 */
async function saveAccountsToBackend() {
    await backend.setItem('userAccounts', JSON.stringify(userAccounts));
}

/**
 * loading active user from local storage
 */
function loadActiveUserLocal() {
    activeUser = localStorage.getItem('activeUser');
}

/**
 * stopping propagation of child elements
 * @param {object} event
 */
function stopPropagate(event) {
    event.stopPropagation();
}

/**
 * showing active user initials and color in header
 */
function showActiveUserIcon() {
    let user = userAccounts[activeUser];
    document.getElementById('header-profil-bg').style.backgroundColor = `${user.userColor}`;
    document.getElementById('header-profil-initials').innerHTML = `${user.userInitials}`;
}

/**
 * toggeling log out popup class for sliding into view
 */
function toggleLogOutPopUp() {
    document.getElementById('logOut-popup-bg').classList.toggle('slideLogOutIntoView');
}

/**
 * logging active user out (back to index.html)
 */
function logOutActiveUser() {
    window.location.href = './index.html';
    localStorage.setItem('introScreen', 0);
}

/**
 * sliding the popup from the bottom of page into view
 * sliding out of view after 4 seconds
 * @param {string} id - id of html element
 */
function slidePopupIntoView(id) {
    document.getElementById(`${id}`).classList.add('slideIn');

    setTimeout(() => {
        document.getElementById(`${id}`).classList.remove('slideIn');
    }, 4000);
}

/**
 * checking if reload is true and sliding popup into view (popup while forwarding to board from another page)
 */
function checkReload() {
    let newTaskPopup = localStorage.getItem('reloadingNewPopup');
    let editTaskPopup = localStorage.getItem('reloadingEditPopup');
    let deleteTaskPopup = localStorage.getItem('reloadingDeletePopup');

    if (newTaskPopup) {
        localStorage.removeItem('reloadingNewPopup');
        slidePopupIntoView('created-task-popup');
    }
    if (editTaskPopup) {
        localStorage.removeItem('reloadingEditPopup');
        slidePopupIntoView('edited-task-popup');
    }
    if (deleteTaskPopup) {
        localStorage.removeItem('reloadingDeletePopup');
        slidePopupIntoView('deleted-task-popup');
    }
}

/**
 * toggling the add task popup in or out
 * @param {number} mode - 0 for no contacts, 1 for checked assigned contacts
 * @param {string} status - status of new task
 */
function toggleAddTaskPopup(mode, status, io) {
    if (io == 'in') {
        togglePageBackground(io);
        setTimeout(() => {
            showAddTaskPopup(mode, status);
        }, 10);
    } else {
        showAddTaskPopup(mode, status);
        togglePageBackground(io);
    }
}

/**
 * toggling the page background
 */
function togglePageBackground(io) {
    if (io == 'in') {
        document.getElementById('popup-bg').classList.toggle('d-none');
        document.getElementById('page-container').classList.toggle('overflowHidden');
        setTimeout(() => {
            document.getElementById('popup-bg').classList.toggle('no-opacity');
        }, 10);
    } else {
        document.getElementById('popup-bg').classList.toggle('no-opacity');
        setTimeout(() => {
            document.getElementById('popup-bg').classList.toggle('d-none');
            document.getElementById('page-container').classList.toggle('overflowHidden');
        }, 250);
    }
}

/**
 * hiding all popups and scroll task popup content to top
 */
function hidePopUps(io) {
    document.getElementById('popup-Task').classList.remove('popup-slideInTask');
    document.getElementById('addTaskPopup').classList.remove('translate0');
    document.getElementById('mobiletaskheader').classList.remove('headerSlideIn');
    document.getElementById('popup-close-icon').classList.remove('d-none');
    document.getElementById('popup-edit-icon').classList.remove('d-none');
    document.getElementById('taskPopUpContent').scrollTo(0, 0);
    deleteSubTasksArray();
    togglePageBackground(io);
    includeAddTaskPopup();
    renderTasksinBoard();

    setTimeout(() => {
        document.getElementById('popup-Task').classList.add('d-none');
    }, 250);
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
