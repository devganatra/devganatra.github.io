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

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

const translateUi = (key) => window.portfolioI18n?.translate(key, window.portfolioI18n.language);

// Preserve the original Beta 1 palette as the default; dark mode remains optional.
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeStorageKey = "portfolio-theme-v2";
const getStoredTheme = () => {
  try { return localStorage.getItem(themeStorageKey); } catch (error) { return null; }
};
const applyTheme = (theme, persist = false) => {
  const selected = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selected;
  themeToggle?.setAttribute("aria-pressed", String(selected === "dark"));
  themeToggle?.setAttribute("title", selected === "dark" ? "Use light theme" : "Use dark theme");
  if (persist) {
    try { localStorage.setItem(themeStorageKey, selected); } catch (error) { /* Storage may be unavailable. */ }
  }
};
applyTheme(getStoredTheme() || "light");
themeToggle?.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));

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

// Curated project cards use GitHub only for lightweight, verifiable metadata.
const formatProjectDate = (value) => {
  if (!value) return "—";
  const locale = window.portfolioI18n?.language === "de" ? "de-DE" : "en-GB";
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(value));
};

let projectMetadata = [];
const renderProjectMetadata = () => {
  document.querySelectorAll("[data-repository]").forEach((card) => {
    const repository = projectMetadata.find((item) => item.name === card.dataset.repository);
    if (!repository) return;
    const language = card.querySelector("[data-repo-language]");
    const updated = card.querySelector("[data-repo-updated]");
    if (language && repository.language) language.textContent = repository.language;
    if (updated) {
      updated.textContent = formatProjectDate(repository.updated_at);
      updated.dateTime = repository.updated_at || "";
    }
  });
};

const loadProjectMetadata = async () => {
  try {
    let response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) response = await fetch("https://api.github.com/users/devganatra/repos?sort=updated&per_page=100", { cache: "no-store" });
    if (!response.ok) throw new Error("Project metadata unavailable");
    const payload = await response.json();
    projectMetadata = (Array.isArray(payload) ? payload : payload.repositories) || [];
    renderProjectMetadata();
  } catch (error) {
    // The cards remain complete and useful when GitHub is unavailable.
  }
};

loadProjectMetadata();
window.addEventListener("portfolio-language-change", renderProjectMetadata);

// Evidence links connect capability claims to the strongest relevant proof.
const evidenceTargets = {
  product: '[data-project-card="sakhya"]',
  embedded: '[data-project-card="sakhya"]',
  tools: '[data-project-card="portfolio"]',
  research: '[data-case-study="research"]',
};
document.querySelectorAll("[data-evidence]").forEach((button) => button.addEventListener("click", () => {
  const evidence = button.dataset.evidence;
  const target = document.querySelector(evidenceTargets[evidence]);
  const highlight = target?.closest(".work-card") || target;
  highlight?.classList.add("is-evidence");
  setTimeout(() => highlight?.classList.remove("is-evidence"), 1800);
  highlight?.scrollIntoView({ behavior: "smooth", block: "center" });
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
