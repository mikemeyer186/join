/**
 * adding new contact to user account
 */
function addContactToUserFromTask() {
    let inputName = document.getElementById('selectContact');
    let inputEmail = document.getElementById('selectContact');
    let inputPhone = '';
    let inputInitials = getContactInitials(inputName.value).toUpperCase();
    let inputColor = getRandomColor();
    let contactObject = {
        contactName: inputName.value,
        contactEmail: inputEmail.value,
        contactPhone: inputPhone,
        contactInitials: inputInitials,
        contactColor: inputColor,
    };
    userAccounts[activeUser].userContacts.push(contactObject);
    saveAccountsToBackend();
    rechangeContactInput();
    selectorContactIndex = 0;
    addNewContactToSelector(userAccounts[activeUser].userContacts.length - 1);
    showAssignedContacts();
}

/**
 * showing add task popup with white header
 * @param {number} mode - 0 for no contacts, 1 for checked assigned contacts
 * @param {string} status - status of new task
 */
function showAddTaskPopup(mode, status) {
    let index = localStorage.getItem('contactIndex');
    let activeUserContacts = userAccounts[activeUser].userContacts;
    taskCategoryFinaly = '';
    clearMistakeReports();
    deleteSubTasksArray();
    setCheckedContacts(mode, index, activeUserContacts);
    document.getElementById('selectorContactRenderPopup').classList.toggle('noBorder');
    document.getElementById('selectorCategoryRender').classList.toggle('noBorder');
    document.getElementById('selectorContactRenderPopup').innerHTML = ``;
    document.getElementById('addTaskPopup').classList.toggle('translate0');
    document.getElementById('mobiletaskheader').classList.toggle('headerSlideIn');
    showAssignedContacts();
    setTaskStatus(status);
    showAllDeleteBtns();
}

/**
 * setting assigned contacts in drop down
 * @param {number} mode - 0 for no contacts, 1 for checked assigned contacts
 * @param {number} index - contact index
 * @param {object} activeUserContacts - array of contacts
 */
function setCheckedContacts(mode, index, activeUserContacts) {
    if (mode == 1) {
        contactCheckedValue = [
            {
                contactName: activeUserContacts[index].contactName,
                abbreviation: activeUserContacts[index].contactInitials,
                paint: activeUserContacts[index].contactColor,
            },
        ];
    } else {
        contactCheckedValue = [];
    }
}

/**
 * adding new contact to selected contacts of task
 * @param {number} contactIndex - index of new conact in userContacts
 */
function addNewContactToSelector(contactIndex) {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    newContactCheckedValue = {
        contactName: activeUserContacts[contactIndex].contactName,
        abbreviation: activeUserContacts[contactIndex].contactInitials,
        paint: activeUserContacts[contactIndex].contactColor,
    };
    contactCheckedValue.push(newContactCheckedValue);
    showAssignedContacts();
}

/**
 * showing assigned contacts in task popup
 */
function showAssignedContacts() {
    document.getElementById('selectorContactAssigned').innerHTML = contactCheckedValue.length;
}

/**
 * rendering contacts in addTask popup and selecting contact
 */
function renderingContactsSelectorPopup(index) {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    let selectorContactPopup = document.getElementById('selectorContactRenderPopup');
    selectorContactPopup.innerHTML = ``;

    if (selectorContactIndex == 0) {
        document.getElementById('selectorContactRenderPopup').classList.remove('noBorder');
        fillContactPopUp(activeUserContacts, selectorContactPopup);
        selectorContactIndex++;
    } else {
        document.getElementById('selectorContactRenderPopup').classList.add('noBorder');
        selectorContactIndex--;
    }
}

/**
 * filling contact selection popup
 * @param {JSON} activeUserContacts - userContacts
 * @param {object} selectorContactPopup - html-id
 */
function fillContactPopUp(activeUserContacts, selectorContactPopup) {
    for (let i = 0; i < activeUserContacts.length; i++) {
        if (findContact(activeUserContacts[i].contactName) === true) {
            selectorContactPopup.innerHTML += checkedContactsTemplate(activeUserContacts, i);
        } else {
            selectorContactPopup.innerHTML += uncheckedContactsTemplate(activeUserContacts, i);
        }
    }
    selectorContactPopup.innerHTML += newContactTemplate();
}

