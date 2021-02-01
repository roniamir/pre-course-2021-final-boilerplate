
const addButton = document.getElementById('add-button'); 
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');
//const todoContainer = document.getElementById('list-container');
const viewSection = document.getElementById('view-section');
const data = []
const counterText = document.getElementById('counter');
const sortButton = document.getElementById('sort-button');

let todoListArray = JSON.parse(localStorage.getItem('todo-list'));
let usedPrioritys = JSON.parse(localStorage.getItem('used=priority-list'));
let todoCounter;

if(!todoListArray){
    todoListArray= [];
    usedPrioritys = [];
    localStorage.setItem( 'todo-list', JSON.stringify(todoListArray) ); 
    localStorage.setItem('used-priorities-list', JSON.stringify(todoListArray));
    todoCounter = 0;
    counterText.innerText = todoCounter;
} else{
    loadTodos();
}
    
//Event listeners
addButton.addEventListener('click', () => { //add new item to the list
    creatNewTodo();
});

sortButton.addEventListener('click', () => {
    if(!isListSorted(todoListArray)){
       todoListArray = sortTodoList(); 
       let oldOrder = document.querySelectorAll('.todo-container');
       oldOrder.forEach(element => {
           element.remove();
       });
        loadTodos();
    }
})
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
    usedPrioritys = JSON.parse(localStorage.getItem('used-priorities-list'));
    
   // const isNewPriorityExist = isPriorityExist(currentPriority, usedPrioritys);  //check if the user already choose the current priorety
   //+ on the if(!isNewPriorityExist)...
    if(insertedValue !== '' && insertedValue !== undefined && currentPriority){ //if the user inserted good todo: 1-got value 2-choosed priority 3-the prioriry has not choose before
        usedPrioritys.push(currentPriority); 
        console.log('add new todo, the used priorities are: ' + usedPrioritys);//push the new priority to the counter (priority array)
        localStorage.setItem('used-priorities-list', JSON.stringify(usedPrioritys));
        
        const todoObj = { //creat todo object 
            text: insertedValue,
            priority: currentPriority,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
                    todoListArray = JSON.parse(localStorage.getItem('todo-list'));
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

                    todoCounter = todoListArray.length;
                    counterText.innerText = todoCounter;
                    input.value = '';
    }
}






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
function sortTodoList(){
    let newOrderPriority = JSON.parse(localStorage.getItem('used-priorities-list'));
    newOrderPriority.sort((a, b) =>  b - a);  //change the order of the priorities from the largest to the smallest
    let sortedTodoList = [];
    for(let i = 0; i < newOrderPriority.length; i++){
        for(let obj of todoListArray){
            if(obj.priority === newOrderPriority[i]){
                sortedTodoList.push(obj);
                break;
            }
        }
    }
    return sortedTodoList;
}

function loadTodos(){
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
    }
    todoCounter = todoListArray.length;
    counterText.innerText = todoCounter;
}


   