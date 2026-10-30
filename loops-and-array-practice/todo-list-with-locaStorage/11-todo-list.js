const todolist = JSON.parse(localStorage.getItem('todolist')) || [];

function renderTodoList() {
  let todoHTML = '';

  for (let i = 0; i < todolist.length; i++) {
    const todoObject = todolist[i];

    //const name = todoObject.name ;

    // const dueDate = todoObject.dueDate;

    // for the above 2 lines of code we have a shortcut  called destructing . when we have same variable name and object property here 'name'
    // we can simply write :
    const { name } = todoObject;
    const { dueDate } = todoObject;

    const html = `
    
      <div>${name}</div>
      <div>${dueDate}</div>
        <button class="todo-delete-button" onclick="
        todolist.splice(${i},1);
        localStorage.setItem('todolist',JSON.stringify(todolist));
        renderTodoList();
        ">Delete</button> 
         
    `;
    todoHTML += html;
  }
  document.querySelector('.js-todolist')
    .innerHTML = todoHTML;
    
}
function addToDo() {
  const jsElement = document.querySelector('.js-input');
  const dueDateElement = document.querySelector('.js-due-date-input');
  const dueDate = dueDateElement.value;
  let name = jsElement.value;
  if (name === '') {
    return;
  }

  todolist.push(
    {
      name: name,
      dueDate: dueDate
    }
    // for the above 2 lines we have a shortcut called shorthand 
    // { name , dueDate} it will do the same thing
  );

  console.log(todolist);
  jsElement.value = '';
  dueDateElement.value = '';
  renderTodoList();
  const jasonString = JSON.stringify(todolist);
  localStorage.setItem('todolist',jasonString);
 
}
 renderTodoList();