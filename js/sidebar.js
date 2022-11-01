/**
 * highlighting selected navigation element
 * @param {number} item - index of navigation object (1 - 5)
 */
function highlightedNavbar(item) {
    if (item == 1) {
        highlightSelectedNav('navSummary');
    }
    if (item == 2) {
        highlightSelectedNav('navBoard');
    }
    if (item == 3) {
        highlightSelectedNav('navTask');
    }
    if (item == 4) {
        highlightSelectedNav('navContacts');
    }
    if (item == 5) {
        highlightSelectedNav('legalNotice');
    }
}

/**
 * adding highlighting class to navigation element and removes class from other elements
 * @param {string} element - id of navigation element
 */
function highlightSelectedNav(element) {
    document.getElementById('navSummary').classList.remove('navHighlighted');
    document.getElementById('navBoard').classList.remove('navHighlighted');
    document.getElementById('navTask').classList.remove('navHighlighted');
    document.getElementById('navContacts').classList.remove('navHighlighted');
    document.getElementById('legalNotice').classList.remove('navHighlighted');
    document.getElementById(`${element}`).classList.add('navHighlighted');
}
