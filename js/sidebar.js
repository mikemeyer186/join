// Vorbereitung für Aufteilung unter den Seiten 

function highlightedLegalNotice() {
    document.getElementById("navSummary").classList.remove('navHighlighted');
    document.getElementById("navBoard").classList.remove('navHighlighted');
    document.getElementById("navTask").classList.remove('navHighlighted');
    document.getElementById("navContacts").classList.remove('navHighlighted');
    document.getElementById("legalNotice").classList.add('navHighlighted');
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/infoIconHighlighted.png";
  }
function highlightedNavbar(i) {
    let index = i;
    if (index == 1) {
    document.getElementById("navSummary").classList.add('navHighlighted');
    document.getElementById("navBoard").classList.remove('navHighlighted');
    document.getElementById("navTask").classList.remove('navHighlighted');
    document.getElementById("navContacts").classList.remove('navHighlighted');
    document.getElementById("legalNotice").classList.remove('navHighlighted');
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/iconInfo.png";
    }
    if (index == 2) {
    document.getElementById("navSummary").classList.remove('navHighlighted');
    document.getElementById("navBoard").classList.add('navHighlighted');
    document.getElementById("navTask").classList.remove('navHighlighted');
    document.getElementById("navContacts").classList.remove('navHighlighted');
    document.getElementById("legalNotice").classList.remove('navHighlighted');
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/iconInfo.png";
    }
    if (index == 3) {
    document.getElementById("navSummary").classList.remove('navHighlighted');
    document.getElementById("navBoard").classList.remove('navHighlighted');
    document.getElementById("navTask").classList.add('navHighlighted');
    document.getElementById("navContacts").classList.remove('navHighlighted');
    document.getElementById("legalNotice").classList.remove('navHighlighted');
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/iconInfo.png";
    }
    if (index == 4) {
    document.getElementById("navSummary").classList.remove('navHighlighted');
    document.getElementById("navBoard").classList.remove('navHighlighted');
    document.getElementById("navTask").classList.remove('navHighlighted');
    document.getElementById("navContacts").classList.add('navHighlighted');
    document.getElementById("legalNotice").classList.remove('navHighlighted');
    document.getElementById("legalNoticeInfoIcon").src ="./assets/img/icons/iconInfo.png";
    }
}