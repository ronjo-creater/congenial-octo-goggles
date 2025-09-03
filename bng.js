console.log("BNG.js loaded");
// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve all static files (HTML, CSS, JS, images, audio, video)
app.use(express.static(path.join(__dirname, 'public')));

// Default route to home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional: Routes to login or signup pages if needed
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // 1. Toggle login/signup forms
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleBtn = document.getElementById("toggle-auth");

  if (toggleBtn && loginForm && signupForm) {
    toggleBtn.addEventListener("click", () => {
      loginForm.classList.toggle("hidden");
      signupForm.classList.toggle("hidden");
    });
  }

  // 2. Phone input interactivity
  const phoneInput = document.querySelector('.phone-input input[type="tel"]');
  const countrySelect = document.querySelector('.phone-input select[name="country-code"]');
  const submitButtons = document.querySelectorAll('form button[type="submit"]');
  const flagDisplay = document.getElementById("flag-display");
  const phonePreview = document.getElementById("phone-preview");

  function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const isValid = /^[0-9]{6,15}$/.test(phoneValue);
    const selectedOption = countrySelect.selectedOptions[0];
    const flag = selectedOption.dataset.flag || "";
    const code = selectedOption.value;

    // Show flag
    if (flagDisplay) flagDisplay.textContent = flag;

    // Enable/disable submit buttons
    submitButtons.forEach(btn => {
      btn.disabled = !isValid;
    });

    // Add visual classes
    phoneInput.classList.toggle("valid", isValid);
    phoneInput.classList.toggle("invalid", !isValid && phoneValue !== "");

    // Optional preview
    if (phonePreview) {
      phonePreview.textContent = isValid
        ? `📞 ${flag} ${code}${phoneValue}`
        : "❌ Invalid phone number";
      phonePreview.style.color = isValid ? "green" : "red";
    }
  }

  if (phoneInput && countrySelect) {
    phoneInput.addEventListener("input", validatePhone);
    countrySelect.addEventListener("change", validatePhone);
  }
});
