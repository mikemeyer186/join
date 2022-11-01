async function helpInit() {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    showActiveUserIcon();
    highlightedNavbar(6);
}
