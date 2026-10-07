document.addEventListener('DOMContentLoaded', () => {
  const tasksContainer = document.getElementById('tasksList');
  const refreshBtn = document.getElementById('refreshBtn');
  const addForm = document.getElementById('addTaskForm');
  const titleInput = document.getElementById('taskTitle');

  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.success) {
        renderTasks(data.data);
      } else {
        tasksContainer.innerHTML = '<div style="color:#f87171;">Failed to load tasks.</div>';
      }
    } catch (err) {
      tasksContainer.innerHTML = '<div style="color:#f87171;">Error connecting to backend API: ' + err.message + '</div>';
    }
  }

  function renderTasks(tasks) {
    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<div>No tasks found.</div>';
      return;
    }
    tasksContainer.innerHTML = tasks.map(t => `
      <div class="task-item ${t.status === 'completed' ? 'completed' : ''}">
        <span>${t.title}</span>
        <span class="task-badge">${t.status}</span>
      </div>
    `).join('');
  }

  refreshBtn.addEventListener('click', fetchTasks);

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status: 'completed' })
      });
      titleInput.value = '';
      fetchTasks();
    } catch (err) {
      alert('Failed to add task: ' + err.message);
    }
  });

  fetchTasks();
});
