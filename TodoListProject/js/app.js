import { addTodo, removeTodo, doTodo, getAllTodos } from "../Redux/actions.js";

import {
  addTodoAction,
  removeTodoAction,
  doTodoAction,
  getAllTodosAction,
} from "../Redux/actionCreators.js";

window.removeTodoHandler = removeTodoHandler;
window.doTodoHandler = doTodoHandler;

const todoInputElem = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todo-list");
const todoFilteringElem = document.querySelector(".filter-todo");

// Create Todolist Reducer
function todolistReducer(state = [], action) {
  console.log("Action", action);
  switch (action.type) {
    case getAllTodos: {
      return state;
    }
    case addTodo: {
      let newState = [...state];
      let newTodoObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodoObj);

      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case doTodo: {
      let newState = [...state];
      newState.some((todo) => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Create Store
const store = createStore(todolistReducer);
console.log(store);

addTodoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newTodoTitle = todoInputElem.value.trim();
  store.dispatch(addTodoAction(newTodoTitle));
  const todos = store.getState();
  todoInputElem.value = "";
  generateTodosInDom(todos);
  console.log("Todos", todos);
});

todoFilteringElem.addEventListener("change", (event) => {
  store.dispatch(getAllTodosAction());
  let todos = store.getState();

  if (event.target.value === "all") {
    generateTodosInDom(todos);
  } else if (event.target.value === "completed") {
    let completedTodos = todos.filter((todo) => todo.isCompleted);
    generateTodosInDom(completedTodos);
  } else if (event.target.value === "incomplete") {
    let inCompletedTodos = todos.filter((todo) => !todo.isCompleted);
    generateTodosInDom(inCompletedTodos);
  }
  console.log("Todos", todos);
});

function removeTodoHandler(todoID) {
  store.dispatch(removeTodoAction(todoID));
  const todos = store.getState();
  generateTodosInDom(todos);
  console.log("Todos", todos);
}

function doTodoHandler(todoID) {
  store.dispatch(doTodoAction(todoID));
  const todos = store.getState();
  generateTodosInDom(todos);
  console.log("Todos", todos);
}

function generateTodosInDom(todos) {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="todo ${todo.isCompleted && "completed"}">
                <li class="todo-item">${todo.title}</li>
                <button class="complete-btn" onclick=doTodoHandler("${
                  todo.id
                }")>
                    <i class="fas fa-check-circle"></i>
                </button>
                <button class="trash-btn" onclick=removeTodoHandler("${
                  todo.id
                }")>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
    );
  });
}
