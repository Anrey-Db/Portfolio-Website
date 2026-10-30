
const projects = [
  {
    title: "Planner App",
    category: "APP DEVELOPMENT",
    description:
      "A structured planning application designed to help users organize tasks, monitor progress, and manage daily priorities.",
    role: "Application design and development.",
    tools: "Dart, C++, CMake, Swift, HTML, C",
    year: "App",
    note: "Designed as a practical study in application structure, task management, and cross-platform development.",
    repository: "https://github.com/Anrey-Db/Planner-App"
  },
  {
    title: "Tailoring Management System",
    category: "WEB APPLICATION",
    description:
      "A web-based management system that supports tailoring operations, including orders, client records, measurements, and fittings.",
    role: "Web application design and development.",
    tools: "Laravel, Blade",
    year: "Web",
    note: "Focused on organizing operational data into a clear and efficient workflow.",
    repository: "https://github.com/Anrey-Db/TailoringManagementSystem"
  },
  {
    title: "Appointment Booking System",
    category: "WEB DEVELOPMENT",
    description:
      "A responsive appointment scheduling interface that enables users to review availability and select a suitable time.",
    role: "Front-end design and development.",
    tools: "Pure JavaScript",
    year: "JS",
    note: "Built with vanilla JavaScript to demonstrate interaction design, state handling, and responsive behavior.",
    repository: "https://github.com/Anrey-Db/Appointment-Booking-System"
  }
];

const skillSets = {
  all: {
    labels: ["UI/UX", "HTML", "JS", "FIGMA", "ADOBE", "PROTO"],
    values: [85, 90, 72, 88, 76, 82]
  },
  design: {
    labels: ["UI/UX", "FIGMA", "ADOBE", "PROTO", "TYPO", "MOTION"],
    values: [85, 88, 76, 82, 78, 71]
  },
  development: {
    labels: ["HTML", "CSS", "JS", "PHP", "C++", "GIT"],
    values: [90, 86, 72, 68, 64, 80]
  },
  workflow: {
    labels: ["RESEARCH", "SYSTEMS", "TESTING", "DOCS", "VERSION", "DELIVERY"],
    values: [82, 79, 74, 88, 80, 77]
  }
};

function updateSkillsChart(filter) {
  const set = skillSets[filter] || skillSets.all;
  const xPositions = [60, 148, 236, 324, 412, 500];
  const yForValue = (value) => 212 - value * 1.84;
  const linePath = set.values.map((value, index) => `${index ? "L" : "M"} ${xPositions[index]} ${yForValue(value)}`).join(" ");
  const areaPath = `M 60 212 L ${set.values.map((value, index) => `${xPositions[index]} ${yForValue(value)}`).join(" L ")} L 500 212 Z`;
  const chart = document.querySelector(".skills-chart");
  if (!chart) return;

  chart.querySelector(".skills-line").setAttribute("d", linePath);
  chart.querySelector(".skills-area").setAttribute("d", areaPath);
  chart.querySelectorAll(".skill-points > g").forEach((point, index) => {
    point.querySelector("circle").setAttribute("cy", yForValue(set.values[index]));
    point.querySelector("text").setAttribute("y", yForValue(set.values[index]) - 13);
    point.querySelector("text").textContent = `${set.values[index]}%`;
  });
  chart.querySelectorAll(".chart-labels text").forEach((label, index) => {
    label.textContent = set.labels[index];
  });
}

document.querySelectorAll(".skills-filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".skills-filter").forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    updateSkillsChart(button.dataset.skillFilter);
  });
});

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
