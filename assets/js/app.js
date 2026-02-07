const cl = console.log;
let todoArr = [
    {
        todoItem:'CSS',
        todoId: '123'
    },
    {
        todoItem:'JS and ES6',
        todoId: '124'
    }
]

const todoForm = document.getElementById('todoForm');
const todoItemControl = document.getElementById('todoItem');
const addTodoBtn = document.getElementById('addTodoBtn');
const updateTodoBtn = document.getElementById('updateTodoBtn')


const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
    const random = Math.random() * 16 | 0;
    const value = character === 'x' ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  });
};


function createLists(arr){
    let result = `<ul class="list-group">`;
    arr.forEach(ele => {
        result += `
                     <li 
                     id="${ele.todoId}"
                     class="list-group-item d-flex justify-content-between align-items-center">
                         <strong>${ele.todoItem}</strong>
                         <div>
                            <i
                            onClick="onEdit(this)"
                             class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>
                            <i 
                            onClick="onRemove(this)"
                            class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                         </div>
                     </li>
                  `
    })
    result += `</ul>`
    const todoContainer = document.getElementById('todoContainer');
    todoContainer.innerHTML = result;
}
createLists(todoArr);

function onTodoSubmit(eve){
    eve.preventDefault()
    let todoObj = {
        todoItem: todoItemControl.value,
        todoId: uuid()
    }
    todoForm.reset()
    todoArr.unshift(todoObj);
    // createLists(todoArr)
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.innerHTML = `
                     <strong>${todoObj.todoItem}</strong>
                         <div>
                            <i
                             onClick="onEdit(this)"
                             class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>
                            <i
                            onClick="onRemove(this)"
                            class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                         </div>
                   `
     let ul = document.querySelector('#todoContainer ul')
     ul.prepend(li)
    swal.fire({
        title: `Now todoItem ${todoObj.todoItem} is added sucessfully!!!,`,
        timer: 3000
    })
}
let EDIT_ID
function onEdit(ele){
    EDIT_ID = ele.closest('li').id
    //cl(EDIT_ID)
    let EDIT_OBJ = todoArr.find(t => t.todoId === EDIT_ID)
    todoItemControl.value = EDIT_OBJ.todoItem;
    addTodoBtn.classList.add('d-none');
    updateTodoBtn.classList.remove('d-none');
}

function onTodoUpdate(ele){
    let UPDATED_TODO = {
        todoItem : todoItemControl.value,
        todoId : EDIT_ID
    }
    todoForm.reset()
    //cl(UPDATED_TODO)
    let getIndex = todoArr.findIndex(t => t.todoId = EDIT_ID)
    todoArr[getIndex] = UPDATED_TODO
    updateTodoBtn.classList.add('d-none')
    addTodoBtn.classList.remove('d-none')

    let li = document.getElementById(EDIT_ID).firstElementChild
    li.innerText = UPDATED_TODO.todoItem

}
function onRemove(ele){
      let REMOVE_ID = ele.closest('li').id
      //cl(REMOVE_ID)
      let getConfirm  = confirm(
        `Are you sure, you want to remove this todo item with id ${REMOVE_ID}`
      )
      if (getConfirm) {
      let getIndex = todoArr.findIndex(t =>  t.todoId === REMOVE_ID)
      todoArr.splice(getIndex,1)
      ele.closest('li').remove()
    }
      
}


todoForm.addEventListener('submit', onTodoSubmit)
updateTodoBtn.addEventListener("click",onTodoUpdate)