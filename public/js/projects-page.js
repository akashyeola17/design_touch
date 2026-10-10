import projects from "../data/portfolio-projects.js";

const grid = document.querySelector("[data-portfolio-grid]");
const count = document.querySelector("[data-project-count]");
const filters = [...document.querySelectorAll("[data-filter]")];
let activeCategory = "all";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function render() {
  const shown = activeCategory === "all" ? projects : projects.filter((project) => project.category?.toLowerCase() === activeCategory);
  count.textContent = `${shown.length} ${shown.length === 1 ? "project" : "projects"}`;
  if (!shown.length) {
    grid.innerHTML = `<div class="portfolio-empty"><span class="portfolio-empty__number" aria-hidden="true">—</span><div><p class="eyebrow">PORTFOLIO IN PROGRESS</p><h3>Projects are being prepared.</h3><p>${activeCategory === "all" ? "Project photography will appear here once available." : `No ${escapeHTML(activeCategory)} projects are available yet.`}</p></div></div>`;
    return;
  }
  grid.innerHTML = shown.map((project, index) => {
    const images = project.images?.length ? project.images : [project.image].filter(Boolean);
    const imageList = escapeHTML(JSON.stringify(images));
    const alt = project.alt || [project.client, project.title, project.category === "Exhibition" ? "exhibition stall" : project.category, "by Design Touch"].filter(Boolean).join(" — ");
    const image = images.length ? `<img src="${escapeHTML(images[0])}" alt="${escapeHTML(alt)}" data-project-image loading="lazy" decoding="async" width="1200" height="900">` : `<div class="portfolio-card__missing" role="img" aria-label="Project image not available"><span>IMAGE NOT AVAILABLE</span></div>`;
    const details = [project.title, project.location, project.category].filter(Boolean).map(escapeHTML).join(" · ");
    return `<article class="portfolio-card" tabindex="0" data-project-gallery data-images="${imageList}" aria-label="${escapeHTML(project.client || project.title || "Project")} photo gallery"><div class="portfolio-card__media">${image}<span class="portfolio-card__veil"></span><span class="portfolio-card__arrow" aria-hidden="true">↻</span><span class="portfolio-card__overline">${escapeHTML(project.category || "PROJECT")} · HOVER TO EXPLORE</span></div><div class="portfolio-card__caption"><div><h3>${escapeHTML(project.client || project.title || "Project")}</h3><p>${details}</p></div><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span></div></article>`;
  }).join("");
  grid.querySelectorAll(".portfolio-card").forEach((card) => card.classList.add("is-visible"));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  grid.querySelectorAll("[data-project-gallery]").forEach((card) => {
    const image = card.querySelector("[data-project-image]");
    const images = JSON.parse(card.dataset.images || "[]");
    if (!image || images.length < 2) return;
    let index = 0;
    let timer;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => {
        index = (index + 1) % images.length;
        const nextImage = new Image();
        nextImage.onload = () => {
          image.classList.add("is-changing");
          window.setTimeout(() => {
            image.src = images[index];
            window.requestAnimationFrame(() => image.classList.remove("is-changing"));
          }, 180);
        };
        nextImage.src = images[index];
      }, 1200);
    };
    const stop = () => { window.clearInterval(timer); timer = undefined; };
    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("focusin", start);
    card.addEventListener("focusout", stop);
  });
}

filters.forEach((button) => button.addEventListener("click", () => {
  activeCategory = button.dataset.filter;
  filters.forEach((item) => { const selected = item === button; item.classList.toggle("is-active", selected); item.setAttribute("aria-pressed", String(selected)); });
  grid.classList.add("is-changing");
  window.setTimeout(() => { render(); grid.classList.remove("is-changing"); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
}));

render();