/**
 * searching for contact name in contactCheckedValue
 * @param {string} name - contact name
 * @returns - boolean
 */
function findContact(name) {
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == name) {
            return true;
        }
    }
}

/**
 * pushing or splicing selected contact in selection of task
 * @param {string} contactname - name of contact
 * @param {string} initiales - initials of contact
 * @param {string} color - rgb color of contact
 * @param {number} number - id of contact in html-id
 */
function selectedContactPopup(contactname, initiales, color, number) {
    let index = findContactIndex(contactname);

    if (document.getElementById('popup' + number + contactname).classList.contains('checked')) {
        spliceContact(index, contactname, number);
    } else {
        pushContact(contactname, initiales, color, number);
    }
    showAssignedContacts();
}

/**
 * splicing selected contact from contactCheckedValue
 * @param {number} index - index of contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @param {number} number - id of contact in html-id
 */
function spliceContact(index, contactname, number) {
    contactCheckedValue.splice(index, 1);
    document.getElementById('popup' + number + contactname).classList.remove('checked');
    document.getElementById('popup' + number + contactname).src = './assets/img/icons/checkButton.png';
}

/**
 * pushing selected contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @param {string} initiales - initials of contact
 * @param {string} color - rgb color of contact
 * @param {number} number - id of contact in html-id
 */
function pushContact(contactname, initiales, color, number) {
    contactCheckedValue.push({
        contactName: contactname,
        abbreviation: initiales,
        paint: color,
    });
    document.getElementById('popup' + number + contactname).src = './assets/img/icons/checkButtonChecked.png';
    document.getElementById('popup' + number + contactname).classList.add('checked');
}

/**
 * finding index of contact in contactCheckedValue
 * @param {string} contactname - name of contact
 * @returns - index
 */
function findContactIndex(contactname) {
    let index;
    for (let i = 0; i < contactCheckedValue.length; i++) {
        if (contactCheckedValue[i].contactName == contactname) {
            index = i;
        }
    }
    return index;
}

/**
 * changing contact data in tasks (initials, contactname)
 */
async function changeContactDataInTasks(index, oldContactName) {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].assignedTo.length; j++) {
            const contact = tasks[i].assignedTo[j];
            if (contact.contactName == oldContactName) {
                tasks[i].assignedTo[j].abbreviation = userAccounts[activeUser].userContacts[index].contactInitials;
                tasks[i].assignedTo[j].contactName = userAccounts[activeUser].userContacts[index].contactName;
            }
        }
    }
    await pushTasksinBackend();
}

/**
 * setting the status of new task
 * @param {number} value - 1 - 4 for status
 */
function setTaskStatus(value) {
    if (value == 1) {
        selectedTaskStatus = 'todo';
    }
    if (value == 2) {
        selectedTaskStatus = 'progress';
    }
    if (value == 3) {
        selectedTaskStatus = 'feedback';
    }
    if (value == 4) {
        selectedTaskStatus = 'done';
    }
}

/**
 * opening date picker
 */
function openCalendar() {
    document.getElementById('selectDate').type = 'date';
    document.getElementById('selectDate').focus();
}

/**
 * rendering categories in selector
 */
function renderingTaskCategorySelector() {
    taskCategorySelector = JSON.parse(localStorage.getItem('taskCategory')) || [];
    document.getElementById('selectorCategoryRender').innerHTML = ``;

    if (selectorCategoryIndex == 0) {
        document.getElementById('selectorCategoryRender').classList.remove('noBorder');
        fillStaticCategories();
        fillNewCategories();
        selectorCategoryIndex++;
    } else {
        document.getElementById('selectorCategoryRender').classList.add('noBorder');
        selectorCategoryIndex--;
    }
}

/**
 * filling static categories template
 */
function fillStaticCategories() {
    for (let j = 0; j < staticCategorys.length; j++) {
        document.getElementById('selectorCategoryRender').innerHTML += staticCategoryTemplate(j);
    }
}

/**
 * filling new categories template
 */
