let userAccounts = [];
let activeUser;
let subTasks = [];
let tasks = [];
let taskCategory = [];
let checkedSubtaskValue;
let prioritySelect;
let taskCategorySelector = [];
let taskContactSelector = [];
let currentDraggedElement;
let popupTaskContent = [];
let selectorCategoryIndex = 0;
let selectorContactIndex = 0;
let categorySelectedColor;
let selectedCategoryValue = [];
let taskCategoryFinaly = [];
let taskCategoryColorFinaly = [];
let contactSelected = [];
let contactCheckedValue = [];
let userTasksArray = [];
let selectedTaskStatus;

/**
 * loading tasks from backend
 */
async function loadTasksfromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

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
 * Rendering the header and the sidebar in the page
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
 * saving user accounts in backend database
 */
async function saveAccountsToBackend() {
    await backend.setItem('userAccounts', JSON.stringify(userAccounts));
}

/**
 * loading user accounts from backend database
 */
async function loadAccountsFromBackend() {
    await downloadFromServer();
    userAccounts = JSON.parse(backend.getItem('userAccounts')) || [];
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
 * checking if reload is true and sliding popup into view
 */
 function checkReload() {
    let newTaskPopup = localStorage.getItem("reloadingNewPopup");
    let editTaskPopup = localStorage.getItem("reloadingEditPopup");
    if (newTaskPopup) {
        localStorage.removeItem("reloadingNewPopup");
        slidePopupIntoView('created-task-popup');
    }
    if (editTaskPopup) {
        localStorage.removeItem("reloadingEditPopup");
        slidePopupIntoView('edited-task-popup');
    }
  }
