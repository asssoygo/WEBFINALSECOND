const API_URL = "/api";
let token = "";

async function register() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered");
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  token = data.accessToken;

  if (token) {
    document.getElementById("tasks-section").classList.remove("hidden");
    loadTasks();
  }
}

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tasks = await res.json();
  const list = document.getElementById("tasks-list");
  list.innerHTML = "";

tasks.forEach(task => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.title;

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.className = "delete-btn";
  btn.onclick = () => deleteTask(task._id);

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
});

}

async function createTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });

  loadTasks();
}
async function deleteTask(taskId) {
  await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadTasks();
}

