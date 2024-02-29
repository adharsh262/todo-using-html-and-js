/* Follow the instructions found in the description to complete the JavaScript functionality.*/
let unorderedListContainer = document.getElementById("todoItemsContainer");
let saveButton = document.getElementById("savetodolist");


function obtainedDateFRomLocalStrrage() {
    let Objectlocal = localStorage.getItem("todoList2");
    let newobject = JSON.parse(Objectlocal);
    if (newobject === null) {
        return [];
    } else {
        return newobject;
    }


}

let todoList = obtainedDateFRomLocalStrrage();

saveButton.onclick = function() {
    localStorage.setItem("todoList2", JSON.stringify(todoList));

}
let listLength = todoList.length;



function ontodoStatusChange(uniquecheckid, uniquelabelid, todoUniqueid) {
    let checkboxElement = document.getElementById(uniquecheckid);
    let labelElement = document.getElementById(uniquelabelid);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachtodoId2 = "todo" + eachTodo.uniqueNo;
        if (eachtodoId2 === todoUniqueid) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoUniqueid) {
    let todoElement = document.getElementById(todoUniqueid);
    unorderedListContainer.removeChild(todoElement);
    let deletedtodoItemIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (todoUniqueid === eachtodoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedtodoItemIndex, 1);

}


function AppendTodoListItems(todo) {
    let uniquecheckid = "checkid" + todo.uniqueNo;
    let uniquelabelid = "labelid" + todo.uniqueNo;
    let todoUniqueid = "todo" + todo.uniqueNo;

    let listItemElement = document.createElement("li");
    unorderedListContainer.appendChild(listItemElement);
    listItemElement.id = todoUniqueid;
    listItemElement.classList.add("styletype", "d-flex", "flex-row");

    let checkboxContainerElement = document.createElement("input");
    checkboxContainerElement.type = "checkbox";
    checkboxContainerElement.id = uniquecheckid;
    checkboxContainerElement.checked = todo.isChecked;



    checkboxContainerElement.onclick = function() {
        ontodoStatusChange(uniquecheckid, uniquelabelid, todoUniqueid);
    }


    checkboxContainerElement.classList.add("checkbox-input");
    listItemElement.appendChild(checkboxContainerElement);


    let itemContainer = document.createElement("div");
    itemContainer.classList.add("label-container", "d-flex", "flex-row");
    listItemElement.appendChild(itemContainer);

    let labelContainer = document.createElement("label");
    labelContainer.setAttribute("for", uniquecheckid);
    labelContainer.textContent = todo.text;
    labelContainer.id = uniquelabelid;

    if (todo.isChecked === true) {
        labelContainer.classList.add("checked");
    } else {
        labelContainer.classList.remove("checked");
    }
    itemContainer.appendChild(labelContainer);
    labelContainer.classList.add("checkbox-label");


    let deleteItemContainer = document.createElement("div");
    itemContainer.appendChild(deleteItemContainer);
    deleteItemContainer.classList.add("delete-icon-container");


    let deleteIconElement = document.createElement("i");
    deleteItemContainer.appendChild(deleteIconElement);

    deleteIconElement.onclick = function() {
        onDeleteTodo(todoUniqueid);
    }

    deleteIconElement.classList.add("fa-solid", "fa-trash-can", "delete-icon");
}


let addButton = document.getElementById("addTodoButton");

addButton.onclick = function() {

    let userInput = document.getElementById("todoUserInput");
    listLength = listLength + 1;
    let textuserInput = userInput.value;
    if (textuserInput === "") {

        alert("Invalid Input !!!!");
    } else {
        let newtodoList = {
            text: textuserInput,
            uniqueNo: listLength,
            isChecked: false
        }

        todoList.push(newtodoList);
        AppendTodoListItems(newtodoList);
        userInput.value = "";
    }


}


for (let todo of todoList) {
    AppendTodoListItems(todo);
}
