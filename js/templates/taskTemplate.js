/**
 * html-template for checked contacts
 * @param {JSON} activeUserContacts - userContacts for selectors
 * @param {number} i - index of contact
 * @returns - html
 */
function checkedContactsTemplate(activeUserContacts, i) {
    return /*html*/ `
    <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
        <span>${activeUserContacts[i].contactName}</span>
        <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" class="checked" src="./assets/img/icons/checkButtonChecked.png">
        </div>
    </div>
`;
}

/**
 * html-template for unchecked contacts
 * @param {JSON} activeUserContacts - userContacts for selectors
 * @param {number} i - index of contact
 * @returns - html
 */
function uncheckedContactsTemplate(activeUserContacts, i) {
    return /*html*/ `
        <div onclick="selectedContactPopup('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
        <span>${activeUserContacts[i].contactName}</span>
        <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
        </div>
        </div>
    `;
}

/**
 * html-template for new contact
 * @returns - html
 */
function newContactTemplate() {
    return /*html*/ `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <span>Invite new contact</span>
            <div id="contactSelectorCheckboxes">
                <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
            </div>
        </div>
    `;
}

/**
 * html-template for static categories
 * @param {number} j - iteration of static categories array
 * @returns - html-template
 */
function staticCategoryTemplate(j) {
    return /*html*/ `
        <div onclick="selectedCategory('${staticCategorys[j].taskCategory}','${staticCategorys[j].taskColor}')" class="selectorCell pointer">
            <div>${staticCategorys[j].taskCategory}</div>
            <div><img src="./assets/img/categoryColors/${staticCategorys[j].taskColor}.png"></div>
        </div>
    `;
}

/**
 * html-template for new categories
 * @param {number} i - iteration of task category array
 * @returns - html-template
 */
function newCategoryTemplate(i) {
    return /*html*/ `
        <div onclick="selectedCategory('${taskCategorySelector[i].taskCategory}','${taskCategorySelector[i].taskColor}')" class="selectorCell pointer">
            <div class="selectorCellCategory">${taskCategorySelector[i].taskCategory}</div>
            <div class="selectorCellColor"><img src="./assets/img/categoryColors/${taskCategorySelector[i].taskColor}.png"></div>
        </div>
     `;
}

/**
 * html-template for selected category
 * @param {string} category - category name
 * @param {string} color - category color
 * @returns - html-template
 */
function selectedCategoryTemplate(category, color) {
    return /*html*/ `
        <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">
            <div class="selected">${category}
                <img src="./assets/img/categoryColors/${color}.png">
            </div>
            <img class="selectorArrow" src="./assets/img/selectorArrow.png">
        </div>
        <div id="selectorCategoryRender"></div>
    `;
}

/**
 * html-template of new category input
 * @returns - html-template
 */
function newCategoryInputTemplate() {
    return /*html*/ `
        <div class="inputCategory">
            <div class="checkAndCrossIconsCategory">
                <i onclick="rechangeCategoryInput()" class="fa-solid fa-xmark fa-xl pointer"></i> 
                <img src="./assets/img/icons/trennstrich.png">
                <i onclick="addCategory()" class="fa-solid fa-check fa-xl pointer"></i>
            </div>
            <input id="newCategoryText" type="text" placeholder="New category name" required>
            <div id="categoryColorCells">
                <span>Choose a color:</span>
                <img onclick="addCategoryColor('grayCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/grayCategory.png">
                <img onclick="addCategoryColor('redCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/redCategory.png">
                <img onclick="addCategoryColor('greenCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/greenCategory.png">
                <img onclick="addCategoryColor('orangeCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/orangeCategory.png">
                <img onclick="addCategoryColor('purpleCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/purpleCategory.png">
                <img onclick="addCategoryColor('blueCategory')" class="categoryColor" src="./assets/img/categoryColors/blueCategory.png">
            </div>
            <div id="categoryColorSelected"></div>
            <div id="mistakeReportCategory"></div>
        </div>
    `;
}

/**
 * html-template for selector of category
 * @returns - html-template
 */
function reachangeCategoryTemplate() {
    return /*html*/ `
        <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">Select task category <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
        <div id="selectorCategoryRender"></div>
    `;
}

/**
 * html-template for category color
 * @returns - html-template
 */
function categoryColorTemplate() {
    return /*html*/ `
        <img class="thisColor" src="./assets/img/categoryColors/${categorySelectedColor}.png">
    `;
}

/**
 * html-template for subtasks in add task popup
 * @param {number} i - iteration of subtask array
 * @param {string} box - checked or unchecked
 * @returns - html-template
 */
function subtaskTemplate(i, box) {
    return /*html*/ `
        <div class="subtaskList">
            <div class="subtaskList-task" onclick="checkSubTask(${i})">
                <input id="checkbox${i}" class="subtaskCheckbox pointer" type="checkbox" onchange="checkSubTask(${i})" ${box}>
                <p class="subtaskList-text">${subTasks[i].value}</p>
            </div>
            <span class="subtaskList-delete" title="delete subtask" onclick="taskDeleteSubTask(${i})">delete</span>
        </div>
    `;
}

/**
 * html-template for new contact input in add task popup
 * @returns - html-template
 */
function inputNewContactTemplate() {
    return /*html*/ `
      <div class="newContactInput">
        <input id="selectContact" type="email" placeholder="Enter E-mail of new contact" required>
        <div class="checkAndCrossIconsEmail">
              <i onclick="rechangeContactInput(); showAssignedContacts()" class="fa-solid fa-xmark fa-xl contactX pointer"></i> 
              <img src="./assets/img/icons/trennstrich.png">
              <i onclick="addContactToUserFromTask()" class=" pointer fa-solid fa-check fa-xl contactCheck"></i>
        </div>
      </div>
  `;
}

/**
 * html-template for changing back to normal contact selector
 * @returns - html-template
 */
function rechangeContactInputTemplate() {
    return /*html*/ `
    <div onclick="renderingContactsSelectorPopup(localStorage.getItem('contactIndex'))" class="selectorHeader pointer">
      <div>
        <span>Selected contacts to assign</span>
        <span id="selectorContactAssigned"></span>
      </div>
      <img class="selectorArrow" src="./assets/img/selectorArrow.png" />
    </div>
    <div id="selectorContactRenderPopup">
    </div>
  `;
}
