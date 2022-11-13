/**
 * init function when body loads in index.html
 */
function loginInit() {
    setTimeout(changeColorsOfLoginScreen, 1000);
    loadAccountsFromBackend();
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
    hideLoginFault();
    hideLoginFaultMail();
}

/**
 * showing the password visibility icon when entered some text in password inputfield
 * @param {string} element - element name "login", "signup" or "reset"
 */
function showVisibilityIcon(element) {
    let inputPassword = document.getElementById(`${element}-input-password`);
    if (inputPassword.value) {
        hideLoginFault();
        document.getElementById(`${element}-icon-password`).classList.add('d-none');
        document.getElementById(`${element}-icon-password-visibility`).classList.remove('d-none');
    } else {
        document.getElementById(`${element}-icon-password`).classList.remove('d-none');
        document.getElementById(`${element}-icon-password-visibility`).classList.add('d-none');
    }
}

/**
 * toggeling the password input to visible and non-visible when "eye-icon" is clicked
 * @param {string} element - element name "login" or "signup"
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

/**
 * signing up new users and generating json
 * switching back to login box with filled inputs
 */
function signUpNewUser() {
    let signUpName = document.getElementById('signup-input-name').value;
    let signUpEmail = document.getElementById('signup-input-email').value;
    let signUpPassword = document.getElementById('signup-input-password').value;
    let signUpId = userAccounts.length;
    let signUpColor = getRandomColor();
    let signUpInitials = getUserInitials(signUpName);
    let newUser = {
        userId: signUpId,
        userName: signUpName,
        userEmail: signUpEmail,
        userPassword: signUpPassword,
        userColor: signUpColor,
        userInitials: signUpInitials,
        userContacts: [],
        userTasks: [],
    };
    userAccounts.push(newUser);
    saveAccountsToBackend();
    goBackToLogin(signUpEmail, signUpPassword);
}

/**
 * generating random rgb-colors
 * @returns string with rgb-color
 */
function getRandomColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    let rgbColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return rgbColor;
}

/**
 * generating random number betwenn 0 and 255
 * @param {number} max - is 255 for rgb
 * @returns random number
 */
function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * getting users initials (first letter of firstname and lastname)
 * @param {string} signUpName - username from sign up
 * @returns string with two letters
 */
function getUserInitials(signUpName) {
    let stringName = signUpName;
    let stringLetters = stringName.match(/\b(\w)/g);
    let initials;

    if (stringLetters.length > 1) {
        initials = stringLetters[0] + stringLetters[1];
    } else {
        initials = stringLetters[0];
    }
    return initials;
}

/**
 * switching back to login box with filled inputs after signing up new user
 * showing popup on bottom of the page
 * @param {*} signUpEmail - email from sign up
 * @param {*} signUpPassword - password from sign up
 */
function goBackToLogin(signUpEmail, signUpPassword) {
    document.getElementById('login-box').classList.remove('d-none');
    document.getElementById('signup-box').classList.add('d-none');
    document.getElementById('login-logo-white').classList.add('no-opacity');
    document.getElementById('login-logo-blue').classList.remove('no-opacity');
    document.getElementById('login-page').classList.add('pageColorChange');
    document.getElementById('login-signup-box').classList.remove('d-none');
    document.getElementById('login-input-email').value = signUpEmail;
    document.getElementById('login-input-password').value = signUpPassword;
    showVisibilityIcon('login');
    slidePopupIntoView('signup-popup');
}

/**
 * user login with email and password
 */
function loginUser() {
    let signUpEmail = document.getElementById('login-input-email');
    let signUpPassword = document.getElementById('login-input-password');
    let user = userAccounts.find((u) => u.userEmail == signUpEmail.value && u.userPassword == signUpPassword.value);

    if (user) {
        saveActiveUserLocal(user);
        window.location.href = './summary.html';
    } else {
        showLoginFault();
    }
}

/**
 * saving active user to local storage
 * @param {JSON} user - logged in user data
 */
function saveActiveUserLocal(user) {
    let activeUser = user.userId;
    localStorage.setItem('activeUser', activeUser);
}

/**
 * showing login fault "wrong password"
 */
function showLoginFault() {
    let signUpEmail = document.getElementById('login-input-email');
    let signUpPassword = document.getElementById('login-input-password');
    let mail = userAccounts.find((m) => m.userEmail == signUpEmail.value);
    let password = userAccounts.find((p) => p.userPassword == signUpPassword.value);

    if (!mail) {
        document.getElementById('login-fault-email').classList.remove('d-none');
    } else {
        document.getElementById('login-fault-password').classList.remove('d-none');
        signUpPassword.value = '';
        signUpPassword.placeholder = 'Ups! Try again';
    }

    showVisibilityIcon('login');
}

