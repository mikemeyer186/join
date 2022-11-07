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
 * adding new contact to user account and show details
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
 * opening detail view of selected contact
 * @param {number} index - index of selected user for identifying in array
 */
function openContactDetailView(index) {
    let contact = userAccounts[activeUser].userContacts[index];
    let detailContent = document.getElementById('contacts-detail');
    localStorage.setItem('contactIndex', index);
    document.getElementById('contacts-right').classList.add('slided-in');
    detailContent.innerHTML = '';
    detailContent.innerHTML = contactDetailViewTemplate(contact, index);
    changeColorOfSelectedCard();
}

function closeContactDetailView(){
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
    contact.contactName = document.getElementById('contact-name-edit').value;
    contact.contactEmail = document.getElementById('contact-email-edit').value;
    contact.contactPhone = document.getElementById('contact-phone-edit').value;
    openContactDetailView(index);
    saveAndRenderEdit();
    changeColorOfSelectedCard();
}

function deleteContact() {
    let index = localStorage.getItem('contactIndex');
    let userContacts = userAccounts[activeUser].userContacts;
    userContacts.splice(index, 1);
    openContactDetailView(0);
    saveAndRenderEdit();
}

/**
 * saving, clearing and rendering contacts after editing contact
 */
function saveAndRenderEdit() {
    renderContacts();
    renderContactList();
    hideEditContactPopUp();
    saveAccountsToBackend();
    slidePopupIntoView('deleted-popup');
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
function contactCardTemplate(contact, index) {
    return /*html*/ `
        <div id="contact-id-${index}" class="contact-card" onclick="openContactDetailView(${index})">
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
function contactDetailViewTemplate(contact, index) {
    return /*html*/ `
        <div class="contacts-detail-top">
            <img class="contact-detail-back" src="./assets/img/arrow_left.png" alt="Back" onclick="closeContactDetailView()">
            <div class="contact-pic-detail" style="background-color:${contact.contactColor}">
                <span class="contact-initials-detail">${contact.contactInitials}</span>
            </div>
            <div class="contact-detail-name-box">
                <span class="contact-detail-name">${contact.contactName}</span>
                <div onclick="showAddTaskPopup()" class="contact-detail-task"><span class="plus">+ </span>Add task</div>
            </div>
        </div>
        <div class="contacts-detail-bottom">
            <div class="contact-detail-info">
                <span class="info-headline">Contact information</span>
                <span class="info-subheadline">Email</span>
                <a href="mailto:${contact.contactEmail}"><span class="info-email">${contact.contactEmail}</span></a>
                <span class="info-subheadline">Phone</span>
                <a href="tel:${contact.contactPhone}"><span class="info-phone">${contact.contactPhone}</span></a>
            </div>
            <div class="contact-detail-change" onclick="showEditContactPopUp(${index})">
                <img class="change-icon" src="./assets/img/icons/icon_edit_contact.png" alt="Edit contact">
                <img class="change-icon-mobile" src="./assets/img/editButton.png" alt="Edit contact">
                <span class="change-icon-text">Edit contact</span>
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
function showAddTaskPopup() {
    document.getElementById('addTaskPopup').classList.toggle('translate0');
    document.getElementById('mobiletaskheader').classList.toggle('headerSlideIn');
}

/**
 * rendering contacts in addTask Popup at board
 */
 function renderingContactsSelectorPopup(index) {
    contactCheckedValue = userAccounts[activeUser].userContacts[index];
    let activeUserContacts = userAccounts[activeUser].userContacts;
    if (selectorContactIndex == 0) {
      document.getElementById("selectorContactRenderPopup").innerHTML = ``;
      for (let i = 0; i < activeUserContacts.length; i++) {
        if (findContact(activeUserContacts[i].contactName) === true) {
          document.getElementById("selectorContactRenderPopup").innerHTML += `
          <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" class="checked" src="./assets/img/icons/checkButtonChecked.png">
          </div>
          </div>
        `;
        } else {
          document.getElementById("selectorContactRenderPopup").innerHTML += `
          <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
          </div>
          </div>
        `;
        }
      }
      document.getElementById("selectorContactRenderPopup").innerHTML += `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <nobr>Invite new contact</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
          </div>
          </div>`;
      selectorContactIndex++;
    } else {
      
      document.getElementById("selectorContactRenderPopup").innerHTML = ``;
      selectorContactIndex--;
    }
  }
  
  function findContact(name) {
      if (contactCheckedValue.contactName == name) {
        return true;
      }
    }
  /**
 * save selected contactsPopup
 */
function selectedContactPopup(name, initiales, color, number) {
    if (document.getElementById("popup" + number + name).classList == "checked") {
      let index = -1;
      contactCheckedValue.find(function (name, i) {
        if (contactCheckedValue.name === name) {
          index = i;
        }
      });
      contactCheckedValue.splice(index, 1);
      document
        .getElementById("popup" + number + name)
        .classList.remove("checked");
      document.getElementById("popup" + number + name).src =
        "./assets/img/icons/checkButton.png";
      console.log(contactCheckedValue);
    } else {
      contactCheckedValue.push({
        contactName: name,
        abbreviation: initiales,
        paint: color,
      });
      console.log(contactCheckedValue);
      document.getElementById("popup" + number + name).src =
        "./assets/img/icons/checkButtonChecked.png";
      document.getElementById("popup" + number + name).classList.add("checked");
    }
  }