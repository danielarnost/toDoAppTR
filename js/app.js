// Problem: user interaction doesnt provide desired results
//solution: add interactivity so the user can manage the daily tasks
//when using MDN, use Web API: DOM, Element
var taskInput = document.getElementById('new-task'); //new task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks');// incomplete-tasks
var completedTasksHolder= document.getElementById('completed-tasks');// complete-tasks
//add a new task 

//new task list item
var createNewTaskElement = function(taskString) {
  //input (checkbox)
   var checkBox = document.createElement("input"); //checkbox
//label
  var label = document.createElement("label");
  //create listitem
 var listItem = document.createElement("li");
//input (text)
  var editInput = document.createElement("input");
//button.edit
  var editButton = document.createElement("button");
//button.delete
    var deleteButton = document.createElement("button");
//each element needs modification
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
 //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}
//add a new task
var addTask = function() {
  console.log("Add task...");


//create new list item with text from #new task
  
  var listItem = createNewTaskElement(taskInput.value);
  //Append listEtem to incompleteTasksHolder
incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



// Edit an exisisting task
var editTask = function() {
console.log("edit task...");
  
  var listItem = this.parentNode;
    
  var editInput  = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
    
  var containsClass = listItem.classList.contains("editMode");
    // if class of parent is .editMode
  if(containsClass) {
    //switch from .editMode
      //label text becomes the input's value
      label.innerText = editInput.value;
   }else{
    //   switch to edit mode
     //  input value becomes the label's text
    editInput.value = label.innerText;
  
  

   }
  //toggle edit mode in list item
  listItem.classList.toggle("editMode");
  
}
//delete exisiting task
var deleteTask = function() {
  console.log("delete task...");
  // when delete button is pressed
    
  var listItem = this.parentNode;
  var ul = listItem.parentNode; 
 
  //remove parent list item from ul
  ul.removeChild(listItem);
}
// mark a task complete
var taskCompleted = function() {
  console.log(" task complete...");
  //When checkbox is checked
    // append the task list item to the #completed task
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted);
//  ul.removeChild(listItem);?????????????? not part of this function?
}
//mark a task incomplete
var taskIncomplete = function() {
  console.log("task incomplete...");
 //When checkbox is not checked
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted);
    //
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind List Item Events");
  
  //    select taskListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton =taskListItem.querySelector("button.delete");
//    bind  editTask to edit botton
  editButton.onclick = editTask;
//    bind deleteTask to delete Button
  deleteButton.onclick = deleteTask;
//    bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
  
}
//set the click handler to the task button.
addButton.onclick = addTask;

//cycle over incompleteTaskHolder ul lis items
for ( var i = 0; i < incompleteTasksHolder.children.length; i++ ) {
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  //bind events to list item's children (taskcomplete)
 }   

//cycle over completedTaskHolder ul lis items
 for ( var i = 0; i < completedTasksHolder.children.length; i++ ) {
   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  //bind events to list item's children (taskcomplete)
 } 
 //bind events to list item's children (taskinComplete)