/**
 * hiding the login fault when user types password
 */
function hideLoginFault() {
    document.getElementById('login-fault-password').classList.add('d-none');
    document.getElementById('login-input-password').placeholder = 'Password';
}

function hideLoginFaultMail() {
    document.getElementById('login-fault-email').classList.add('d-none');
}

/**
 * loggin in as guest with filled login data
 */
function loginGuest() {
    document.getElementById('login-input-email').value = userAccounts[1]['userEmail'];
    document.getElementById('login-input-password').value = userAccounts[1]['userPassword'];
}

/**
 * sliding the popup from the bottom of page into view
 * sliding out of view after 3 seconds
 * @param {string} id - id of html element
 */
function slidePopupIntoView(id) {
    document.getElementById(`${id}`).classList.add('slideIn');

    setTimeout(() => {
        document.getElementById(`${id}`).classList.remove('slideIn');
    }, 4000);
}

/**
 * goin gback to login box
 */
function backToLoginBox() {
    document.getElementById('login-box').classList.remove('d-none');
    document.getElementById('signup-box').classList.add('d-none');
    document.getElementById('forgot-box').classList.add('d-none');
    document.getElementById('reset-box').classList.add('d-none');
    document.getElementById('login-logo-white').classList.add('no-opacity');
    document.getElementById('login-logo-blue').classList.remove('no-opacity');
    document.getElementById('login-page').classList.add('pageColorChange');
    document.getElementById('login-signup-box').classList.remove('d-none');
}

/**
 * showing password forgot box
 */
function showForgotBox() {
    document.getElementById('login-box').classList.add('d-none');
    document.getElementById('forgot-box').classList.remove('d-none');
    document.getElementById('login-logo-white').classList.remove('no-opacity');
    document.getElementById('login-logo-blue').classList.add('no-opacity');
    document.getElementById('login-page').classList.remove('pageColorChange');
    document.getElementById('login-signup-box').classList.add('d-none');
}

/**
 * sending reset email to signed up user or show fault message
 */
function sendResetEmail() {
    let forgotEmail = document.getElementById('forgot-input-email');
    let user = userAccounts.find((u) => u.userEmail == forgotEmail.value);

    if (user) {
        let userId = user.userId;
        localStorage.setItem('resetUserId', userId);
        showPasswordResetBox();
        slidePopupIntoView('forgot-popup');
    } else {
        showFault('forgot');
    }
}

/**
 * showing fault when mail oder password mismatched
 * @param {string} element - name of element "forgot" or "reset"
 */
function showFault(element) {
    document.getElementById(`${element}-fault`).classList.remove('d-none');
}

/**
 * hiding failt when user begins typing
 * @param {string} element - name of element "forgot" or "reset"
 */
function hideFault(element) {
    document.getElementById(`${element}-fault`).classList.add('d-none');
}

/**
 * showing password reset box
 */
function showPasswordResetBox() {
    document.getElementById('forgot-box').classList.add('d-none');
    document.getElementById('reset-box').classList.remove('d-none');
}

/**
 * resetting password and saving to backend database or showing fault when passwords mismatch
 */
async function resetPassword() {
    let userId = localStorage.getItem('resetUserId');
    let newPassword = document.getElementById('resetNew-input-password');
    let confPassword = document.getElementById('resetConf-input-password');

    if (newPassword.value == confPassword.value) {
        userAccounts[userId]['userPassword'] = newPassword.value;
        await saveAccountsToBackend();
        backToLoginBox();
        slidePopupIntoView('reset-popup');
    } else {
        hideAccept('reset');
        showFault('reset');
        document.getElementById('reset-button').classList.add('deactivated-button');
    }
}

/**
 * matching new and confirm passwords
 */
function matchResetPasswords() {
    let newPassword = document.getElementById('resetNew-input-password');
    let confPassword = document.getElementById('resetConf-input-password');

    if (newPassword.value == confPassword.value) {
        hideFault('reset');
        showAccept('reset');
        document.getElementById('reset-button').classList.remove('deactivated-button');
    } else {
        hideAccept('reset');
        showFault('reset');
        document.getElementById('reset-button').classList.add('deactivated-button');
    }
}

/**
 * showing password accept when both password match
 * @param {string} element - name of element "reset"
 */
function showAccept(element) {
    document.getElementById(`${element}-accept`).classList.remove('d-none');
}

/**
 * hiding password accept when both password mismatch
 * @param {string} element - name of element "reset"
 */
function hideAccept(element) {
    document.getElementById(`${element}-accept`).classList.add('d-none');
}
