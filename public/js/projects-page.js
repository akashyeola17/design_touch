import projects from "../../data/projects.js";

const grid = document.querySelector("[data-portfolio-grid]");
const count = document.querySelector("[data-project-count]");
const filters = [...document.querySelectorAll("[data-filter]")];
let activeCategory = "all";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function render() {
  const shown = activeCategory === "all" ? projects : projects.filter((project) => project.category?.toLowerCase() === activeCategory);
  count.textContent = `${shown.length} ${shown.length === 1 ? "project" : "projects"}`;
  if (!shown.length) {
    grid.innerHTML = `<div class="portfolio-empty"><span class="portfolio-empty__number" aria-hidden="true">—</span><div><p class="eyebrow">PORTFOLIO IN PROGRESS</p><h3>Approved project stories are being prepared.</h3><p>${activeCategory === "all" ? "Original project photography and source-verified project details will appear here once supplied." : `No approved ${escapeHTML(activeCategory)} projects are available yet.`}</p></div></div>`;
    return;
  }
  grid.innerHTML = shown.map((project, index) => {
    const image = project.image ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt || `${project.client} project`)}" loading="lazy" decoding="async" width="1200" height="900">` : `<div class="portfolio-card__missing" role="img" aria-label="Project image not available"><span>IMAGE NOT AVAILABLE</span></div>`;
    const details = [project.title, project.location, project.category].filter(Boolean).map(escapeHTML).join(" · ");
    return `<a class="portfolio-card portfolio-card--${index % 3 + 1}" href="project/${escapeHTML(project.slug)}.html"><div class="portfolio-card__media">${image}<span class="portfolio-card__veil"></span><span class="portfolio-card__arrow" aria-hidden="true">↗</span><span class="portfolio-card__overline">${escapeHTML(project.category || "PROJECT")}</span></div><div class="portfolio-card__caption"><div><h3>${escapeHTML(project.client || project.title || "Project")}</h3><p>${details}</p></div><span aria-hidden="true">↗</span></div></a>`;
  }).join("");
  grid.querySelectorAll(".portfolio-card").forEach((card) => card.classList.add("is-visible"));
}

filters.forEach((button) => button.addEventListener("click", () => {
  activeCategory = button.dataset.filter;
  filters.forEach((item) => { const selected = item === button; item.classList.toggle("is-active", selected); item.setAttribute("aria-pressed", String(selected)); });
  grid.classList.add("is-changing");
  window.setTimeout(() => { render(); grid.classList.remove("is-changing"); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
}));

render();
