function renderContacts() {
    let content = document.getElementById('contacts-content');
    content.innerHTML = '';

    for (let i = 0; i < activeUser['userContacts'].length; i++) {
        const contact = activeUser['userContacts'][i];

        content.innerHTML += `<div>${contact}</div>`;
    }
}
