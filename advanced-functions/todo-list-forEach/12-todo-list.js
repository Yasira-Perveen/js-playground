const todolist = JSON.parse(localStorage.getItem('todolist')) || [];

function renderTodoList() {
  let todoHTML = '';

  todolist.forEach(function(todoObject , index){
     const { name } = todoObject;
    const { dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
        <button class="todo-delete-button" onclick="
        todolist.splice(${index},1);
        localStorage.setItem('todolist',JSON.stringify(todolist));
        renderTodoList();
        ">Delete</button> 
    `;
    todoHTML += html;
  });

  document.querySelector('.js-todolist')
    .innerHTML = todoHTML;
    
}
function addToDo() {
  const jsElement = document.querySelector('.js-input');
  const dueDateElement = document.querySelector('.js-due-date-input');
  const dueDate = dueDateElement.value;
  const name = jsElement.value;
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
  jsElement.value = '';
  dueDateElement.value = '';
  renderTodoList();
  const jasonString = JSON.stringify(todolist);
  localStorage.setItem('todolist',jasonString);
 
}
 renderTodoList();