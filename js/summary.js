
async function summaryInit() {
    await includeHTML();
    await loadAccountsFromBackend();
    loadActiveUserLocal();
    highlightedNavbar(1);
    showGreeting();
    showActiveUserIcon();
}

function showGreeting(){
    let dateNow = new Date();
    let hours = dateNow.getHours();
    let greetingSlogan = returnGreetingSlogan(hours);
    document.getElementById('greeting-slogan').innerHTML = greetingSlogan;
    document.getElementById('greeting-name').innerHTML = userAccounts[activeUser].userName;
}

function returnGreetingSlogan(hours){
    let greetingSlogan;
    if (hours < 6 || hours > 22) {
        greetingSlogan = 'Good night, ';
    }
    if (hours >= 6 && hours < 10){
        greetingSlogan = 'Good morning, ';
    }
    if (hours >= 10 && hours < 18){
        greetingSlogan = 'Have a nice day, ';
    }
    if (hours >= 18 && hours <= 22){
        greetingSlogan = 'Good evening, ';
    }
    return greetingSlogan;
}