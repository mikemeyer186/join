async function legalInit() {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    showActiveUserIcon();
    highlightedNavbar(5);
}
