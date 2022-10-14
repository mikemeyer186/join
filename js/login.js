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
    document.getElementById('login-signup-box').classList.remove('no-opacity');
}

function showSignUpBox() {
    document.getElementById('login-box').classList.add('d-none');
    document.getElementById('signup-box').classList.remove('d-none');
    document.getElementById('login-logo-white').classList.remove('no-opacity');
    document.getElementById('login-logo-blue').classList.add('no-opacity');
    document.getElementById('login-page').classList.remove('pageColorChange');
    document.getElementById('login-signup-box').classList.add('d-none');
}
