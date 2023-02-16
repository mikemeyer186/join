/**
 * body onload functions
 */
async function addTaskOnload() {
    await init(3);
    await loadTasksfromBackend();
    showAssignedContacts();
    hideCloseButton();
}

function hideCloseButton() {
    document.getElementById('addTaskPopopIconClose').classList.add('d-none');
}
