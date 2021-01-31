
const addButton = document.getElementById('add-button'); 
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');
//const todoContainer = document.getElementById('list-container');
const viewSection = document.getElementById('view-section');

const counterText = document.getElementById('counter');
let todoCounter = 0;
counterText.innerText = todoCounter;


const usedPrioritys =[];
let todoListArray = [];
localStorage.setItem( 'todo-list', JSON.stringify(todoListArray) );

addButton.addEventListener('click', () => { //add new item to the list
    creatNewTodo();

    sortTodoList(null, usedPrioritys);
});

function isPriorityExist (priority, arr){
    for(let priorityNum of arr){
        if(priority === priorityNum){
            return true;
        } 
    }
    return false;
}

function creatNewTodo(){
    const insertedValue = input.value;  //get the user new todo content
    const currentPriority = prioritySelect.value; //get the nte todo's priority
    const isNewPriorityExist = isPriorityExist(currentPriority, usedPrioritys);  //check if the user already choose the current priorety
    
    if(insertedValue !== '' && insertedValue !== undefined && currentPriority && !isNewPriorityExist){ //if the user inserted good todo: 1-got value 2-choosed priority 3-the prioriry has not choose before
        usedPrioritys.push(currentPriority); //push the new priority to the counter (priority array)
        const todoObj = { //creat todo object 
            text: insertedValue,
            priority: currentPriority,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
        todoListArray.push(todoObj);
        localStorage.setItem('todo-list', JSON.stringify(todoListArray));
        //todoListArray = JSON.parse(localStorage.getItem('todo-list')); // get the list from local storage
        //todoListArray.push(todoObj); //add new todo to the todo-array
        //localStorage.setItem('todo-list', JSON.stringify(todoListArray));  //set the new updated array to the local storage

        let newDivLi =  document.createElement('div');
        newDivLi.setAttribute('class','todo-container');

        const itemPriorety = document.createElement('div');
        itemPriorety.setAttribute('class', 'todo-priority todo-item');
        itemPriorety.innerText = todoObj.priority;

        const itemText = document.createElement('div');
        itemText.setAttribute('class', 'todo-text todo-item');
        itemText.innerText = todoObj.text;
        
        const itemAddTime = document.createElement('div');
        itemAddTime.setAttribute('class', 'todo-created-at todo-item');
        itemAddTime.innerText = todoObj.date;


        newDivLi.append(itemPriorety);
        newDivLi.append(itemText);
        newDivLi.append(itemAddTime);
        
        viewSection.append(newDivLi);

        todoCounter++;
        counterText.innerText = todoCounter;
        input.value = '';
    }
}

function updateLocalStoreage(){
   
}

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', () => {
    if(!isListSorted()){
        
    }
})

//check if the to-do list is sorted
function isListSorted(arr){
    let lastPriority = 6;
    for(let obj in arr){
        const todoPriorety = obj.priority;
        if(todoPriorety > prioretyNum){
            return false;
        }
        lastPriority = todoPriorety;
    }
    return true;
}

//sort the to-do list
function sortTodoList(todoArr, prioretyArr){
    let newOrderPriority = prioretyArr;
    newOrderPriority.sort((a, b) =>  b - a);  //order the priorities from the largest to the smallest
    sortTodoList = [];
    for(let prioritySort in newOrderPriority){
        for(let obj in todoArr){
            if(obj.priority === prioritySort){
                sortTodoList.push(obj);
                break;
            }
        }
    }
}


   