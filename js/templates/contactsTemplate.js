/**
 * html-template for contact card
 * @param {JSON} contact - userContact
 * @param {number} index - index of contact
 * @returns - html
 */
function contactCardTemplate(contact, index) {
    return /*html*/ `
        <div id="contact-id-${index}" class="contact-card" onclick="openContactDetailView(${index})">
            <div class="contact-pic" style="background-color:${contact.contactColor}">
                <span class="contact-initials">${contact.contactInitials}</span>
            </div>
            <div class="contact-data">
                <div class="data-name" title="${contact.contactName}">${contact.contactName}</div>
                <div class="data-mail" title="${contact.contactEmail}">${contact.contactEmail}</div>
            </div>
        </div>
    `;
}

/**
 * html-template for alphabetical headline
 * @param {string} letter - alphabetical letter
 * @returns - html
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
 * @param {JSON} contact - userContact
 * @param {number} index - index of contact
 * @returns - html
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
                <div onclick="toggleAddTaskPopup(1, 1, 'in')" class="contact-detail-task"><span class="plus">+ </span>Add task</div>
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
 * @param {JSON} contact - userContact
 * @returns - html
 */
function editProfilPicTemplate(contact) {
    return /*html*/ `
        <div class="contact-pic-detail" style="background-color:${contact.contactColor}">
            <span class="contact-initials-detail">${contact.contactInitials}</span>
        </div>
    `;
}
