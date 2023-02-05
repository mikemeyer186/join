/**
 * Change the contact selector in a input field
 */
function changeInputContact() {
    document.getElementById('selectorContact').innerHTML = `
    <div>
    <div class="checkAndCrossIconsEmail">
          <i onclick="rechangeContactInput(); showAssignedContacts()" class="fa-solid fa-xmark fa-xl contactX pointer"></i> 
          <img src="./assets/img/icons/trennstrich.png">
          <i onclick="addContactToUserFromTask()" class=" pointer fa-solid fa-check fa-xl contactCheck"></i>
          </div>
    <input id="selectContact" type="email" placeholder="Enter E-mail of new contact" required>
    </div>`;
}

/**
 * rechange the contact input in a selector
 */
function rechangeContactInput() {
    selectorContactIndex = 0;
    document.getElementById('selectorContact').innerHTML = /*html*/ `
    <div onclick="renderingContactsSelectorPopup(localStorage.getItem('contactIndex'))" class="selectorHeader pointer">
      <div>
        <span>Selected contacts to assign</span>
        <span id="selectorContactAssigned"></span>
      </div>
      <img class="selectorArrow" src="./assets/img/selectorArrow.png" />
    </div>
    <div id="selectorContactRenderPopup">
      <!-- renderzone for contact selector -->
    </div>`;
}

/**
 * rendering contacts in addTask
 */
function renderingContactsSelector() {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    if (selectorContactIndex == 0) {
        contactCheckedValue = [];
        document.getElementById('selectorContactRender').innerHTML = ``;
        for (let i = 0; i < activeUserContacts.length; i++) {
            document.getElementById('selectorContactRender').innerHTML += `
          <div onclick="selectedContact('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
          </div>
          </div>
        `;
        }
        document.getElementById('selectorContactRender').innerHTML += `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <nobr>Invite new contact</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
          </div>
          </div>`;
        selectorContactIndex++;
    } else {
        document.getElementById('selectorContactRender').innerHTML = ``;
        selectorContactIndex--;
    }
}
