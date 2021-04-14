let $toDoInput;     // place, where user types content
let $alertInfo;     // info about: no tasks / necessity add text
let $addBtn;        // button which add new element to list
let $ulList;        // out taskt list, ( ul tags )
let $newTask;

let $popup          // downloaded popup
let $popupInfo      // alert in popup, when user add empty text
let $editedTodo     // editing popup
let $popupInput     // text which user write in input > popup
let $addPopupBtn    // button for submit in popup
let $closeTodoBtn   // button for cloce popup
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    closePopup();
};

// getting data form elements
const prepareDOMElements = () => {
    $toDoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

// setting listener 
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $toDoInput.addEventListener('keyup', enterCheck);
};

// add new taskt to list
const addNewTask = () => {
    if( $toDoInput.value != ""){
        $idNumber++;
        $alertInfo.innerText = '';
        $newTask = document.createElement('li');
        $newTask.innerHTML = $toDoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $toDoInput.value = "";
        createToolsArea ();
    }
    else
        $alertInfo.innerHTML = "Wpisz treść zadania!";
};

// add new taskt when ENTER will be push
const enterCheck = () => {
    if(event.code === 'Enter')
        addNewTask();
};

// create ADD, EDIT, DELETE buttons
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    const completeBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    toolsPanel.classList.add('tools');
    completeBtn.classList.add('complete');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');

    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    editBtn.innerHTML = 'EDIT';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    $newTask.appendChild(toolsPanel);
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

// check which button is click
const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    }
    
    else if(e.target.closest('button').className === 'edit')
        editTask(e);
    
    else if(e.target.closest('button').className === 'delete')
        deleteTasks(e);
};

// show popup and set the default value  
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};

// overwriting data from popup
const changeTodo = () => {
    if($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = "none";
        $popupInfo.innerText = "";
    }
    else 
        $popupInfo.innerText = "Musisz podać jakąś treść !!!";
};

// close popup 
const closePopup = () => {
    $popup.style.display = 'none';  
    $popupInfo.innerText = "";
};

// delete closest task from button  
const deleteTasks = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks.length === 0)
        $alertInfo.innerText = 'Brak zadań na liście.';
};

document.addEventListener('DOMContentLoaded', main);