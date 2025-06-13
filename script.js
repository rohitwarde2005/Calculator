let display = document.getElementById('display');
let themeBtn = document.getElementById('theme-btn');

function appendToDisplay(value) {
  display.innerText += value;
}

function clearDisplay() {
  display.innerText = '';
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = 'Error';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');

  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';

  // Save preference
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  } else {
    themeBtn.textContent = '🌙';
  }
};
