/**
 * init function when body loads in index.html
 */
function loginInit() {
    setTimeout(changeColorsOfLoginScreen, 1000);
}

/**
 * changing the colors of the login screen and moving the logo to the left after 1 second
 */
function changeColorsOfLoginScreen() {
    document.getElementById('login-page').classList.add('pageColorChange');
    document.getElementById('login-logo-white').classList.add('logoMovement');
    document.getElementById('login-logo-white').classList.add('no-opacity');
    document.getElementById('login-logo-blue').classList.add('logoMovement');
    document.getElementById('login-logo-blue').classList.remove('no-opacity');
    document.getElementById('login-box').classList.remove('no-opacity');
    document.getElementById('login-signup-box').classList.remove('no-opacity');
}

/**
 * showing the sign up box und changing the colors of login screen when button "sign up" is clicked
 */
function showSignUpBox() {
    document.getElementById('login-box').classList.add('d-none');
    document.getElementById('signup-box').classList.remove('d-none');
    document.getElementById('login-logo-white').classList.remove('no-opacity');
    document.getElementById('login-logo-blue').classList.add('no-opacity');
    document.getElementById('login-page').classList.remove('pageColorChange');
    document.getElementById('login-signup-box').classList.add('d-none');
}

/**
 * showing the password visibility icon when entered some text in password inputfield
 */
function showVisibilityIcon(element) {
    let inputPassword = document.getElementById(`${element}-input-password`);
    if (inputPassword.value) {
        document.getElementById(`${element}-icon-password`).classList.add('d-none');
        document.getElementById(`${element}-icon-password-visibility`).classList.remove('d-none');
    } else {
        document.getElementById(`${element}-icon-password`).classList.remove('d-none');
        document.getElementById(`${element}-icon-password-visibility`).classList.add('d-none');
    }
}

/**
 * toggeling the password input to visible and non-visible when "eye-icon" is clicked
 */
function setInputToText(element) {
    let inputPassword = document.getElementById(`${element}-input-password`);
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        document.getElementById(`${element}-icon-password-visibility`).src = './assets/img/icons/icon_password_visible.png';
    } else {
        inputPassword.type = 'password';
        document.getElementById(`${element}-icon-password-visibility`).src = './assets/img/icons/icon_password_nonvisible.png';
    }
}
