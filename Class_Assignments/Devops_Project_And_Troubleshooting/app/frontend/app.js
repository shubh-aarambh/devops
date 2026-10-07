const API_BASE = '/api';

async function checkHealth() {
  try {
    const res = await fetch('/health');
    const data = await res.json();
    if (data.status === 'UP') {
      document.getElementById('backend-status').innerHTML = '<span class="dot"></span> Online (Port 5000)';
      document.getElementById('db-status').innerHTML = '<span class="dot"></span> PostgreSQL Connected';
    }
  } catch (e) {
    document.getElementById('backend-status').innerHTML = '<span class="dot"></span> Offline';
    document.getElementById('db-status').innerHTML = '<span class="dot"></span> Unknown';
  }
}

async function loadTasks() {
  const tbody = document.getElementById('task-list');
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    const result = await res.json();
    if (result.success && result.data.length > 0) {
      tbody.innerHTML = result.data.map(t => {
        const cls = t.status === 'Completed' ? 'status-completed' : (t.status === 'In Progress' ? 'status-progress' : 'status-pending');
        return `<tr>
          <td>#${t.id}</td>
          <td><strong>${t.title}</strong></td>
          <td>${t.description}</td>
          <td><span class="status-pill ${cls}">${t.status}</span></td>
          <td>${t.author}</td>
        </tr>`;
      }).join('');
    } else {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No tasks registered yet.</td></tr>';
    }
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#f87171;">Error connecting to PostgreSQL backend API.</td></tr>';
  }
}

document.getElementById('add-task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const status = document.getElementById('task-status').value;

  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status, author: 'Shubh Shukla (24bcs10093)' })
    });
    if (res.ok) {
      document.getElementById('task-title').value = '';
      document.getElementById('task-desc').value = '';
      loadTasks();
    }
  } catch (err) {
    alert('Failed to save task: ' + err.message);
  }
});

document.getElementById('refresh-btn').addEventListener('click', () => {
  checkHealth();
  loadTasks();
});

// Initial load
checkHealth();
loadTasks();
