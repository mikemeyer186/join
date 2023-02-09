/**
 * body onload functions
 */
function addTaskOnload() {
    init(3);
    renderSubTask();
    loadTasksfromBackend();
}

/* /**
 * deleting the contact from the contactCheckedValue
 * @param {string} contactName name of contact
 * @param {string} initiales of name
 * @param {color} color of user
 * @param {number} ID of user
 */
/*
function selectedContact(contactName, initiales, color, number) {
    let index = findContactIndex(contactName);

    if (document.getElementById('popup' + number + contactName).classList.contains('checked')) {
        deletContact(index, contactName, number);
    } else {
        addContact(contactName, initiales, color, number);
    }
}
*/
