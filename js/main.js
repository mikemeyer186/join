let userAccounts = [];
let activeUser;
let subTasks = ['Subtask1'];
let tasks = [
    {
        taskTitle: 'Website redesign',
        description: 'Modify the contacts of the main website...',
        dueDate: '25.05.2022',
        taskCategory: 'Design',
        subTask: 'Subtask1',
        taskID: 1,
        categoryColor: 'Orange',
        priority: 'low',
        assignedTo: 'Mike Meier, Mike Meyer',
    },
];
// Onload function
async function init(i) {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    highlightedNavbar(i);
    getSubtaskLocalStorage(); 
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
    activeUser = JSON.parse(localStorage.getItem('activeUser'));
}
/**
 * stopping propagation of child elements
 */
function stopPropagate(event) {
    event.stopPropagation();
}
/**
 * getting subTasks from the LocalSotrage 
 */
function getSubtaskLocalStorage() {
    subTasks = localStorage.getItem('subTasks');
}