/**
 * body onload functions
 */
function addTaskOnload() {
    init(3);
    renderSubTask();
    loadTasksfromBackend();
    getSelectedSubtask();
}

/**
 * checking empty inputs
 * @returns true // false
 */
function checkingEmptyValues() {
    if (document.getElementById('inputTitle').value == false) {
        document.getElementById('mistakeReportTitle').innerHTML = `Please enter a title!`;
        return false;
    }
    if (contactCheckedValue == false) {
        document.getElementById('mistakeReportContact').innerHTML = `Please select a contact!`;
        return false;
    }
    if (document.getElementById('selectDate').value == false) {
        document.getElementById('mistakeReportDate').innerHTML = `Please select a date!`;
        return false;
    }
    if (taskCategoryFinaly == false) {
        document.getElementById('mistakeReportCategory').innerHTML = `Please select a category!`;
        return false;
    }
    if (prioritySelect == undefined) {
        document.getElementById('mistakeReportImportance').innerHTML = `Please select an urgency!`;
        return false;
    }
    if (document.getElementById('inputDescription').value == false) {
        document.getElementById('mistakeReportDescription').innerHTML = `Please enter a description!`;
        return false;
    } else {
        return true;
    }
}

/**
 * rendering subtasks checkboxes at the footer
 */
function renderSubTask() {
    subTasks = JSON.parse(localStorage.getItem('subtasks')) || [];
    document.getElementById('addSubtaskCheckbox').innerHTML = ``;
    for (let i = 0; i < subTasks.length; i++) {
        document.getElementById('addSubtaskCheckbox').innerHTML += `
        <div class="subtaskList" id="subtaskValue">  
        <input id="${subTasks[i]}" value="${subTasks[i]}" class="subtaskCheckbox pointer" type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
    }
}

/**
 * getting the checked subtask
 */
function getSelectedSubtask() {
    let subtaskCheckboxes = document.querySelectorAll('.subtaskCheckbox');
    subtaskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkedSubtaskValue = event.target.value;
            }
        });
    });
}

/**
 * pushing new subtask in the localstorage
 */
function pushSubtaskLocalStorage() {
    if (document.getElementById('subtaskText').value) {
        document.getElementById('mistakeReportsubtask').innerHTML = ``;
        subTasks.push(document.getElementById('subtaskText').value);
        document.getElementById('subtaskText').value = ``;
        localStorage.setItem('subtasks', JSON.stringify(subTasks));
        renderSubTask();
    } else {
        document.getElementById('mistakeReportsubtask').innerHTML = `Please enter value!`;
    }
}

/**
 * clear subtask input
 */
function clearSubtask() {
    document.getElementById('subtaskText').value = ``;
}

/**
 * clear the input and selectors
 */
function taskClear() {
    document.getElementById('inputTitle').value = ``;
    document.getElementById('selectDate').value = ``;
    document.getElementById('inputDescription').value = ``;
    document.getElementById('subtaskText').value = ``;
    renderingContactsSelector();
    renderingTaskCategorySelector();
    window.location.reload();
}

/**
 * deleting the contact from the contactCheckedValue
 * @param {string} contactName name of contact
 * @param {string} initiales of name
 * @param {color} color of user
 * @param {number} ID of user
 */
function selectedContact(contactName, initiales, color, number) {
    let index = findContactIndex(contactName);

    if (document.getElementById('popup' + number + contactName).classList.contains('checked')) {
        deletContact(index, contactName, number);
    } else {
        addContact(contactName, initiales, color, number);
    }
}
