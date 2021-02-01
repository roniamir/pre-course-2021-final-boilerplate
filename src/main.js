
const addButton = document.getElementById('add-button'); 
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');
//const todoContainer = document.getElementById('list-container');
const viewSection = document.getElementById('view-section');

const counterText = document.getElementById('counter');
let todoCounter = 0;
counterText.innerText = todoCounter;

//console.log(typeof todoListArray === 'undefined');

//const todoListArray = JSON.parse(localStorage.getItem('todo-list'));

if(typeof todoListArray === 'undefined'){
    let usedPrioritys = [];
    let todoListArray = [];
    localStorage.setItem( 'todo-list', JSON.stringify(todoListArray) ); 
    localStorage.setItem('used-priorities-list', JSON.stringify(todoListArray));
} //else{
  //  let todoListArray = JSON.parse(localStorage.getItem('todo-list'));
    //listToDom();
//}
    

addButton.addEventListener('click', () => { //add new item to the list
    creatNewTodo();
});

function isPriorityExist (priority, arr){
    for(let obj of arr){
        console.log(obj.priority+" is the priority in the array");
        console.log("the new priority is: "+priority);
        if(obj.priority === priority){
            return true;
        } 
    }
    return false;
}

function creatNewTodo(){
    const insertedValue = input.value;  //get the user new todo content
    const currentPriority = prioritySelect.value; //get the nte todo's priority
    //const usedPrioritysArray = JSON.parse(localStorage.getItem('used-priorities-list'));
    let todoListArray = JSON.parse(localStorage.getItem('todo-list'));
    let usedPrioritys = JSON.parse(localStorage.getItem('used-priorities-list'));
    
    const isNewPriorityExist = isPriorityExist(currentPriority, todoListArray);  //check if the user already choose the current priorety
    if(insertedValue !== '' && insertedValue !== undefined && currentPriority && !isNewPriorityExist){ //if the user inserted good todo: 1-got value 2-choosed priority 3-the prioriry has not choose before
        usedPrioritys.push(currentPriority); //push the new priority to the counter (priority array)
        localStorage.setItem('used-priorities-list',JSON.stringify(usedPrioritys));

        const todoObj = { //creat todo object 
            text: insertedValue,
            priority: currentPriority,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
        let todoListArray = JSON.parse(localStorage.getItem('todo-list'));
        todoListArray.push(todoObj);
        localStorage.setItem('todo-list', JSON.stringify(todoListArray));
        
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

function listToDom(){
    for(let todoObj of todoListArray){
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


const sortButton = document.getElementById('sort-button');

sortButton.addEventListener('click', () => {
    let todoListArray = JSON.parse(localStorage.getItem('todo-list'));
    let usedPrioritys = JSON.parse(localStorage.getItem('used-priorities-list'));

    if(!isListSorted(todoListArray)){
       todoListArray = sortTodoList(todoListArray, usedPrioritys); 
       showSortListInDom(todoListArray);
    }
})

//check if the to-do list is sorted
function isListSorted(arr){
    let lastPriority = 6;
    for(let obj of arr){
        let todoPriorety = obj.priority;
        if(todoPriorety > lastPriority){
            return false;
        }
        lastPriority = todoPriorety;
    }
    return true;
}

//sort the to-do list
function sortTodoList(todoArr, prioretyArr){
    let newOrderPriority = prioretyArr;
    newOrderPriority.sort((a, b) =>  b - a);  //change the order of the priorities from the largest to the smallest
    let sortTodoList = [];
    for(let i = 0; i < newOrderPriority.length; i++){
        for(let obj of todoArr){

            if(obj.priority === newOrderPriority[i]){
                sortTodoList.push(obj);
                break;
            }
        }
    }
    return sortTodoList;
}

function showSortListInDom(arr){
    const allMyTodo = document.querySelectorAll('.todo-container');
    for(let i = 0; i < allMyTodo.length; i++){
        allMyTodo[i].remove();
    }
   // localStorage.setItem('todo-list', JSON.stringify(todoListArray));
    

    for(let todoObj of arr){
              
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
    }   
}


   