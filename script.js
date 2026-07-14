const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();

const languageColors = {
  Swift: "#f05138",
  Python: "#3776ab",
  JavaScript: "#d7b52b",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  Shell: "#89e051",
};

const escapeHtml = (value = "") =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

const translateUi = (key) => window.portfolioI18n?.translate(key, window.portfolioI18n.language);

const renderRepositories = async () => {
  const list = document.querySelector("#repo-list");
  if (!list) return;
  list.innerHTML = `<p class="repo-message">${escapeHtml(translateUi("github.loading") || "Loading public repositories…")}</p>`;

  try {
    const response = await fetch("https://api.github.com/users/devganatra/repos?sort=updated&per_page=12", {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("GitHub request failed");

    const repositories = (await response.json())
      .filter((repository) => !repository.fork && repository.name !== "devganatra.github.io")
      .slice(0, 6);

    if (!repositories.length) throw new Error("No repositories found");

    list.innerHTML = repositories.map((repository, index) => {
      const language = repository.language || "Project";
      const color = languageColors[language] || "#315df4";
      const description = repository.description || translateUi("github.repoFallback") || "Explore the source and project details on GitHub.";
      return `
        <a class="repo-row" href="${escapeHtml(repository.html_url)}" target="_blank" rel="noreferrer">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(repository.name.replaceAll("_", " "))}</h3>
          <p>${escapeHtml(description)}</p>
          <div class="repo-row-meta"><span style="color:${color}">●</span><span>${escapeHtml(language)}</span><span>☆ ${repository.stargazers_count}</span></div>
          <b>↗</b>
        </a>`;
    }).join("");
  } catch (error) {
    const message = translateUi("github.error") || "Repositories are temporarily unavailable. View them on GitHub ↗";
    list.innerHTML = `<p class="repo-message"><a href="https://github.com/devganatra?tab=repositories">${escapeHtml(message)}</a></p>`;
  }
};

renderRepositories();
window.addEventListener("portfolio-language-change", renderRepositories);

const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("#form-success");

if (new URLSearchParams(window.location.search).get("message") === "sent") {
  formSuccess.hidden = false;
}

contactForm?.addEventListener("submit", (event) => {
  const honeyField = contactForm.querySelector('[name="_honey"]');
  if (honeyField.value) {
    event.preventDefault();
    return;
  }

  const nextField = contactForm.querySelector('[name="_next"]');
  nextField.value = `https://devganatra.github.io/?lang=${window.portfolioI18n.language}&message=sent#contact`;

  const button = contactForm.querySelector('button[type="submit"]');
  button.disabled = true;
  const label = button.querySelector("span");
  label.textContent = translateUi("contact.form.sending") || "Sending…";
});
