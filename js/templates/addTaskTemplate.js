/* TEMPLATES */

/**
 * Change the Category selector in a input field
 */
function changeInputCategory() {
    document.getElementById('selectorCategory').innerHTML = `
    <div class="inputCategory">
    <div class="checkAndCrossIconsCategory">
          <i onclick="rechangeCategoryInput()" class="fa-solid fa-xmark fa-xl pointer"></i> 
          <img src="./assets/img/icons/trennstrich.png">
          <i onclick="addCategory()" class="fa-solid fa-check fa-xl pointer"></i>
        </div>
    <input id="newCategoryText" type="text" placeholder="New category name" required>
    <div id="categoryColorCells"style="margin-top: 10px; margin-left: 20px; ">
    <img onclick="addCategoryColor('grayCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/grayCategory.png">
    <img onclick="addCategoryColor('redCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/redCategory.png">
    <img onclick="addCategoryColor('greenCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/greenCategory.png">
    <img onclick="addCategoryColor('orangeCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/orangeCategory.png">
    <img onclick="addCategoryColor('purpleCategory')" class="categoryColor" style="margin-right: 20px;" src="./assets/img/categoryColors/purpleCategory.png">
    <img onclick="addCategoryColor('blueCategory')" class="categoryColor" src="./assets/img/categoryColors/blueCategory.png">
    </div>
    <div id="mistakeReportCategory"></div>
    </div>`;
}

/**
 * rechange the category input
 */
function rechangeCategoryInput() {
    document.getElementById('selectorCategory').innerHTML = `
    <div class="selectorHeader pointer" onclick="renderingTaskCategorySelector()">Select task category <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
    <div id="selectorCategoryRender">
      <!-- Rendering selector content here -->
    </div>`;
    renderingTaskCategorySelector();
}

/**
 * Change the contact selector in a input field
 */
function changeInputContact() {
    document.getElementById('selectorContact').innerHTML = `
    <div>
    <div class="checkAndCrossIconsEmail">
          <i onclick="rechangeContactInput()" class="fa-solid fa-xmark fa-xl contactX pointer"></i> 
          <img src="./assets/img/icons/trennstrich.png">
          <i onclick="addContactToUserFromTask()" class=" pointer fa-solid fa-check fa-xl contactCheck"></i>
          </div>
    <input id="selectContact" type="email" placeholder="Contact email" required>
    </div>`;
}

/**
 * rechange the contact input in a selector
 */
function rechangeContactInput() {
    document.getElementById('selectorContact').innerHTML = `
    <div onclick="renderingContactsSelector()" class="selectorHeader pointer">Select contacts to assign <img class="selectorArrow" src="./assets/img/selectorArrow.png"></div>
    <div id="selectorContactRender">
      <!-- renderzone for contact selctor -->
    </div>`;
}

/**
 * rendering contacts in addTask
 */
function renderingContactsSelector() {
    let activeUserContacts = userAccounts[activeUser].userContacts;
    if (selectorContactIndex == 0) {
        contactCheckedValue = [];
        document.getElementById('selectorContactRender').innerHTML = ``;
        for (let i = 0; i < activeUserContacts.length; i++) {
            document.getElementById('selectorContactRender').innerHTML += `
          <div onclick="selectedContact('${activeUserContacts[i].contactName}','${activeUserContacts[i].contactInitials}','${activeUserContacts[i].contactColor}','${i}')" class="selectorCellContact">
            <nobr>${activeUserContacts[i].contactName}</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="popup${i}${activeUserContacts[i].contactName}" src="./assets/img/icons/checkButton.png">
          </div>
          </div>
        `;
        }
        document.getElementById('selectorContactRender').innerHTML += `
          <div onclick="changeInputContact()" class="selectorCellContact">
            <nobr>Invite new contact</nobr>
            <div id="contactSelectorCheckboxes">
            <img id="contactIconContacts" src="./assets/img/icons/contactIcon.png">
          </div>
          </div>`;
        selectorContactIndex++;
    } else {
        document.getElementById('selectorContactRender').innerHTML = ``;
        selectorContactIndex--;
    }
}

/**
 * rendering task cateogry´s in selector (Onclick)
 */
function renderingTaskCategorySelector() {
    let staticCategorys = [
        { taskCategory: 'New category', taskColor: 'grayCategory', cagtegoryID: 0 },
        { taskCategory: 'Sales', taskColor: 'purpleCategory', cagtegoryID: 1 },
        { taskCategory: 'Backoffice', taskColor: 'blueCategory', cagtegoryID: 2 },
    ];
    taskCategorySelector = JSON.parse(localStorage.getItem('taskCategory')) || [];
    if (selectorCategoryIndex == 0) {
        document.getElementById('selectorCategoryRender').innerHTML = ``;
        for (let j = 0; j < staticCategorys.length; j++) {
            document.getElementById('selectorCategoryRender').innerHTML += `
          <div onclick="selectedCategory('${staticCategorys[j].taskCategory}','${staticCategorys[j].taskColor}')" class="selectorCell pointer">
            <div>${staticCategorys[j].taskCategory}</div>
            <div><img src="./assets/img/categoryColors/${staticCategorys[j].taskColor}.png"</div>
          </div>
        `;
        }
        for (let i = 0; i < taskCategorySelector.length; i++) {
            document.getElementById('selectorCategoryRender').innerHTML += `
        <div onclick="selectedCategory('${taskCategorySelector[i].taskCategory}','${taskCategorySelector[i].taskColor}')" class="selectorCell pointer">
        <div class="selectorCellCategory">${taskCategorySelector[i].taskCategory}</div>
        <div class="selectorCellColor"><img src="./assets/img/categoryColors/${taskCategorySelector[i].taskColor}.png"/></div>
        </div>
        `;
        }
        selectorCategoryIndex++;
    } else {
        document.getElementById('selectorCategoryRender').innerHTML = ``;
        selectorCategoryIndex--;
    }
}
