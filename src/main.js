
const addButton = document.getElementById('add-button'); 
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');
const todoContainer = document.getElementById('list-container');

let todoCounter = 0;
const usedPrioritys =[];

addButton.addEventListener('click', () => { //add new item to the list
    const insertedValue = input.value;  //get the user new todo content
    const currentPriority = prioritySelect.value; //get the nte todo's priority

    const isNewPriorityExist = isPriorityExist(currentPriority, usedPrioritys);  //check if the user already choose the current priorety
    

    if(insertedValue !== '' && insertedValue !== undefined && currentPriority && !isNewPriorityExist){ //if the user inserted good todo: 1-got value 2-choosed priority 3-the prioriry has not choose before
        
        usedPrioritys.push(currentPriority); //push the new priority to the counter (priority array)
        
        let newDivLi =  document.createElement('div');
        newDivLi.setAttribute('class','todo-container');

        const itemPriorety = document.createElement('div');
        itemPriorety.innerText = currentPriority;
//console.log(itemPriorety);

        const itemText = document.createElement('div');
        itemText.setAttribute('class', 'todo-text');
        itemText.innerText = insertedValue;
//console.log(itemText);

        
        const itemAddTime = document.createElement('div');
        itemAddTime.setAttribute('class', 'todo-created-at');
        itemAddTime.innerText = new Date().toISOString().slice(0, 19).replace('T', ' ');
//console.log(itemAddTime);


        newDivLi.append(itemPriorety);
        newDivLi.append(itemText);
        newDivLi.append(itemAddTime);
        
        todoContainer.append(newDivLi);

        todoCounter++;
        const counterText = document.getElementById('counter');
        counterText.innerText = "You have got " +todoCounter + " to-do" ;
    }
  
});

function isPriorityExist (priority, arr){
    for(let priorityNum of arr){
        if(priority === priorityNum){
            return true;
        } 
    }
    return false;
}

