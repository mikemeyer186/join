function changeInputContact() {
    document.getElementById('selectorContact').innerHTML = `<input id="newContactText" type="text" placeholder="Contact email">`; 
}
function changeInputCategory() {
    document.getElementById('selectorCategory').innerHTML = `<input id="newCategoryText" type="text" placeholder="New category name">`; 
}
function addTask() {
    let taskInputTitle = document.getElementById('inputTitle').velue; 
    let selectContact = document.getElementById('selectContact').value; 
    let dueDate = document.getElementById('selectDate').value; 
    let selectCategory = document.getElementById('selectContact').value; 
    //let taskImportance = document.getElemenentById('').value; 
    let description = document.getElementById('inputDescription').value; 
}


function renderSubTask()  {
    for(let i = 0; i < subTasks.length; i++) {
        document.getElementById('addSubtaskCheckbox').innerHTML += `
        <div class="subtaskList">  
        <input type="checkbox">
        <p>${subTasks[i]}</p>
        </div>`;
    }
}