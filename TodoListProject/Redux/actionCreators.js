import {
  addTodo,
  removeTodo,
  doTodo,
  getAllTodos,
} from "./actions.js";

function getAllTodosAction() {
  return {
    type: getAllTodos,
  };
}

function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}

function removeTodoAction(id) {
  return {
    type: removeTodo,
    id,
  };
}

function doTodoAction(id) {
  return {
    type: doTodo,
    id,
  };
}

export {
  addTodoAction,
  removeTodoAction,
  doTodoAction,
  getAllTodosAction
};
