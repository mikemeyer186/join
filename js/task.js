/**
 * adding new contact to user account
 */
function addContactToUserFromTask() {
    let inputName = document.getElementById('selectContact');
    let inputEmail = document.getElementById('selectContact');
    let inputPhone = '';
    let inputInitials = getContactInitials(inputName.value).toUpperCase();
    let inputColor = getRandomColor();
    let contactObject = {
        contactName: inputName.value,
        contactEmail: inputEmail.value,
        contactPhone: inputPhone,
        contactInitials: inputInitials,
        contactColor: inputColor,
    };
    userAccounts[activeUser].userContacts.push(contactObject);
    saveAccountsToBackend();
    rechangeContactInput();
    selectorContactIndex = 0;
    addNewContactToSelector(userAccounts[activeUser].userContacts.length - 1);
    showAssignedContacts();
}

/**
 * showing add task popup with white header
 */
function showAddTaskPopup(mode) {
    let index = localStorage.getItem('contactIndex');
    let activeUserContacts = userAccounts[activeUser].userContacts;

    setCheckedContacts(mode, index, activeUserContacts);
    document.getElementById('selectorContactRenderPopup').innerHTML = ``;
    document.getElementById('addTaskPopup').classList.toggle('translate0');
    document.getElementById('mobiletaskheader').classList.toggle('headerSlideIn');
    showAssignedContacts();
}

function setCheckedContacts(mode, index, activeUserContacts) {
    if (mode == 1) {
        contactCheckedValue = [
            {
                contactName: activeUserContacts[index].contactName,
                abbreviation: activeUserContacts[index].contactInitials,
                paint: activeUserContacts[index].contactColor,
            },
        ];
    } else {
        contactCheckedValue = [];
    }
}

/**
 * adding new contact to selected contacts of task
 * @param {number} contactIndex - index of new conact in userContacts
 */
function addNewContactToSelector(contactIndex) {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    newContactCheckedValue = {
        contactName: activeUserContacts[contactIndex].contactName,
        abbreviation: activeUserContacts[contactIndex].contactInitials,
        paint: activeUserContacts[contactIndex].contactColor,
    };
    contactCheckedValue.push(newContactCheckedValue);
    showAssignedContacts();
}

/**
 * showing assigned contacts in task popup
 */
function showAssignedContacts() {
    document.getElementById('selectorContactAssigned').innerHTML = contactCheckedValue.length;
}

/**
 * rendering contacts in addTask popup and selecting contact
 */
function renderingContactsSelectorPopup(index) {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    let selectorContactPopup = document.getElementById('selectorContactRenderPopup');
    selectorContactPopup.innerHTML = ``;

    if (selectorContactIndex == 0) {
        fillContactPopUp(activeUserContacts, selectorContactPopup);
        selectorContactIndex++;
    } else {
        selectorContactIndex--;
    }
}

/**
 * filling contact selection popup
 * @param {JSON} activeUserContacts - userContacts
 * @param {object} selectorContactPopup - html-id
 */
function fillContactPopUp(activeUserContacts, selectorContactPopup) {
    for (let i = 0; i < activeUserContacts.length; i++) {
        if (findContact(activeUserContacts[i].contactName) === true) {
            selectorContactPopup.innerHTML += checkedContactsTemplate(activeUserContacts, i);
        } else {
            selectorContactPopup.innerHTML += uncheckedContactsTemplate(activeUserContacts, i);
        }
    }
    selectorContactPopup.innerHTML += newContactTemplate();
}

/**
 * searching for contact name in contactCheckedValue
 * @param {string} name - contact name
 * @returns - boolean
 */
function findContact(name) {
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == name) {
            return true;
        }
    }
}

/**
 * pushing or splicing selected contact in selection of task
 * @param {string} contactname - name of contact
 * @param {string} initiales - initials of contact
 * @param {string} color - rgb color of contact
 * @param {number} number - id of contact in html-id
 */
function selectedContactPopup(contactname, initiales, color, number) {
    let index = findContactIndex(contactname);

    if (document.getElementById('popup' + number + contactname).classList.contains('checked')) {
        spliceContact(index, contactname, number);
    } else {
        pushContact(contactname, initiales, color, number);
    }
    showAssignedContacts();
}

/**
 * splicing selected contact from contactCheckedValue
 * @param {number} index - index of contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @param {number} number - id of contact in html-id
 */
function spliceContact(index, contactname, number) {
    contactCheckedValue.splice(index, 1);
    document.getElementById('popup' + number + contactname).classList.remove('checked');
    document.getElementById('popup' + number + contactname).src = './assets/img/icons/checkButton.png';
}

/**
 * pushing selected contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @param {string} initiales - initials of contact
 * @param {string} color - rgb color of contact
 * @param {number} number - id of contact in html-id
 */
function pushContact(contactname, initiales, color, number) {
    contactCheckedValue.push({
        contactName: contactname,
        abbreviation: initiales,
        paint: color,
    });
    document.getElementById('popup' + number + contactname).src = './assets/img/icons/checkButtonChecked.png';
    document.getElementById('popup' + number + contactname).classList.add('checked');
}

/**
 * finding index of contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @returns - index
 */
function findContactIndex(contactname) {
    let index;
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == contactname) {
            index = i;
        }
    }
    return index;
}

/**
 * changing contact data in tasks (initials, contactname)
 */
async function changeContactDataInTasks(index, oldContactName) {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].assignedTo.length; j++) {
            const contact = tasks[i].assignedTo[j];
            if (contact.contactName == oldContactName) {
                tasks[i].assignedTo[j].abbreviation = userAccounts[activeUser].userContacts[index].contactInitials;
                tasks[i].assignedTo[j].contactName = userAccounts[activeUser].userContacts[index].contactName;
            }
        }
    }
    await pushTasksinBackend();
}
