
const addButton = document.getElementById('add-button'); 
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');
const todoContainer = document.getElementById('list-container');

addButton.addEventListener('click', () => { //add new item to the list
    const insertedValue = input.value;  //get the user new todo content
    const currentPriority = prioritySelect.value; //get the nte todo's priority

   
    if(insertedValue !== '' && insertedValue !== undefined && currentPriority){ //if the user inserted his new todo and choose the item priority, then add to to the list
        console.log("the value is : "+insertedValue);
        let newDivLi =  document.createElement('div');
        newDivLi.setAttribute('class','todo-container');

        const itemPriorety = document.createElement('div');
        itemPriorety.innerText = currentPriority;
console.log(itemPriorety);

        const itemText = document.createElement('div');
        itemText.setAttribute('class', 'todo-text');
        itemText.innerText = insertedValue;
console.log(itemText);

        
        const itemAddTime = document.createElement('div');
        itemAddTime.setAttribute('class', 'todo-created-at');
        itemAddTime.innerText = new Date().toISOString().slice(0, 19).replace('T', ' ');
console.log(itemAddTime);


        newDivLi.append(itemPriorety);
        newDivLi.append(itemText);
        newDivLi.append(itemAddTime);
        
        todoContainer.append(newDivLi);

         
    console.log(newDivLi);
    }
  
})
