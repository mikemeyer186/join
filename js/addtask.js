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

function hideCloseButton() {
    document.getElementById('addTaskPopopIconClose').classList.add('d-none');
}

function reloadPage() {
    window.location.href = 'addTask.html';
}

function setStatusToDo() {
    setTaskStatus(1);
}
