function addTask() {
  // Get task details from the input fields
  let title = document.getElementById("taskTitle").value.trim();
  let description = document.getElementById("taskDescription").value.trim();

  // Check if title or description is empty
  if (!title || !description) {
    alert("Title and description cannot be empty.");
    return;
  }

  // Create a new task object
  let task = { title: title, description: description, completed: false };

  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task to the tasks array
  tasks.push(task);

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();

  // Clear the input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
}

function listTasks() {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Generate the HTML for the task list
  let taskListHTML = tasks
    .map((task, index) => {
      return `<div class="task">
                  <input type="checkbox" id="task-${index}" ${
        task.completed ? "checked" : ""
      } onclick="toggleTask(${index})">
                  <input type="text" value="${
                    task.title
                  }" onchange="updateTaskTitle(${index}, this.value)">
                  <textarea onchange="updateTaskDescription(${index}, this.value)">${
        task.description
      }</textarea>
                  <div class="button-container">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                  </div>
                </div>`;
    })
    .join("");

  // Set the HTML of the task list element
  document.getElementById("taskList").innerHTML = taskListHTML;
}

function editTask(index) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Enable the inputs for editing
  document.querySelector(
    `#taskList .task:nth-child(${index + 1}) input[type="text"]`
  ).disabled = false;
  document.querySelector(
    `#taskList .task:nth-child(${index + 1}) textarea`
  ).disabled = false;
}
function saveTask(index) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Update the task with the new values
  tasks[index].title = document.querySelector(
    `#taskList .task:nth-child(${index + 1}) input[type="text"]`
  ).value;
  tasks[index].description = document.querySelector(
    `#taskList .task:nth-child(${index + 1}) textarea`
  ).value;

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}

function toggleTask(index) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Toggle the completed status of the task at the specified index
  tasks[index].completed = !tasks[index].completed;

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}

function updateTaskTitle(index, newTitle) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Update the title of the task at the specified index
  tasks[index].title = newTitle;

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}

function updateTaskDescription(index, newDescription) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Update the description of the task at the specified index
  tasks[index].description = newDescription;

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}

function deleteTask(index) {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task at the specified index
  tasks.splice(index, 1);

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}
function completeAllTasks() {
  // Get the existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Mark all tasks as completed
  tasks = tasks.map((task) => ({ ...task, completed: true }));

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Update the task list UI
  listTasks();
}

// Load the task list when the page loads
window.onload = listTasks;
