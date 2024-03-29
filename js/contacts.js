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
 * rendering contactList
 */
function renderContactList() {
    let content = document.getElementById('contacts-content');
    content.innerHTML = '';

    if (contactList.length > 0) {
        for (let i = 0; i < contactList.length; i++) {
            const element = contactList[i];
            content.innerHTML += element;
        }
    } else {
        content.innerHTML = noContactTemplate();
    }
}

/**
 * showing popup "new contact"
 */
function showNewContactPopUp() {
    document.getElementById('popup-bg').classList.remove('d-none');
    document.getElementById('page-container').classList.toggle('overflowHidden');

    setTimeout(() => {
        document.getElementById('popup-contact').classList.add('popup-slideIn');
        document.getElementById('popup-bg').classList.remove('no-opacity');
    }, 10);
}

/**
 * hiding popup "new contact"
 */
function hideNewContactPopUp() {
    document.getElementById('addTaskPopup').classList.remove('translate0');
    document.getElementById('mobiletaskheader').classList.remove('headerSlideIn');
    document.getElementById('popup-contact').classList.remove('popup-slideIn');
    document.getElementById('popup-bg').classList.add('no-opacity');
    document.getElementById('page-container').classList.toggle('overflowHidden');

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
    let contactName = userAccounts[activeUser].userContacts[index].contactName;
    let contactColor = userAccounts[activeUser].userContacts[index].contactColor;
    userContacts.splice(index, 1);
    openContactDetailView(0);
    saveAndRenderEdit('deleted-popup');
    deleteContactDataInTasks(contactName, contactColor);
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
