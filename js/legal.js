async function legalInit(){
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    showActiveUserIcon();
    highlightedLegalNotice();
}
