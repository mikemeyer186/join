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
}

/**
 * showing the password visibility icon when entered some text in password inputfield
 * @param {string} element - element name "login" or "signup"
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
 * @param {*} signUpEmail - email from sign up
 * @param {*} signUpPassword - password from sign up
 */
function goBackToLogin(signUpEmail, signUpPassword) {
    document.getElementById('login-box').classList.remove('d-none');
    document.getElementById('signup-box').classList.add('d-none');
    document.getElementById('login-logo-white').classList.add('no-opacity');
    document.getElementById('login-logo-blue').classList.remove('no-opacity');
    document.getElementById('login-page').classList.add('pageColorChange');
    document.getElementById('login-input-email').value = signUpEmail;
    document.getElementById('login-input-password').value = signUpPassword;
    showVisibilityIcon('login');
}

/**
 * saving user accounts in backend database
 */
async function saveAccountsToBackend() {
    await backend.setItem('userAccounts', JSON.stringify(userAccounts));
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
        console.log('User oder Passwort falsch');
    }
}

/**
 * saving active user to local storage
 * @param {JSON} user - logged in user data
 */
function saveActiveUserLocal(user) {
    localStorage.setItem('activeUser', JSON.stringify(user));
}
