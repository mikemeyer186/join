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
    } else {
        noHighlightNav();
    }
}

/**
 * adding highlighting class to navigation element and removing classes from other elements
 * @param {string} element - id of navigation element
 */
function highlightSelectedNav(element) {
    noHighlightNav();
    document.getElementById(`${element}`).classList.add('navHighlighted');
}

/**
 * removing class from all elements
 * @param {string} element - id of navigation element
 */
function noHighlightNav() {
    document.getElementById('navSummary').classList.remove('navHighlighted');
    document.getElementById('navBoard').classList.remove('navHighlighted');
    document.getElementById('navTask').classList.remove('navHighlighted');
    document.getElementById('navContacts').classList.remove('navHighlighted');
    document.getElementById('legalNotice').classList.remove('navHighlighted');
}