function fillNewCategories() {
    for (let i = 0; i < taskCategorySelector.length; i++) {
        document.getElementById('selectorCategoryRender').innerHTML += newCategoryTemplate(i);
    }
}

/**
 * checking if selected category is "new category" or static category
 * @param {string} category - category name
 * @param {string} color - category color
 */
function selectedCategory(category, color) {
    selectorCategoryIndex--;
    document.getElementById('selectorCategoryRender').classList.add('noBorder');

    if (category == 'New category') {
        changeInputCategory();
    } else {
        taskCategoryFinaly = category;
        taskCategoryColorFinaly = color;
        document.getElementById('selectorCategory').innerHTML = selectedCategoryTemplate(category, color);
    }
}

/**
 * changing input of category to make entering of new category available
 */
function changeInputCategory() {
    document.getElementById('selectorCategory').innerHTML = newCategoryInputTemplate();
}

/**
 * changing input of category back to selector
 */
function rechangeCategoryInput() {
    document.getElementById('selectorCategory').innerHTML = reachangeCategoryTemplate();
    renderingTaskCategorySelector();
}

/**
 * adding new category to selector and shows it directly in input field
 */
function addCategory() {
    newCategory = document.getElementById('newCategoryText').value;

    if (categorySelectedColor && newCategory) {
        taskCategorySelector.push({ taskCategory: newCategory, taskColor: categorySelectedColor });
        localStorage.setItem('taskCategory', JSON.stringify(taskCategorySelector));
        rechangeCategoryInput();
        renderingTaskCategorySelector();
        selectedCategory(newCategory, categorySelectedColor);
        selectorCategoryIndex = 0;
    } else {
        document.getElementById('mistakeReportCategory').innerHTML = `Please select color!`;
    }
}

/**
 * adding category color to new category text
 * @param {string} value - color class of selected category color
 */
function addCategoryColor(value) {
    if (document.getElementById('newCategoryText').value) {
        categorySelectedColor = value;
        document.getElementById('categoryColorCells').innerHTML = ``;
        document.getElementById('categoryColorCells').innerHTML = categoryColorTemplate();
        document.getElementById('mistakeReportCategory').innerHTML = ``;
    } else {
        document.getElementById('mistakeReportCategory').innerHTML = `Please enter category first!`;
    }
}

/**
 * setting prority in task popup
 * @param {number} i - 1 to 3 for importance level
 */
function prioritySelected(i) {
    if (i == 1) {
        setPriorityHigh();
    }
    if (i == 2) {
        setPriorityMid();
    }
    if (i == 3) {
        setPriorityLow();
    }
}

/**
 * setting prority to high
 */
function setPriorityHigh() {
    prioritySelect = 'hard';
    document.getElementById('importanceIMGHard').src = './assets/img/taskValueHardSelected.png';
    document.getElementById('importanceIMGMid').src = './assets/img/taskValueMid.png';
    document.getElementById('importanceIMGLow').src = './assets/img/taskValueLow.png';
}

/**
 * setting prority to medium
 */
function setPriorityMid() {
    prioritySelect = 'mid';
    document.getElementById('importanceIMGHard').src = './assets/img/taskValueHard.png';
    document.getElementById('importanceIMGMid').src = './assets/img/taskValueMidSelected.png';
    document.getElementById('importanceIMGLow').src = './assets/img/taskValueLow.png';
}

/**
 * setting prority to low
 */
function setPriorityLow() {
    prioritySelect = 'low';
    document.getElementById('importanceIMGHard').src = './assets/img/taskValueHard.png';
    document.getElementById('importanceIMGMid').src = './assets/img/taskValueMid.png';
    document.getElementById('importanceIMGLow').src = './assets/img/taskValueLowSelected.png';
}

/**
 * adding new tasks to account and backend
 */
