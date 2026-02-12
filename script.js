let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProject = null;

function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProject() {
  const name = document.getElementById("projectName").value;
  if (!name) return;

  projects.push({ name: name, tasks: [] });
  currentProject = projects.length - 1;

  saveData();
  renderProjects();
  document.getElementById("projectName").value = "";
}

function renderProjects() {
  const container = document.getElementById("projectTabs");
  container.innerHTML = "";

  projects.forEach((proj, index) => {
    const tab = document.createElement("div");
    tab.className = "project-tab" + (index === currentProject ? " active" : "");
    tab.innerText = proj.name;
    tab.onclick = () => {
      currentProject = index;
      renderProjects();
      renderTasks();
    };
    container.appendChild(tab);
  });

  renderTasks();
}

function addTask() {
  if (currentProject === null) return alert("Create a project first!");

  const task = {
    name: document.getElementById("taskName").value,
    user: document.getElementById("username").value,
    status: document.getElementById("status").value,
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
    comment: document.getElementById("comment").value
  };

  projects[currentProject].tasks.push(task);
  saveData();
  renderTasks();
}

function renderTasks() {
  const table = document.getElementById("taskTable");
  table.innerHTML = "";

  if (currentProject === null) return;

  projects[currentProject].tasks.forEach((task, index) => {
    const row = table.insertRow();

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.user}</td>
      <td>
        <select onchange="updateStatus(${index}, this.value)" class="status ${task.status}">
          <option value="green" ${task.status === "green" ? "selected" : ""}>Done</option>
          <option value="orange" ${task.status === "orange" ? "selected" : ""}>In Progress</option>
          <option value="red" ${task.status === "red" ? "selected" : ""}>Blocked</option>
        </select>
      </td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.comment}</td>
      <td>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
  });
}

function updateStatus(index, newStatus) {
  projects[currentProject].tasks[index].status = newStatus;
  saveData();
  renderTasks();
}

function deleteTask(index) {
  projects[currentProject].tasks.splice(index, 1);
  saveData();
  renderTasks();
}

renderProjects();
