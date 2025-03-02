import { toast } from "./toast.js";

/**
 * Initializes the application by setting up event listeners and displaying tasks.
 */
export function app() {
  const formTodo = document.getElementById("todo-form");

  // Get the current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser.id;

  // Create a new task if the form exists
  if (formTodo) {
    formTodo.addEventListener("submit", handleFormSubmit);

    // Modal elements
    const modal = document.getElementById("modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const createTodoBtn = document.getElementById("create-todo-btn");

    createTodoBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    modalCloseBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Display existing tasks
  const todoListTodoContainer = document.getElementById("todo-list-todo");
  const todoListDoneContainer = document.getElementById("todo-list-done");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const filteredTasks = tasks.filter((task) => task.userId === userId);
  if (Array.isArray(filteredTasks) && filteredTasks.length) {
    filteredTasks.forEach((task) => {
      const container =
        task.status === "done" ? todoListDoneContainer : todoListTodoContainer;
      displayTask(task, container);
    });
  }

  // Display messages if there are no tasks
  displayNoTasksMessages(
    filteredTasks,
    todoListTodoContainer,
    todoListDoneContainer
  );
}

/**
 * Handles the submission of the todo form to create a new task.
 * @param {Event} e - The form submission event.
 */
function handleFormSubmit(e) {
  e.preventDefault();
  const formTodo = e.target;
  const formData = new FormData(formTodo);

  const id = crypto.randomUUID();
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const deadline = formData.get("deadline");

  // Validate all fields are filled
  if (!title || !description || !status || !deadline) {
    toast({
      message: "All fields are required.",
      type: "error",
    });
    return;
  }

  // Get the current user ID
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser.id;

  // Retrieve existing tasks and add the new task
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = { id, title, description, status, deadline, userId };
  const updatedTasks = [...tasks, newTask];
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // Display the new task in the appropriate container
  const todoListTodoContainer = document.getElementById("todo-list-todo");
  displayTask(newTask, todoListTodoContainer);

  // Display updated messages
  displayNoTasksMessages(
    updatedTasks,
    todoListTodoContainer,
    document.getElementById("todo-list-done")
  );

  // Reset the form and close the modal
  formTodo.reset();
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");

  toast({
    message: "Task created successfully.",
    type: "success",
  });
}

/**
 * Displays a single task in the specified container.
 * @param {{deadline: string, description: string, id: string, status: string, title: string, userId: string}} task - The task object to display.
 * @param {HTMLElement} container - The container element to append the task to.
 */
function displayTask(task, container) {
  const li = document.createElement("li");
  li.id = task.id;
  li.classList.add("task");

  const h2 = document.createElement("h2");
  h2.textContent = task.title;
  li.appendChild(h2);

  const pDescription = document.createElement("p");
  pDescription.classList.add("description");
  pDescription.textContent = task.description;
  li.appendChild(pDescription);

  const pDeadline = document.createElement("p");
  pDeadline.classList.add("deadline");
  const deadlineDate = new Date(task.deadline);
  pDeadline.textContent = deadlineDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  li.appendChild(pDeadline);

  // Only add action buttons if the task is not done
  if (task.status !== "done") {
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const validateBtn = document.createElement("button");
    validateBtn.textContent = "Validate";
    validateBtn.classList.add("validate-btn");
    actionsDiv.appendChild(validateBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    actionsDiv.appendChild(deleteBtn);

    // Event listener for the validate button
    validateBtn.addEventListener("click", () => handleValidate(task, li));

    // Event listener for the delete button
    deleteBtn.addEventListener("click", () =>
      handleDelete(task, li, container)
    );

    li.appendChild(actionsDiv);
  }

  container.appendChild(li);
}

/**
 * Handles the validation of a task, marking it as done and moving it to the done container.
 * @param {{deadline: string, description: string, id: string, status: string, title: string, userId: string}} task - The task object to display.
 * @param {HTMLElement} taskElement - The list item element representing the task.
 */
function handleValidate(task, taskElement) {
  task.status = "done";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  toast({
    message: "Task validated successfully.",
    type: "success",
  });

  // Remove the actions container and move the task to the done container
  const actionsDiv = taskElement.querySelector(".actions");
  if (actionsDiv) {
    taskElement.removeChild(actionsDiv);
  }
  const todoListDoneContainer = document.getElementById("todo-list-done");
  todoListDoneContainer.appendChild(taskElement);

  // Display updated messages
  displayNoTasksMessages(
    updatedTasks,
    document.getElementById("todo-list-todo"),
    todoListDoneContainer
  );
}

/**
 * Handles the deletion of a task from both the display and localStorage.
 * @param {{deadline: string, description: string, id: string, status: string, title: string, userId: string}} task - The task object to display.
 * @param {HTMLElement} taskElement - The list item element representing the task.
 * @param {HTMLElement} container - The container element from which to remove the task.
 */
function handleDelete(task, taskElement, container) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((t) => t.id !== task.id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  toast({
    message: "Task deleted successfully.",
    type: "success",
  });

  // Remove the task element from the DOM
  container.removeChild(taskElement);

  // Display updated messages
  displayNoTasksMessages(
    updatedTasks,
    document.getElementById("todo-list-todo"),
    document.getElementById("todo-list-done")
  );
}

/**
 * Displays messages when there are no "To Do" or "Done" tasks.
 * @param {Array} tasks - The array of all tasks.
 * @param {HTMLElement} todoContainer - The container for "To Do" tasks.
 * @param {HTMLElement} doneContainer - The container for "Done" tasks.
 */
function displayNoTasksMessages(tasks, todoContainer, doneContainer) {
  // Clear existing messages
  const existingTodoMessage = todoContainer.querySelector(".no-tasks-message");
  if (existingTodoMessage) {
    todoContainer.removeChild(existingTodoMessage);
  }
  const existingDoneMessage = doneContainer.querySelector(".no-tasks-message");
  if (existingDoneMessage) {
    doneContainer.removeChild(existingDoneMessage);
  }

  // Check for "To Do" tasks
  const hasTodo = tasks.some((task) => task.status === "todo");
  if (!hasTodo) {
    const pNoTodo = document.createElement("p");
    pNoTodo.textContent = "No tasks to display.";
    pNoTodo.classList.add("no-tasks-message");
    todoContainer.appendChild(pNoTodo);
  }

  // Check for "Done" tasks
  const hasDone = tasks.some((task) => task.status === "done");
  if (!hasDone) {
    const pNoDone = document.createElement("p");
    pNoDone.textContent = "No tasks to display.";
    pNoDone.classList.add("no-tasks-message");
    doneContainer.appendChild(pNoDone);
  }
}
