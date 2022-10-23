let filterLetters = [];

/**
 * initial function
 */
async function contactsInit() {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    highlightedNavbar(4);
    renderContacts();
}

/**
 * rendering contacts from user accounts (logged in user) in alphabetical sort
 */
function renderContacts() {
    let content = document.getElementById('contacts-content');
    let contactsArray = userAccounts[activeUser.userId].userContacts;
    content.innerHTML = '';
    getFirstLetter();

    for (let f = 0; f < filterLetters.length; f++) {
        const letter = filterLetters[f];
        let alphabet = contactsArray.filter((l) => l.contactInitials.charAt(0) == letter);
        content.innerHTML += alphabetCardTemplate(letter);

        for (let i = 0; i < alphabet.length; i++) {
            const contact = alphabet[i];
            content.innerHTML += contactCardTemplate(contact);
        }
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
 * adding new contact to user account
 */
function addContactToUser() {
    let inputName = document.getElementById('contact-name');
    let inputEmail = document.getElementById('contact-email');
    let inputPhone = document.getElementById('contact-phone');
    let inputInitials = getContactInitials(inputName.value);
    let inputColor = getRandomColor();
    let contactObject = {
        contactName: inputName.value,
        contactEmail: inputEmail.value,
        contactPhone: inputPhone.value,
        contactInitials: inputInitials,
        contactColor: inputColor,
    };
    userAccounts[activeUser.userId].userContacts.push(contactObject);
    saveAccountsToBackend();
    renderContacts();
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
 * @returns string with rgb-color
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
 * @returns random number
 */
function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * getting first letter of contact initials
 */
function getFirstLetter() {
    let contactsArray = userAccounts[activeUser.userId].userContacts;
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
 * opening detail view of selected contact
 * @param {string} contactEmail - email of selected user for identifying in array
 */
function openContactDetailView(contactEmail) {
    let contactIndex = getIndexOfContact(contactEmail);
    let contact = userAccounts[activeUser.userId].userContacts[contactIndex];
    let detailContent = document.getElementById('contacts-detail');
    document.getElementById('contacts-right').classList.remove('slided-out');
    detailContent.innerHTML = '';
    detailContent.innerHTML = contactDetailViewTemplate(contact, contactIndex);
}

/**
 * getting index of selected user in userContacts array
 * @param {string} search - email of selected user for identifying in array
 * @returns - index of contact in array
 */
function getIndexOfContact(search) {
    let contactsArray = userAccounts[activeUser.userId].userContacts;
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
    localStorage.setItem('editIndex', index);
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
    let contact = userAccounts[activeUser.userId].userContacts[index];
    document.getElementById('contact-profil-edit').innerHTML = editProfilPicTemplate(contact);
    document.getElementById('contact-name-edit').value = contact.contactName;
    document.getElementById('contact-email-edit').value = contact.contactEmail;
    document.getElementById('contact-phone-edit').value = contact.contactPhone;
}

/**
 * saving edited contact to userContacts array
 */
function saveEditContact() {
    let index = localStorage.getItem('editIndex');
    let contact = userAccounts[activeUser.userId].userContacts[index];
    contact.contactName = document.getElementById('contact-name-edit').value;
    contact.contactEmail = document.getElementById('contact-email-edit').value;
    contact.contactPhone = document.getElementById('contact-phone-edit').value;
    openContactDetailView(contact.contactEmail);
    renderContacts();
    hideEditContactPopUp();
    saveAccountsToBackend();
    slidePopupIntoView('edited-popup');
}

/**
 * sliding the popup from the bottom of page into view
 * sliding out of view after 3 seconds
 * @param {string} id - id of html element
 */
function slidePopupIntoView(id) {
    document.getElementById(`${id}`).classList.add('slideIn');

    setTimeout(() => {
        document.getElementById(`${id}`).classList.remove('slideIn');
    }, 4000);
}

/**
 * html-template for contact card
 */
function contactCardTemplate(contact) {
    return /*html*/ `
        <div class="contact-card" onclick="openContactDetailView('${contact.contactEmail}')">
            <div class="contact-pic" style="background-color:${contact.contactColor}">
                <span class="contact-initials">${contact.contactInitials}</span>
            </div>
            <div class="contact-data">
                <div class="data-name">${contact.contactName}</div>
                <div class="data-mail">${contact.contactEmail}</div>
            </div>
        </div>
    `;
}

/**
 * html-template for alphabetical headline
 */
function alphabetCardTemplate(letter) {
    return /*html*/ `
    <div class="alphabet-card">
        <span class="alphabet-letter">${letter}</span>
    </div>
`;
}

/**
 * html-template for contact detail view
 */
function contactDetailViewTemplate(contact, contactIndex) {
    return /*html*/ `
        <div class="contacts-detail-top">
            <div class="contact-pic-detail" style="background-color:${contact.contactColor}">
                <span class="contact-initials-detail">${contact.contactInitials}</span>
            </div>
            <div class="contact-detail-name-box">
                <span class="contact-detail-name">${contact.contactName}</span>
                <div class="contact-detail-task"><span class="plus">+ </span>Add task</div>
            </div>
        </div>
        <div class="contacts-detail-bottom">
            <div class="contact-detail-info">
                <span class="info-headline">Contact information</span>
                <span class="info-subheadline">Email</span>
                <span class="info-email">${contact.contactEmail}</span>
                <span class="info-subheadline">Phone</span>
                <span class="info-phone">${contact.contactPhone}</span>
            </div>
            <div class="contact-detail-change" onclick="showEditContactPopUp(${contactIndex})">
                <img class="change-icon" src="./assets/img/icons/icon_edit_contact.png" alt="Edit contact">
                <span>Edit contact</span>
            </div>
        </div>
    `;
}

/**
 * html-template for profil pic in edit popup
 */
function editProfilPicTemplate(contact) {
    return /*html*/ `
        <div class="contact-pic-detail" style="background-color:${contact.contactColor}">
            <span class="contact-initials-detail">${contact.contactInitials}</span>
        </div>
    `;
}
