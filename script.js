const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();

const languageColors = {
  Swift: "#f05138",
  Python: "#3776ab",
  JavaScript: "#c6a800",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  Shell: "#5d8c40",
  "C++": "#00599c",
  C: "#555",
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

const translateUi = (key) => window.portfolioI18n?.translate(key, window.portfolioI18n.language);

// Theme follows the operating system until the visitor makes an explicit choice.
const themeToggle = document.querySelector("[data-theme-toggle]");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const getStoredTheme = () => {
  try { return localStorage.getItem("portfolio-theme"); } catch (error) { return null; }
};
const applyTheme = (theme, persist = false) => {
  const selected = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selected;
  themeToggle?.setAttribute("aria-pressed", String(selected === "dark"));
  themeToggle?.setAttribute("title", selected === "dark" ? "Use light theme" : "Use dark theme");
  if (persist) {
    try { localStorage.setItem("portfolio-theme", selected); } catch (error) { /* Storage may be unavailable. */ }
  }
};
applyTheme(getStoredTheme() || (systemTheme.matches ? "dark" : "light"));
themeToggle?.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));
systemTheme.addEventListener?.("change", (event) => { if (!getStoredTheme()) applyTheme(event.matches ? "dark" : "light"); });

// Scroll progress and active navigation keep the long-form page easy to orient in.
const progressBar = document.querySelector(".reading-progress span");
const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
const navSections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  const current = [...navSections].reverse().find((section) => section.getBoundingClientRect().top <= 140);
  navLinks.forEach((link) => link.classList.toggle("is-current", current && link.getAttribute("href") === `#${current.id}`));
};
updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

let repositories = [];
let activeProjectFilter = "all";
let projectQuery = "";
let projectSort = "updated";

const classifyRepository = (repository) => {
  const text = [repository.name, repository.description, repository.language, ...(repository.topics || [])].join(" ").toLowerCase();
  const categories = new Set();
  if (/product|agile|requirement|roadmap|stakeholder/.test(text)) categories.add("product");
  if (/embedded|firmware|microcontroller|arduino|esp|can|autosar|c\+\+|\bc\b|swift/.test(text)) categories.add("embedded");
  if (/python|tool|automation|jenkins|qt|script|cli|api|javascript|typescript/.test(text)) categories.add("tools");
  if (/research|sensor|signal|data|model|matlab|simulink|machine learning|electro/.test(text)) categories.add("research");
  if (!categories.size) categories.add("tools");
  return [...categories];
};

