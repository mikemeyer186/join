let userAccounts = [];
let activeUser;
let subTasks = [];
let tasks = [];

// Onload function
async function init(i) {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
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