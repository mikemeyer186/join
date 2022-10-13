function loginInit() {
    setTimeout(changeColorsOfLoginScreen, 1000);
}

function changeColorsOfLoginScreen() {
    document.getElementById('login-page').classList.add('pageColorChange');
    document.getElementById('login-logo-white').classList.add('logoMovement');
    document.getElementById('login-logo-white').classList.add('no-opacity');
    document.getElementById('login-logo-blue').classList.add('logoMovement');
    document.getElementById('login-logo-blue').classList.remove('no-opacity');
    document.getElementById('login-box').classList.remove('no-opacity');
}
