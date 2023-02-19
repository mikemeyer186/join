/**
 * body onload functions
 */
async function addTaskOnload() {
    await init(3);
    await loadTasksfromBackend();
    showAssignedContacts();
    hideCloseButton();
    setStatusToDo();
}

/**
 * hiding the close button of popup in static site
 */
function hideCloseButton() {
    document.getElementById('addTaskPopopIconClose').classList.add('d-none');
    document.getElementById('selectorContactRenderPopup').classList.add('noBorder');
}

/**
 * reloading the page
 */
function reloadPage() {
    window.location.href = 'addTask.html';
}

/**
 * setting task status to "todo" for new tasks
 */
function setStatusToDo() {
    setTaskStatus(1);
}