const renderRepositories = () => {
  const list = document.querySelector("#repo-list");
  if (!list) return;
  const normalizedQuery = projectQuery.trim().toLowerCase();
  const filtered = repositories
    .filter((repository) => activeProjectFilter === "all" || repository.categories.includes(activeProjectFilter))
    .filter((repository) => !normalizedQuery || [repository.name, repository.description, repository.language, ...(repository.topics || [])].join(" ").toLowerCase().includes(normalizedQuery))
    .sort((a, b) => {
      if (projectSort === "name") return a.name.localeCompare(b.name);
      if (projectSort === "stars") return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  if (!filtered.length) {
    list.innerHTML = `<p class="repo-message">${escapeHtml(translateUi("github.empty") || "No projects match this view.")}</p>`;
    return;
  }

  list.innerHTML = filtered.slice(0, 12).map((repository, index) => {
    const language = repository.language || "Project";
    const color = languageColors[language] || "#315df4";
    const description = repository.description || translateUi("github.repoFallback") || "Explore the source and project details on GitHub.";
    const categoryLabels = repository.categories.slice(0, 2).map((category) => `<span>${escapeHtml(category)}</span>`).join("");
    return `
      <a class="repo-row" href="${escapeHtml(repository.html_url)}" target="_blank" rel="noreferrer" data-categories="${escapeHtml(repository.categories.join(" "))}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(repository.name.replaceAll("_", " ").replaceAll("-", " "))}</h3>
        <p>${escapeHtml(description)}</p>
        <div class="repo-categories">${categoryLabels}</div>
        <div class="repo-row-meta"><span style="color:${color}">●</span><span>${escapeHtml(language)}</span><span>☆ ${repository.stargazers_count}</span></div>
        <b>↗</b>
      </a>`;
  }).join("");
};

const loadRepositories = async () => {
  const list = document.querySelector("#repo-list");
  if (!list) return;
  list.innerHTML = `<p class="repo-message">${escapeHtml(translateUi("github.loading") || "Loading public repositories…")}</p>`;
  try {
    let response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) response = await fetch("https://api.github.com/users/devganatra/repos?sort=updated&per_page=100", { cache: "no-store" });
    if (!response.ok) throw new Error("Project data unavailable");
    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.repositories;
    repositories = items
      .filter((repository) => !repository.fork && repository.name !== "devganatra.github.io")
      .map((repository) => ({ ...repository, categories: classifyRepository(repository) }));
    if (!repositories.length) throw new Error("No repositories found");
    renderRepositories();
  } catch (error) {
    const message = translateUi("github.error") || "Repositories are temporarily unavailable. View them on GitHub ↗";
    list.innerHTML = `<p class="repo-message"><a href="https://github.com/devganatra?tab=repositories">${escapeHtml(message)}</a></p>`;
  }
};

document.querySelector("#project-search")?.addEventListener("input", (event) => { projectQuery = event.target.value; renderRepositories(); });
document.querySelector("#project-sort")?.addEventListener("change", (event) => { projectSort = event.target.value; renderRepositories(); });
document.querySelectorAll("[data-project-filter]").forEach((button) => button.addEventListener("click", () => {
  activeProjectFilter = button.dataset.projectFilter;
  document.querySelectorAll("[data-project-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderRepositories();
}));

loadRepositories();
window.addEventListener("portfolio-language-change", () => { renderRepositories(); });

// Evidence links connect capability claims to real work and repositories.
const evidenceToCase = { product: "vaillant", embedded: "vaillant", tools: "bertrandt", research: "research" };
document.querySelectorAll("[data-evidence]").forEach((button) => button.addEventListener("click", () => {
  const evidence = button.dataset.evidence;
  activeProjectFilter = evidence;
  document.querySelectorAll("[data-project-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.projectFilter === evidence));
  renderRepositories();
  const caseButton = document.querySelector(`[data-case-study="${evidenceToCase[evidence]}"]`);
  caseButton?.closest(".work-card")?.classList.add("is-evidence");
  setTimeout(() => caseButton?.closest(".work-card")?.classList.remove("is-evidence"), 1800);
  document.querySelector(".github")?.scrollIntoView({ behavior: "smooth", block: "start" });
}));

// Case studies and working notes share one accessible dialog.
const dialog = document.querySelector("#portfolio-dialog");
const dialogContent = document.querySelector("#dialog-content");
const renderDialog = (entry, type) => {
  if (!entry || !dialog || !dialogContent) return;
  const body = type === "case"
    ? `${entry.sections.map(([title, text]) => `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}<div class="dialog-tags">${entry.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`
    : `${entry.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}<blockquote>${escapeHtml(entry.takeaway)}</blockquote>`;
  dialogContent.innerHTML = `<span class="dialog-eyebrow">${escapeHtml(entry.eyebrow)}</span><h2 id="dialog-title">${escapeHtml(entry.title)}</h2><p class="dialog-lead">${escapeHtml(entry.intro || entry.lead)}</p><div class="dialog-body">${body}</div>`;
  dialog.showModal();
};
const currentContent = () => window.portfolioContent?.[window.portfolioI18n?.language || "en"] || window.portfolioContent.en;
document.querySelectorAll("[data-case-study]").forEach((button) => button.addEventListener("click", () => renderDialog(currentContent().cases[button.dataset.caseStudy], "case")));
document.querySelectorAll("[data-article]").forEach((button) => button.addEventListener("click", () => renderDialog(currentContent().articles[button.dataset.article], "article")));
document.querySelector("[data-dialog-close]")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("#form-success");

if (new URLSearchParams(window.location.search).get("message") === "sent") formSuccess.hidden = false;

contactForm?.addEventListener("submit", (event) => {
  const honeyField = contactForm.querySelector('[name="botcheck"]');
  if (honeyField.checked) { event.preventDefault(); return; }
  const captchaResponse = contactForm.querySelector('textarea[name="h-captcha-response"]');
  const captchaError = contactForm.querySelector("#captcha-error");
  if (!captchaResponse?.value) {
    event.preventDefault();
    captchaError.hidden = false;
    return;
  }
  captchaError.hidden = true;
  contactForm.querySelector('[name="redirect"]').value = `https://devganatra.github.io/?lang=${window.portfolioI18n.language}&message=sent#contact`;
  const button = contactForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.querySelector("span").textContent = translateUi("contact.form.sending") || "Sending…";
});

if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
}
