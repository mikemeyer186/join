function highlightedLegalNotice() {
    document.getElementById("legalNotice").classList.add("legalNoticeHighlighted");
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/infoIconHighlighted.png";
  }
function highlightedNavbar(i) {
    let index = i;
    let summary = document.getElementById("navSummary");
    let board = document.getElementById("navBoard");
    let task = document.getElementById("navTask");
    let contacts = document.getElementById("navContacts"); 
    if (index == 1) {
    summary.classList.add('navHighlighted');
    board.classList.remove('navHighlighted');
    task.classList.remove('navHighlighted');
    contacts.classList.remove('navHighlighted');
    }
    if (index == 2) {
    summary.classList.remove('navHighlighted');
    board.classList.add('navHighlighted');
    task.classList.remove('navHighlighted');
    contacts.classList.remove('navHighlighted');
    }
    if (index == 3) {
    summary.classList.remove('navHighlighted');
    board.classList.remove('navHighlighted');
    task.classList.add('navHighlighted');
    contacts.classList.remove('navHighlighted');
    }
    if (index == 4) {
    summary.classList.remove('navHighlighted');
    board.classList.remove('navHighlighted');
    task.classList.remove('navHighlighted');
    contacts.classList.add('navHighlighted');
    }
}