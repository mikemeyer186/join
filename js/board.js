// body onload functions 
async function boardOnload() {
    await init(2);
    await loadTasksfromBackend();
    await downloadFromServer();
    renderTasksinBoard();
}
function renderTasksinBoard() {
    for(let i = 0; i < tasks.length; i++) {
            document.getElementById("boardTodo").innerHTML += `
            <div class="boardBox">
            <div class="boardBoxContent">
            <p class="boardBoxCategory">${tasks[i].taskCategory}</p>
            <h4 class="boardBoxTitle">${tasks[i].taskTitle}</h4>
            <p class="boardBoxDescription">
              ${tasks[i].taskDescription}
            </p>
            <div class="boardBoxFooter">
              <div class="boxContacts"></div>
              <img src="./assets/img/icon${tasks[i].priority}.png" />
            </div>
          </div>`;
    }
    console.log("Tasks successfully loaded into board!");
}
