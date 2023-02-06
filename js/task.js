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
 */
function showAddTaskPopup(mode, status) {
    let index = localStorage.getItem('contactIndex');
    let activeUserContacts = userAccounts[activeUser].userContacts;

    setCheckedContacts(mode, index, activeUserContacts);
    document.getElementById('selectorContactRenderPopup').classList.add('noBorder');
    document.getElementById('selectorCategoryRender').classList.add('noBorder');
    document.getElementById('selectorContactRenderPopup').innerHTML = ``;
    document.getElementById('addTaskPopup').classList.toggle('translate0');
    document.getElementById('mobiletaskheader').classList.toggle('headerSlideIn');
    document.getElementById('page-container').classList.toggle('overflowHidden');
    showAssignedContacts();
    setTaskStatus(status);
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
        selectorCategoryIndex--;
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
