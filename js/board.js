// body onload functions 
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    await downloadFromServer();
    renderTasksinBoard();
}
function renderTasksinBoard() {
    for(let i; i < tasks.length; i++) {
            document.getElementById("boardTodo").innerHTML += `
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks.taskCategory[i]}</p>
            <h4 class="boardBoxTitle">${tasks.taskTitle[i]}</h4>
            <p class="boardBoxDescription">
              ${tasks.description[i]}
            </p>
            <div class="boardBoxFooter">
              <div class="boxContacts"></div>
              <img src="./assets/img/icon${tasks.priority[i]}.png" />
            </div>
          </div>`;
        
    }
}
