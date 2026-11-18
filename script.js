let moods = [];
let selectedMood = '😊';
let selectedLabel = 'Happy';
let entries = JSON.parse(localStorage.getItem('mood_entries') || '[]');

// Load moods from JSON
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    moods = data.moods;
    renderMoods();
    renderEntries();
  });

function renderMoods() {
  const list = document.getElementById('moodList');
  list.innerHTML = '';
  moods.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mood-item' + (m.emoji === selectedMood ? ' selected' : '');
    div.innerHTML = `<div class="emoji">${m.emoji}</div><span>${m.label}</span>`;
    div.onclick = () => {
      selectedMood = m.emoji;
      selectedLabel = m.label;
      renderMoods();
    };
    list.appendChild(div);
  });
}

function login() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) return alert('Please enter your name 💖');
  localStorage.setItem('mood_user', name);
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('homePage').classList.remove('hidden');
  document.getElementById('greeting').innerText = `Hi, ${name}! 💖`;
}

function saveMood() {
  const note = document.getElementById('noteInput').value;
  const date = new Date().toLocaleString();
  entries.unshift({ mood: selectedMood, label: selectedLabel, note, date });
  localStorage.setItem('mood_entries', JSON.stringify(entries));
  document.getElementById('noteInput').value = '';
  renderEntries();
  alert('Mood saved! 💖');
}

function renderEntries() {
  const box = document.getElementById('entries');
  if (entries.length === 0) {
    box.innerHTML = '<p>No entries yet. Log your first mood! 🌱</p>';
    return;
  }
  box.innerHTML = entries.map(e => `
    <div class="entry">
      <div class="emoji">${e.mood}</div>
      <div>
        <b>${e.label}</b><br>
        <small>${e.date}</small><br>
        ${e.note || '(No note)'}
      </div>
    </div>
  `).join('');
}

function logout() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}
