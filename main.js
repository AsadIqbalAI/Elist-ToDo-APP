const inputTodoValue = document.getElementById("todo-input");
const addBtn = document.querySelector("#add-todo-btn");
const todoListContainer = document.querySelector("#todo-output");
const todoCountContainer = document.querySelector(".todo-count");
const totalTodosTag = document.querySelector("#total-todos");
const totalcompletedTodosTag = document.querySelector("#total-completed-todos");
let todosCount = 0;
let completedTodos = 0;

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTodoItem(task.text, task.completed);
  });
  countTodos();
};

const saveTasks = () => {
  const tasks = Array.from(todoListContainer.children).map((todo) => ({
    text: todo.querySelector("span").textContent,
    completed: todo.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTodoItem = (text, completed = false) => {
  if (checkDuplicateTodo(text)) {
    alert("Task already exists with the same ToDo data.");
    return;
  }
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerHTML = `
    <span>${text}</span>
    <div class="actions">
      <img class="delete-icon" src="icons/delete.svg" />
      <img class="complete-icon" src="icons/tick.svg" />
    </div>`;
  if (completed) {
    newTodo.classList.add("completed");
  }
  todoListContainer.appendChild(newTodo);
};
inputTodoValue.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
const addTodo = () => {
  const taskText = inputTodoValue.value.trim();
  if (taskText !== "") {
    createTodoItem(taskText);
    inputTodoValue.value = "";
    countTodos();
    saveTasks();
  }
};

const handleComplete = (e) => {
  const item = e.target;
  if (item.classList.contains("complete-icon")) {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
    countTodos();
    saveTasks();
  }
};

const handleDelete = (e) => {
  const item = e.target;
  if (item.classList.contains("delete-icon")) {
    const todo = item.parentElement.parentElement;
    todo.remove();
    countTodos();
    saveTasks();
  }
};

const countTodos = () => {
  completedTodos = document.querySelectorAll(".completed").length;
  todosCount = document.querySelectorAll(".todo-item").length;
  totalTodosTag.textContent = todosCount;
  totalcompletedTodosTag.textContent = completedTodos;
};

const checkDuplicateTodo = (text) => {
  const todoItems = Array.from(document.querySelectorAll(".todo-item"));
  return todoItems.some((todo) => {
    const todoText = todo.querySelector("span");
    return todoText && todoText.textContent === text;
  });
};

addBtn.addEventListener("click", addTodo);
todoListContainer.addEventListener("click", handleComplete);
todoListContainer.addEventListener("click", handleDelete);
document.addEventListener("DOMContentLoaded", loadTasks);
