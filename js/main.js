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
 * pulling tasks from backend
 */
async function loadTasksfromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}
// Onload function
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
