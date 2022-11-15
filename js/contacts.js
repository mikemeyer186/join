let filterLetters = [];
let contactList = [];

/**
 * initial function
 */
async function contactsInit() {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    highlightedNavbar(4);
    renderContacts();
    renderContactList();
    showActiveUserIcon();
    renderSubTask();
    loadTasksfromBackend();
    getSelectedSubtask();
}

/**
 * rendering contacts from user accounts (active user) in alphabetical order
 * in contactList array with register card
 */
function renderContacts() {
    let contactsArray = userAccounts[activeUser].userContacts;
    contactList = [];
    getFirstLetter();

    for (let f = 0; f < filterLetters.length; f++) {
        const letter = filterLetters[f];
        let alphabet = contactsArray.filter((l) => l.contactInitials.charAt(0) == letter);
        contactList.push(alphabetCardTemplate(letter));
        for (let i = 0; i < alphabet.length; i++) {
            const contact = alphabet[i];
            let index = getIndexOfContact(contact.contactEmail);
            contactList.push(contactCardTemplate(contact, index));
        }
    }
}

/**
 * rendering contactList in html element
 */
function renderContactList() {
    let content = document.getElementById('contacts-content');
    content.innerHTML = '';

    for (let i = 0; i < contactList.length; i++) {
        const element = contactList[i];
        content.innerHTML += element;
    }
}

/**
 * showing popup "new contact"
 */
function showNewContactPopUp() {
    document.getElementById('popup-bg').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('popup-contact').classList.add('popup-slideIn');
        document.getElementById('popup-bg').classList.remove('no-opacity');
    }, 10);
}

/**
 * hiding popup "new contact"
 */
function hideNewContactPopUp() {
    document.getElementById('popup-contact').classList.remove('popup-slideIn');
    document.getElementById('popup-bg').classList.add('no-opacity');

    setTimeout(() => {
        document.getElementById('popup-bg').classList.add('d-none');
    }, 250);
}

/**
 * changing color of close button to blue when hovering
 */
function blueCloseIcon() {
    document.getElementById('button-close').src = './assets/img/icons/icon_close_blue.png';
}

/**
 * changing color of close button to dark when mouse leaves the button
 */
function darkCloseIcon() {
    document.getElementById('button-close').src = './assets/img/icons/icon_close_dark.png';
}

/**
 * validation of input for contact name
 */
function inputValidation() {
    let inputName = document.getElementById('contact-name');
    if (inputName.value) {
        addContactToUser();
    } else {
        document.getElementById('contact-name').placeholder = 'Please enter contact name!';
        document.getElementById('contact-name').classList.add('fault-name');
    }
}

/**
 * validation of input for contact name
 */
function inputValidationEdit() {
    let inputNameEdit = document.getElementById('contact-name-edit');
    if (inputNameEdit.value) {
        saveEditContact();
    } else {
        document.getElementById('contact-name-edit').placeholder = 'Please enter contact name!';
        document.getElementById('contact-name-edit').classList.add('fault-name');
    }
}

/**
 * adding new contact to user account and show details
 */
function addContactToUser() {
    let inputName = document.getElementById('contact-name');
    let inputEmail = document.getElementById('contact-email');
    let inputPhone = document.getElementById('contact-phone');
    let inputInitials = getContactInitials(inputName.value).toUpperCase();
    let inputColor = getRandomColor();
    let contactObject = {
        contactName: inputName.value,
        contactEmail: inputEmail.value,
        contactPhone: inputPhone.value,
        contactInitials: inputInitials,
        contactColor: inputColor,
    };
    userAccounts[activeUser].userContacts.push(contactObject);
    saveAndRender();
    openContactDetailView(contactList.length - filterLetters.length - 1);
}

/**
 * adding new contact to user account and show details
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
    selectorContactIndex--;
    renderingContactsSelector();
}

/**
 * saving, clearing and rendering contacts after adding new contact
 */
function saveAndRender() {
    saveAccountsToBackend();
    renderContacts();
    renderContactList();
    clearAndHidePopUp();
    slidePopupIntoView('created-popup');
}

/**
 * clearing the inputs of popup "new contact" when closing
 */
