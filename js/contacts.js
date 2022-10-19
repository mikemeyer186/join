function renderContacts() {
    let content = document.getElementById('contacts-content');
    content.innerHTML = '';

    for (let i = 0; i < activeUser['userContacts'].length; i++) {
        const contact = activeUser['userContacts'][i];

        content.innerHTML += `<div>${contact}</div>`;
    }
}

function showNewContactPopUp() {
    document.getElementById('popup-bg').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('popup-contact').classList.add('popup-slideIn');
        document.getElementById('popup-bg').classList.remove('no-opacity');
    }, 10);
}

function hideNewContactPopUp() {
    document.getElementById('popup-contact').classList.remove('popup-slideIn');
    document.getElementById('popup-bg').classList.add('no-opacity');

    setTimeout(() => {
        document.getElementById('popup-bg').classList.add('d-none');
    }, 250);
}

function blueCloseIcon() {
    document.getElementById('button-close').src = './assets/img/icons/icon_close_blue.png';
}

function darkCloseIcon() {
    document.getElementById('button-close').src = './assets/img/icons/icon_close_dark.png';
}

/**
 * stopping propagation of child elements
 */
function stopPropagate(event) {
    event.stopPropagation();
}
