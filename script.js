
const projects = [
  {
    title: "Planner App",
    category: "APP DEVELOPMENT",
    description:
      "A planner application built using Dart, C++, CMake, Swift, HTML, C, and other technologies.",
    role: "Application development.",
    tools: "Dart, C++, CMake, Swift, HTML, C, and others",
    year: "App",
    note: "Built with a mix of programming languages and development tools.",
    repository: "https://github.com/Anrey-Db/Planner-App"
  },
  {
    title: "Tailoring Management System",
    category: "WEB APPLICATION",
    description:
      "A management system for tailoring, built with the Laravel framework and Blade templates.",
    role: "Web application development.",
    tools: "Laravel, Blade",
    year: "Web",
    note: "Built with Laravel and Blade.",
    repository: "https://github.com/Anrey-Db/TailoringManagementSystem"
  },
  {
    title: "Appointment Booking System",
    category: "WEB DEVELOPMENT",
    description:
      "An appointment booking system implemented using pure JavaScript.",
    role: "Web development.",
    tools: "Pure JavaScript",
    year: "JS",
    note: "Implemented without a JavaScript framework.",
    repository: "https://github.com/Anrey-Db/Appointment-Booking-System"
  }
];

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded =
    menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.querySelector(".theme-toggle");

const storedTheme = localStorage.getItem("portfolio-theme");

if (storedTheme === "light" || storedTheme === "dark") {
  document.documentElement.dataset.theme =
    storedTheme === "light" ? "light" : "";
}

function updateThemeLabel() {
  const isLight =
    document.documentElement.dataset.theme === "light";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
}

updateThemeLabel();

themeToggle.addEventListener("click", () => {
  const isLight =
    document.documentElement.dataset.theme === "light";

  const nextTheme = isLight ? "dark" : "light";

  if (nextTheme === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }

  localStorage.setItem("portfolio-theme", nextTheme);

  updateThemeLabel();
});

// ==========================================
// PROJECT DETAILS MODAL
// ==========================================

const projectDialog = document.querySelector("#project-dialog");

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[Number(button.dataset.project)];

    if (!project) return;

    document.querySelector("#dialog-kicker").textContent =
      project.category;

    document.querySelector("#dialog-title").textContent =
      project.title;

    document.querySelector("#dialog-description").textContent =
      project.description;

    document.querySelector("#dialog-role").textContent =
      project.role;

    document.querySelector("#dialog-tools").textContent =
      project.tools;

    document.querySelector("#dialog-year").textContent =
      project.year;

    document.querySelector("#dialog-note").textContent =
      project.note;

    document.querySelector("#dialog-repository-link").href =
      project.repository;

    projectDialog.showModal();
  });
});

// Close modal button

document.querySelector(".dialog-close").addEventListener("click", () => {
  projectDialog.close();
});

// Close modal when clicking outside

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});

// ==========================================
// CONTACT FORM - GMAIL INTEGRATION
// ==========================================

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validate form
  if (!contactForm.reportValidity()) return;

  // Get form values
  const formData = new FormData(contactForm);

  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();

  // Prepare Gmail subject
  const subject = encodeURIComponent(
    `Portfolio hello from ${name}`
  );

  // Prepare Gmail message
  const body = encodeURIComponent(
    `${message}\n\nFrom: ${name}\nEmail: ${email}`
  );

  // Gmail compose URL
  const gmailURL =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=brisoanrey@gmail.com` +
    `&su=${subject}` +
    `&body=${body}`;

  // Open Gmail in a new tab
  formNote.textContent = "Opening Gmail...";

  window.open(
    gmailURL,
    "_blank",
    "noopener,noreferrer"
  );
});

// ==========================================
// AUTOMATIC COPYRIGHT YEAR
// ==========================================

document.querySelector("#current-year").textContent =
  String(new Date().getFullYear());