function clearAndHidePopUp() {
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-name').placeholder = 'Name';
    document.getElementById('contact-name').classList.remove('fault-name');
    hideNewContactPopUp();
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
 * getting first letter of contact initials
 */
function getFirstLetter() {
    let contactsArray = userAccounts[activeUser].userContacts;
    filterLetters = [];

    for (let i = 0; i < contactsArray.length; i++) {
        const initials = contactsArray[i].contactInitials;
        let firstLetter = initials.charAt(0);
        let index = getIndexOfFirstLetter(firstLetter);
        if (index < 0) {
            filterLetters.push(firstLetter.toString());
        }
    }
    filterLetters.sort();
}

/**
 * getting index of first letter in "filterLetters" array
 * @param {string} firstLetter - first letter
 * @returns - index of letter in array
 */
function getIndexOfFirstLetter(firstLetter) {
    let index = filterLetters.indexOf(firstLetter);
    return index;
}

/**
 * opening detail view of selected contact if there is any contact in array
 * @param {number} index - index of selected user for identifying in array
 */
function openContactDetailView(index) {
    let contact = userAccounts[activeUser].userContacts[index];
    let detailContent = document.getElementById('contacts-detail');
    if (contact) {
        localStorage.setItem('contactIndex', index);
        document.getElementById('contacts-right').classList.add('slided-in');
        detailContent.innerHTML = '';
        detailContent.innerHTML = contactDetailViewTemplate(contact, index);
        changeColorOfSelectedCard();
    } else {
        document.getElementById('contacts-right').classList.remove('slided-in');
    }
}

/**
 * closing detail view when clicking on close icon
 */
function closeContactDetailView() {
    document.getElementById('contacts-right').classList.remove('slided-in');
}

/**
 * changing the bg-color of selected contact card
 * @param {number} index - index of contact in userAccounts array
 */
function changeColorOfSelectedCard() {
    let index = localStorage.getItem('contactIndex');
    let contactsLength = contactList.length - filterLetters.length;
    for (let i = 0; i < contactsLength; i++) {
        document.getElementById(`contact-id-${i}`).classList.remove('card-bg-blue');
    }

    document.getElementById(`contact-id-${index}`).classList.add('card-bg-blue');
}

/**
 * getting index of selected user in userContacts array
 * @param {string} search - email of selected user for identifying in array
 * @returns - index of contact in array
 */
function getIndexOfContact(search) {
    let contactsArray = userAccounts[activeUser].userContacts;
    let index;
    contactsArray.find((c, i) => {
        if (c.contactEmail == search) {
            index = i;
        }
    });
    return index;
}

/**
 * showing popup "edit contact"
 */
function showEditContactPopUp(index) {
    document.getElementById('popup-bg-edit').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('popup-contact-edit').classList.add('popup-slideIn');
        document.getElementById('popup-bg-edit').classList.remove('no-opacity');
    }, 10);

    fillContactEditInputs(index);
}

/**
 * hiding popup "edit contact"
 */
function hideEditContactPopUp() {
    document.getElementById('popup-contact-edit').classList.remove('popup-slideIn');
    document.getElementById('popup-bg-edit').classList.add('no-opacity');

    setTimeout(() => {
        document.getElementById('popup-bg-edit').classList.add('d-none');
    }, 250);
}

/**
 * filling inputs of edit popup
 * @param {number} index - index of contact in userContacts array
 */
function fillContactEditInputs(index) {
    let contact = userAccounts[activeUser].userContacts[index];
    document.getElementById('contact-profil-edit').innerHTML = editProfilPicTemplate(contact);
    document.getElementById('contact-name-edit').value = contact.contactName;
    document.getElementById('contact-email-edit').value = contact.contactEmail;
    document.getElementById('contact-phone-edit').value = contact.contactPhone;
}

/**
 * saving edited contact to userContacts array
 */
function saveEditContact() {
    let index = localStorage.getItem('contactIndex');
    let contact = userAccounts[activeUser].userContacts[index];
    let oldContactName = contact.contactName;
    contact.contactName = document.getElementById('contact-name-edit').value;
    contact.contactEmail = document.getElementById('contact-email-edit').value;
    contact.contactPhone = document.getElementById('contact-phone-edit').value;
    contact.contactInitials = getContactInitials(contact.contactName);
    openContactDetailView(index);
    saveAndRenderEdit('edited-popup');
    changeColorOfSelectedCard();
    changeContactDataInTasks(index, oldContactName);
}

/**
 * deleting contact
 */
function deleteContact() {
    let index = localStorage.getItem('contactIndex');
    let userContacts = userAccounts[activeUser].userContacts;
    userContacts.splice(index, 1);
    openContactDetailView(0);
    saveAndRenderEdit('deleted-popup');
}

/**
 * saving, clearing and rendering contacts after editing contact
 */
function saveAndRenderEdit(popup) {
    renderContacts();
    renderContactList();
    hideEditContactPopUp();
    saveAccountsToBackend();
    slidePopupIntoView(popup);
}

/**
 * showing add task popup with white header
 */
function showAddTaskPopup() {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    let index = localStorage.getItem('contactIndex');
    contactCheckedValue = [
        {
            contactName: activeUserContacts[index].contactName,
            abbreviation: activeUserContacts[index].contactInitials,
            paint: activeUserContacts[index].contactColor,
        },
    ];

    document.getElementById('selectorContactRenderPopup').innerHTML = ``;
    document.getElementById('addTaskPopup').classList.toggle('translate0');
    document.getElementById('mobiletaskheader').classList.toggle('headerSlideIn');
}

/**
 * rendering contacts in addTask popup and selecting contact
 */
function renderingContactsSelectorPopup(index) {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    let selectorContactPopup = document.getElementById('selectorContactRenderPopup');

    if (selectorContactIndex == 0) {
        document.getElementById('selectorContactRenderPopup').innerHTML = ``;
        fillContactPopUp(activeUserContacts, selectorContactPopup);
        selectorContactIndex++;
    } else {
        selectorContactPopup.innerHTML = ``;
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
