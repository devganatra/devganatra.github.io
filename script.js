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

const renderRepositories = async () => {
  const list = document.querySelector("#repo-list");
  if (!list) return;

  try {
    const response = await fetch("https://api.github.com/users/devganatra/repos?sort=updated&per_page=12");
    if (!response.ok) throw new Error("GitHub request failed");

    const repositories = (await response.json())
      .filter((repository) => !repository.fork && repository.name !== "devganatra.github.io")
      .slice(0, 6);

    if (!repositories.length) throw new Error("No repositories found");

    list.innerHTML = repositories.map((repository, index) => {
      const language = repository.language || "Project";
      const color = languageColors[language] || "#315df4";
      const description = repository.description || "Explore the source and project details on GitHub.";
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
    list.innerHTML = '<p class="repo-message">Repositories are temporarily unavailable. <a href="https://github.com/devganatra?tab=repositories">View them on GitHub ↗</a></p>';
  }
};

renderRepositories();
