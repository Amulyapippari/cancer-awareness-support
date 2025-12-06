// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Real-time quotes using Quotable API
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

async function fetchQuote() {
  if (!quoteText || !quoteAuthor) return;

  quoteText.textContent = "Fetching a little dose of hope...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    quoteText.textContent = data.content || "Stay strong. You are not alone.";
    quoteAuthor.textContent = data.author ? `— ${data.author}` : "";
  } catch (error) {
    console.error(error);
    quoteText.textContent =
      "Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'";
    quoteAuthor.textContent = "";
  }
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", fetchQuote);
}

// Fetch one quote on initial load
fetchQuote();

// Simple front-end form validation & feedback
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showError(inputId, message) {
  const errorEl = document.querySelector(`.error-msg[data-for="${inputId}"]`);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    if (formStatus) formStatus.textContent = "";

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    let isValid = true;

    if (!name) {
      showError("name", "Please enter your name.");
      isValid = false;
    }

    if (!email) {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    }

    if (!message) {
      showError("message", "Please share a short message.");
      isValid = false;
    }

    if (!isValid) {
      if (formStatus) {
        formStatus.style.color = "#c62828";
        formStatus.textContent = "Please fix the highlighted fields.";
      }
      return;
    }

    // Since there is no backend, just show a friendly success message
    if (formStatus) {
      formStatus.style.color = "#2e7d32";
      formStatus.textContent =
        "Thank you for reaching out. Your message has been recorded locally (no server connected for this demo).";
    }

    contactForm.reset();
  });
}
