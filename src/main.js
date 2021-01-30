
const addButton = document.getElementById('add-button');
const input = document.getElementById('text-input');
const prioritySelect = document.getElementById('priority-selector');

const todoContainer = document.getElementById('list-container');
console.log(addButton);
console.log(input);

addButton.addEventListener('click', () => {
    const insertedValue = input.value;  //get the user new todo content
    const currentPriority = prioritySelect.value; //get the nte todo's priority

    console.log(currentPriority);
   
    if(insertedValue !== ''){
        let newDivLi =  document.createElement('div');
        newDivLi.setAttribute('class','todo-container');

        const itemPriorety = document.createElement('span');
        itemPriorety.innerText = currentPriority;
console.log(itemPriorety);

        const itemText = document.createElement('p');
        itemText.setAttribute('class', 'todo-text');
        itemText.innerText = insertedValue;
console.log(itemText);

        
        const itemAddTime = document.createElement('p');
        itemAddTime.setAttribute('class', 'todo-created-at');
        itemAddTime.innerText = new Date().toLocaleString();
console.log(itemAddTime);


        newDivLi.append(itemPriorety);
        newDivLi.append(itemText);
        newDivLi.append(itemAddTime);
        
        todoContainer.append(newDivLi);

         
    console.log(newDivLi);
    }
  
})
