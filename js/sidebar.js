/**
 * highlighting selected navigation element
 * @param {number} item - index of navigation object (1 - 5)
 */
function highlightedNavbar(item) {
    noHighlightNav();

    if (item == 1) {
        highlightSelectedNav('navSummary');
        highlightSelectedNav('navSummary-mobile');
    }
    if (item == 2) {
        highlightSelectedNav('navBoard');
        highlightSelectedNav('navBoard-mobile');
    }
    if (item == 3) {
        highlightSelectedNav('navTask');
        highlightSelectedNav('navTask-mobile');
    }
    if (item == 4) {
        highlightSelectedNav('navContacts');
        highlightSelectedNav('navContacts-mobile');
    }
    if (item == 5) {
        highlightSelectedNav('legalNotice');
    }
}

/**
 * adding highlighting class to navigation element and removing classes from other elements
 * @param {string} element - id of navigation element
 */
function highlightSelectedNav(element) {
    document.getElementById(`${element}`).classList.add('navHighlighted');
}

/**
 * removing class from all elements
 */
function noHighlightNav() {
    let navElements = document.querySelectorAll('a.sidebarBox');

    for (let i = 0; i < navElements.length; i++) {
        const element = navElements[i];
        element.classList.remove('navHighlighted');
    }
}
