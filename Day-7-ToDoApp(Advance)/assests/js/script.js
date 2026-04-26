let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById('taskInput').value.trim();
  console.log(text)
  const category = document.getElementById('category').value;
  console.log(category)
  const date = document.getElementById('date').value;
  console.log(date)

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    date: date,
    completed: false
  };

  tasks.push(newTask);
  save();
  render();

  document.getElementById('taskInput').value = '';
}

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  let filtered = tasks.filter(t => {
    if (!t || !t.text) return false;
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const searchInput = document.getElementById('search');
  const search = searchInput ? searchInput.value.toLowerCase() : '';

  filtered = filtered.filter(t =>
    t.text.toLowerCase().includes(search)
  );

  filtered.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';

    div.innerHTML = `
      <div>
        <strong class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </strong>
        <div style="font-size:12px;color:#888">
          ${task.category || ''} | ${task.date || ''}
        </div>
      </div>
      <div class="actions">
        <button onclick="toggle(${task.id})">✔</button>
        <button onclick="edit(${task.id})">✏</button>
        <button onclick="removeTask(${task.id}, this)">✖</button>
      </div>
    `;

    list.appendChild(div);
  });

  updateProgress();
}

function toggle(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  save();
  render();
}

function removeTask(id, btn) {
  const card = btn.closest('.task');
  if (card) {
    card.classList.add('removing');
  }

  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, 300);
}

function edit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt('Edit task', task.text);
  if (!newText || !newText.trim()) return;

  task.text = newText.trim();

  save();
  render();
}

function filterTasks(type) {
  filter = type;
  render();
}

const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', render);
}

// Progress
function updateProgress() {
  const validTasks = tasks.filter(t => t && t.text);
  const done = validTasks.filter(t => t.completed).length;

  document.getElementById('progress').innerText =
    `${done} / ${validTasks.length} completed`;
}

render();