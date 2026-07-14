const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();

const progressBar = document.querySelector(".progress span");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${progress})`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const languageColors = {
  Swift: "#f05138",
  Python: "#3776ab",
  JavaScript: "#d6b92c",
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
  const grid = document.querySelector("#repo-grid");
  if (!grid) return;

  try {
    const response = await fetch("https://api.github.com/users/devganatra/repos?sort=updated&per_page=12");
    if (!response.ok) throw new Error("GitHub request failed");

    const repositories = (await response.json())
      .filter((repository) => !repository.fork && repository.name !== "devganatra.github.io")
      .slice(0, 6);

    if (!repositories.length) throw new Error("No repositories found");

    grid.innerHTML = repositories.map((repository) => {
      const language = repository.language || "Project";
      const color = languageColors[language] || "#f2623d";
      const description = repository.description || "Explore this project and its source on GitHub.";
      return `
        <a class="repo-card" href="${escapeHtml(repository.html_url)}" target="_blank" rel="noreferrer">
          <div class="repo-card-top">
            <span class="repo-language" style="--repo-color:${color}"><i></i>${escapeHtml(language)}</span>
            <span>↗</span>
          </div>
          <h4>${escapeHtml(repository.name.replaceAll("_", " "))}</h4>
          <p>${escapeHtml(description)}</p>
          <div class="repo-card-meta"><span>☆ ${repository.stargazers_count}</span><span>⑂ ${repository.forks_count}</span></div>
        </a>`;
    }).join("");
  } catch (error) {
    grid.innerHTML = '<p class="repo-error">Repositories are taking a moment to load. <a href="https://github.com/devganatra?tab=repositories">View them directly on GitHub ↗</a></p>';
  }
};

renderRepositories();
