const inputField = document.querySelector('#inputField');
const remind_btn = document.querySelector('#remind_btn');
const itemList = document.querySelector('#itemList');
const msg = document.querySelector('#msg');
const searchInput = document.querySelector('#searchInput');

const weatherData = document.querySelector('#weatherData');

/*
Local Storage functionality
*/

function loadFromStorage() {
  return JSON.parse(localStorage.getItem('reminders') || '[]');
}

function saveReminders(reminders) {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

/*
Render UI
*/

function render(reminders) {
  itemList.innerHTML = '';

  reminders.forEach((item) => {
    const li = document.createElement('li');
    if (item.completed) li.classList.add('checked');

    const text = document.createElement('span');
    text.className = 'remind';
    text.textContent = item.reminder;

    const close = document.createElement('span');
    close.className = 'close';
    close.textContent = '\u00D7';

    li.append(text, close);
    itemList.appendChild(li);
  });
}

let reminders = loadFromStorage();
render(reminders);
//
//
//
//
//

remind_btn.addEventListener('click', addReminder);
inputField.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addReminder();
  }
});

function addReminder() {
  const text = inputField.value.trim();

  if (text === '') {
    msg.classList.add('error');
    msg.textContent = 'No input received';
    msg.style.display = 'block';
    setTimeout(() => {
      msg.style.display = 'none';
    }, 1000);
    return;
  }

  reminders.push({ reminder: text, completed: false });
  saveReminders(reminders);
  render(reminders);

  inputField.value = '';
  itemList.lastElementChild.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
}

function toggleReminder(index) {
  reminders[index].completed = !reminders[index].completed;
  saveReminders(reminders);
  render(reminders);
}

function deleteReminder(index) {
  reminders.splice(index, 1);
  saveReminders(reminders);
  render(reminders);
}

itemList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const index = Array.from(itemList.children).indexOf(li);

  if (e.target.classList.contains('remind')) toggleReminder(index);
  if (e.target.classList.contains('close')) deleteReminder(index);
});
