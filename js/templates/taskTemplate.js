/**
 * html-template for checked contacts
 * @param {JSON} activeUserContacts - userContacts for selectors
 * @param {number} i - index of contact
 * @returns - html
 */
function checkedContactsTemplate(activeUserContacts, i) {
    return /*html*/ `
    <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
        <nobr>${activeUserContacts[i].contactName}</nobr>
        <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" class="checked" src="./assets/img/icons/checkButtonChecked.png">
        </div>
    </div>
`;
}

/**
 * html-template for unchecked contacts
 * @param {JSON} activeUserContacts - userContacts for selectors
 * @param {number} i - index of contact
 * @returns - html
 */
function uncheckedContactsTemplate(activeUserContacts, i) {
    return /*html*/ `
        <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
        <nobr>${activeUserContacts[i].contactName}</nobr>
        <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
        </div>
        </div>
    `;
}

/**
 * html-template for new contact
 * @returns - html
 */
function newContactTemplate() {
    return /*html*/ `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <nobr>Invite new contact</nobr>
            <div id="contactSelectorCheckboxes">
                <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
            </div>
        </div>
    `;
}
