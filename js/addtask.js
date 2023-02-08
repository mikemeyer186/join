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