async function addTask() {
    if (checkingEmptyValues()) {
        let taskInputTitle = document.getElementById('inputTitle').value;
        let dueDate = document.getElementById('selectDate').value;
        let description = document.getElementById('inputDescription').value;
        document.getElementById('page-container').classList.toggle('overflowHidden');
        userAccounts[activeUser].userTasks.push(tasks.length);
        tasks.push({
            taskTitle: taskInputTitle,
            taskDescription: description,
            toDueDate: dueDate,
            taskCategory: {
                Category: taskCategoryFinaly,
                TaskColor: taskCategoryColorFinaly,
            },
            subTask: subTasks,
            taskID: tasks.length,
            priority: prioritySelect,
            assignedTo: contactCheckedValue,
            taskStatus: selectedTaskStatus,
        });
        await saveAccountsToBackend();
        await pushTasksinBackend();
        deleteSubTasksArray();
        localStorage.setItem('reloadingNewPopup', true);
        window.location.href = 'board.html';
    }
}

/**
 * form validation in add task popup
 * @returns - true if all inputs are true, else shows alert
 */
function checkingEmptyValues() {
    if (!document.getElementById('inputTitle').value) {
        document.getElementById('mistakeReportTitle').innerHTML = `Please enter a title!`;
    } else if (contactCheckedValue.length == 0) {
        document.getElementById('mistakeReportContact').innerHTML = `Please select a contact!`;
    } else if (!document.getElementById('selectDate').value) {
        document.getElementById('mistakeReportDate').innerHTML = `Please select a date!`;
    } else if (!taskCategoryFinaly) {
        document.getElementById('mistakeReportCategory').innerHTML = `Please select a category!`;
    } else if (prioritySelect == undefined) {
        document.getElementById('mistakeReportImportance').innerHTML = `Please select an urgency!`;
    } else if (document.getElementById('inputDescription').value == false) {
        document.getElementById('mistakeReportDescription').innerHTML = `Please enter a description!`;
    } else {
        return true;
    }
}

/**
 * clearing all validation alerts
 */
function clearMistakeReports() {
    document.getElementById('mistakeReportTitle').innerHTML = '';
    document.getElementById('mistakeReportContact').innerHTML = '';
    document.getElementById('mistakeReportDate').innerHTML = '';
    document.getElementById('mistakeReportCategory').innerHTML = '';
    document.getElementById('mistakeReportImportance').innerHTML = '';
    document.getElementById('mistakeReportDescription').innerHTML = '';
}

/**
 * rendering subtasks at the footer of task popup
 */
function renderSubTask() {
    document.getElementById('addSubtaskCheckbox').innerHTML = '';

    if (popupTaskContent.length > 0) {
        taskEditPopupSubtasksRender();
    } else {
        for (let i = 0; i < subTasks.length; i++) {
            let box = subTasks[i].checkbox;
            document.getElementById('addSubtaskCheckbox').innerHTML += subtaskTemplate(i, box);
        }
    }
}

/**
 * setting checkbox value to subtask (checked or unchecked)
 * @param {number} i - iteration checkboxes in subtasks
 */
function checkSubTask(i) {
    let box = document.getElementById(`checkbox${i}`);
    if (box.checked) {
        box.checked = false;
        subTasks[i].checkbox = 'unchecked';
    } else if (!box.checked) {
        box.checked = true;
        subTasks[i].checkbox = 'checked';
    }
}

/**
 * pushing new subtask in localStorage
 */
function pushSubtaskLocalStorage() {
    if (document.getElementById('subtaskText').value) {
        let newSubtask = {
            value: document.getElementById('subtaskText').value,
            checkbox: 'unchecked',
        };
        subTasks.push(newSubtask);
        clearSubtask();
        renderSubTask();
    } else {
        document.getElementById('mistakeReportsubtask').innerHTML = 'Please enter a subtask!';
    }
}

function taskDeleteSubTask(i) {
    subTasks.splice(i, 1);
    renderSubTask();
}

/**
 * clearing subtask input
 */
function clearSubtask() {
    document.getElementById('subtaskText').value = '';
    document.getElementById('mistakeReportsubtask').innerHTML = '';
}

/**
 * deleting subtasks array and localStorage
 */
function deleteSubTasksArray() {
    document.getElementById('addSubtaskCheckbox').innerHTML = '';
    localStorage.removeItem('subtasks');
    popupTaskContent = [];
    subTasks = [];
}

/**
 * clearing the inputs and selectors
 */
function taskClear() {
    document.getElementById('inputTitle').value = '';
    document.getElementById('selectDate').value = '';
    document.getElementById('inputDescription').value = '';
    clearSubtask();
}
