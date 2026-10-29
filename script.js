
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Reveal content when it enters the screen
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Small rotating role animation
const typingText = document.getElementById("typingText");
const roles = [
  "digital experiences.",
  "data-driven solutions.",
  "creative applications."
];

let roleIndex = 0;

setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  typingText.style.opacity = "0";

  setTimeout(() => {
    typingText.textContent = roles[roleIndex];
    typingText.style.opacity = "1";
  }, 250);
}, 3000);

// Current year in footer
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Contact form: opens the visitor's email application
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const subject = document.getElementById("visitorSubject").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in every field.";
    return;
  }

  const recipient = "sowmiyanethaji@gmail.com";
  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formStatus.textContent =
    "Opening your email app. Send the prepared email to complete your message.";

  window.location.href =
    `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});
