// Get elements from the page
let expressionEl = document.getElementById('expression');
let resultEl = document.getElementById('result');
let themeBtn = document.getElementById('theme-btn');

// Add number/operator to the expression
function appendToDisplay(value) {
  expressionEl.innerText += value;
  updateLiveResult(); // Show live result after adding
}

// Clear both expression and result
function clearDisplay() {
  expressionEl.innerText = '';
  resultEl.innerText = '';
}

// Evaluate and show the result, replace expression with final answer
function calculate() {
  try {
    let result = Function('"use strict";return (' + expressionEl.innerText + ')')();
    resultEl.innerText = result;
    expressionEl.innerText = result;
  } catch {
    resultEl.innerText = 'Error';
  }
}

// Show live result while typing
function updateLiveResult() {
  try {
    let result = Function('"use strict";return (' + expressionEl.innerText + ')')();
    resultEl.innerText = result;
  } catch {
    resultEl.innerText = ''; // Clear if error while typing
  }
}

// Toggle between positive and negative value
function toggleSign() {
  let current = expressionEl.innerText;
  if (!current) return;

  try {
    let result = Function('"use strict";return (' + current + ')')();
    expressionEl.innerText = (-result).toString();
    resultEl.innerText = (-result).toString();
  } catch {
    resultEl.innerText = 'Error';
  }
}

// Remove last character (like backspace)
function backspace() {
  expressionEl.innerText = expressionEl.innerText.slice(0, -1);
  updateLiveResult();
}

// Toggle between light and dark themes
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme when page loads
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  } else {
    themeBtn.textContent = '🌙';
  }
};

// Enable keyboard input support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // If key is number or operator, append
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
