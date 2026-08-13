const root = document.documentElement;
const body = document.body;

const safeStorage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* Storage may be unavailable. */ }
  },
};

const languageFromQuery = new URLSearchParams(window.location.search).get("lang");
const storedLanguage = safeStorage.get("portfolio-language-v3");
const browserLanguage = navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
const initialLanguage = ["en", "de"].includes(languageFromQuery)
  ? languageFromQuery
  : (["en", "de"].includes(storedLanguage) ? storedLanguage : browserLanguage);

const updateInternalLinks = (language) => {
  document.querySelectorAll("a[data-internal]").forEach((link) => {
    const original = link.dataset.baseHref || link.getAttribute("href");
    link.dataset.baseHref = original;
    const url = new URL(original, window.location.origin);
    if (language === "de") url.searchParams.set("lang", "de");
    else url.searchParams.delete("lang");
    link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
  });
};

const applyLanguage = (language, persist = false) => {
  const selected = language === "de" ? "de" : "en";
  root.lang = selected;

  document.querySelectorAll("[data-en][data-de]").forEach((element) => {
    element.textContent = element.dataset[selected];
  });

  document.querySelectorAll("[data-aria-en][data-aria-de]").forEach((element) => {
    element.setAttribute("aria-label", element.dataset[selected === "de" ? "ariaDe" : "ariaEn"]);
  });

  const title = root.dataset[`title${selected === "de" ? "De" : "En"}`];
  const description = root.dataset[`description${selected === "de" ? "De" : "En"}`];
  if (title) document.title = title;
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  }
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title || document.title);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title || document.title);
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", selected === "de" ? "de_DE" : "en_GB");

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === selected));
  });

  document.querySelectorAll("[data-resume-link]").forEach((link) => {
    link.setAttribute("href", selected === "de"
      ? "/output/pdf/Dev_Ganatra_Resume_DE.pdf?v=2026-08-overleaf"
      : "/output/pdf/Dev_Ganatra_Resume_EN.pdf?v=2026-08-overleaf");
  });

  updateInternalLinks(selected);

  if (persist) {
    safeStorage.set("portfolio-language-v3", selected);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", selected);
    history.replaceState({}, "", url);
  }

  const canonical = root.dataset.canonical;
  if (canonical) {
    const canonicalUrl = new URL(canonical);
    if (new URL(window.location.href).searchParams.get("lang") === "de") {
      canonicalUrl.searchParams.set("lang", "de");
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl.href);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl.href);
  }

  document.dispatchEvent(new CustomEvent("portfolio:language", { detail: { language: selected } }));
};

window.portfolio = { language: initialLanguage, applyLanguage };
applyLanguage(initialLanguage);

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    window.portfolio.language = button.dataset.language;
    applyLanguage(button.dataset.language, true);
  });
});

const themeKey = "portfolio-theme-v3";
const themeToggles = [...document.querySelectorAll("[data-theme-toggle]")];
const applyTheme = (theme, persist = false) => {
  const selected = theme === "light" ? "light" : "dark";
  root.dataset.theme = selected;
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(selected === "light"));
    toggle.setAttribute("title", selected === "light" ? "Use dark theme" : "Use light theme");
  });
  if (persist) safeStorage.set(themeKey, selected);
};
applyTheme(safeStorage.get(themeKey) || "dark");
themeToggles.forEach((toggle) => toggle.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
}));

const menuButton = document.querySelector("[data-menu-toggle]");
const primaryNavigation = document.querySelector("[data-primary-navigation]");
const closeMenu = () => {
  body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
};
menuButton?.addEventListener("click", () => {
  const expanded = !body.classList.contains("menu-open");
  body.classList.toggle("menu-open", expanded);
  menuButton.setAttribute("aria-expanded", String(expanded));
});
primaryNavigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

const page = body.dataset.page;
document.querySelectorAll("[data-nav-page]").forEach((link) => {
  if (link.dataset.navPage === page) link.setAttribute("aria-current", "page");
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

const progressBar = document.querySelector("[data-reading-progress]");
const updateProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
};
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

const filters = [...document.querySelectorAll("[data-filter]")];
const filterItems = [...document.querySelectorAll("[data-category]")];
const filterCount = document.querySelector("[data-filter-count]");
const renderFilter = (selected) => {
  let visible = 0;
  filters.forEach((button) => {
    const active = button.dataset.filter === selected;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  filterItems.forEach((item) => {
    const categories = item.dataset.category.split(" ");
    const show = selected === "all" || categories.includes(selected);
    item.hidden = !show;
    if (show) visible += 1;
  });
  if (filterCount) filterCount.textContent = String(visible);
};
filters.forEach((button) => button.addEventListener("click", () => renderFilter(button.dataset.filter)));
if (filters.length) renderFilter("all");

const repositoryCards = [...document.querySelectorAll("[data-repository]")];
if (repositoryCards.length) {
  fetch("/data/projects.json")
    .then((response) => {
      if (!response.ok) throw new Error("Repository snapshot unavailable");
      return response.json();
    })
    .then((snapshot) => {
      const repositories = snapshot.repositories || [];
      const renderRepositoryMeta = () => {
        repositoryCards.forEach((card) => {
          const repository = repositories.find((item) => item.name === card.dataset.repository);
          if (!repository) return;
          const meta = card.querySelector("[data-repo-meta]");
          const link = card.querySelector("[data-repo-link]");
          const updated = new Intl.DateTimeFormat(root.lang === "de" ? "de-DE" : "en-GB", {
            month: "short",
            year: "numeric",
          }).format(new Date(repository.updated_at));
          if (meta) meta.textContent = `${repository.language || "Code"} · ${root.lang === "de" ? "aktualisiert" : "updated"} ${updated}`;
          if (link) link.href = repository.html_url;
        });
      };
      renderRepositoryMeta();
      document.addEventListener("portfolio:language", renderRepositoryMeta);
    })
    .catch(() => { /* The curated cards remain complete without live metadata. */ });
}

const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("[data-form-success]");
if (new URLSearchParams(window.location.search).get("message") === "sent") {
  if (formSuccess) formSuccess.hidden = false;
}
contactForm?.addEventListener("submit", (event) => {
  const honeyField = contactForm.querySelector('[name="botcheck"]');
  if (honeyField?.checked) {
    event.preventDefault();
    return;
  }
  const captchaResponse = contactForm.querySelector('textarea[name="h-captcha-response"]');
  const captchaError = contactForm.querySelector("[data-captcha-error]");
  if (!captchaResponse?.value) {
    event.preventDefault();
    if (captchaError) captchaError.hidden = false;
    return;
  }
  if (captchaError) captchaError.hidden = true;
  const redirect = contactForm.querySelector('[name="redirect"]');
  if (redirect) redirect.value = `https://devganatra.github.io/?lang=${root.lang}&message=sent#contact`;
  const submit = contactForm.querySelector('button[type="submit"]');
  if (submit) {
    submit.disabled = true;
    submit.textContent = root.lang === "de" ? "Wird gesendet…" : "Sending…";
  }
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("/service-worker.js").catch(() => {}));
}
