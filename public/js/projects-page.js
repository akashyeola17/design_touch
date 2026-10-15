import projects from "../data/portfolio-projects.js";

const grid = document.querySelector("[data-portfolio-grid]");
const count = document.querySelector("[data-project-count]");
const filters = [...document.querySelectorAll("[data-filter]")];
const gallery = document.querySelector("[data-project-lightbox]");
const galleryImage = gallery?.querySelector("[data-gallery-image]");
const galleryTitle = gallery?.querySelector("[data-gallery-title]");
const galleryCount = gallery?.querySelector("[data-gallery-count]");
const galleryPrevious = gallery?.querySelector("[data-gallery-previous]");
const galleryNext = gallery?.querySelector("[data-gallery-next]");
const requestedCategory = new URLSearchParams(window.location.search).get("category")?.toLowerCase();
let activeCategory = ["exhibition", "interior"].includes(requestedCategory) ? requestedCategory : "all";
let activeImages = [];
let activeImageIndex = 0;
let activeProjectName = "";
let galleryScrollPosition = 0;

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function render() {
  const shown = activeCategory === "all" ? projects : projects.filter((project) => project.category?.toLowerCase() === activeCategory);
  count.textContent = `${shown.length} ${shown.length === 1 ? "project" : "projects"}`;
  if (!shown.length) {
    grid.innerHTML = `<div class="portfolio-empty"><span class="portfolio-empty__number" aria-hidden="true">—</span><div><p class="eyebrow">PORTFOLIO IN PROGRESS</p><h3>Projects are being prepared.</h3><p>${activeCategory === "all" ? "Project photography will appear here once available." : `No ${escapeHTML(activeCategory)} projects are available yet.`}</p></div></div>`;
    return;
  }
  grid.innerHTML = shown.map((project, index) => {
    const projectImages = project.images?.length ? project.images : [project.image].filter(Boolean);
    const images = [...new Map(projectImages.filter(Boolean).map((src) => [String(src).trim().toLowerCase(), src])).values()];
    const imageList = escapeHTML(JSON.stringify(images));
    const alt = project.alt || [project.client, project.title, project.category === "Exhibition" ? "exhibition stall" : project.category, "by Design Touch"].filter(Boolean).join(" — ");
    const image = images.length ? `<img src="${escapeHTML(images[0])}" alt="${escapeHTML(alt)}" data-project-image loading="lazy" decoding="async" width="1200" height="900">` : `<div class="portfolio-card__missing" role="img" aria-label="Project image not available"><span>IMAGE NOT AVAILABLE</span></div>`;
    const details = [project.title, project.location, project.category].filter(Boolean).map(escapeHTML).join(" · ");
    const projectName = project.client || project.title || "Project";
    return `<a class="portfolio-card" href="${escapeHTML(images[0] || "#portfolio")}" data-project-gallery data-images="${imageList}" data-project-name="${escapeHTML(projectName)}" aria-haspopup="dialog" aria-label="Open ${escapeHTML(projectName)} photo gallery"><div class="portfolio-card__media">${image}<span class="portfolio-card__veil" aria-hidden="true"></span><span class="portfolio-card__arrow" aria-hidden="true">↗</span><span class="portfolio-card__overline">VIEW PROJECT PHOTOS</span></div><div class="portfolio-card__caption"><div><h3>${escapeHTML(projectName)}</h3><p>${details}</p></div><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span></div></a>`;
  }).join("");
  grid.querySelectorAll(".portfolio-card").forEach((card) => card.classList.add("is-visible"));
}

function updateGalleryImage() {
  if (!galleryImage || !activeImages.length) return;
  galleryImage.src = activeImages[activeImageIndex];
  galleryImage.alt = `${activeProjectName} project photo ${activeImageIndex + 1} of ${activeImages.length}`;
  galleryTitle.textContent = activeProjectName;
  galleryCount.textContent = `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(activeImages.length).padStart(2, "0")}`;
  const singleImage = activeImages.length < 2;
  galleryPrevious.hidden = singleImage;
  galleryNext.hidden = singleImage;
}

function openGallery(card) {
  if (!gallery || !card) return;
  // Save the document position before the native dialog moves focus into itself.
  galleryScrollPosition = window.scrollY;
  activeImages = JSON.parse(card.dataset.images || "[]");
  activeProjectName = card.dataset.projectName || "Project";
  activeImageIndex = 0;
  if (!activeImages.length) return;
  updateGalleryImage();
  gallery.showModal();
  gallery.querySelector("[data-gallery-close]")?.focus();
}

function stepGallery(direction) {
  if (activeImages.length < 2) return;
  activeImageIndex = (activeImageIndex + direction + activeImages.length) % activeImages.length;
  updateGalleryImage();
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-gallery]");
  if (!card) return;
  event.preventDefault();
  openGallery(card);
});

gallery?.querySelector("[data-gallery-close]")?.addEventListener("click", () => gallery.close());
gallery?.addEventListener("close", () => {
  const scrollPosition = galleryScrollPosition;
  // The browser restores focus to the opener after closing a <dialog>; that can
  // trigger scroll snapping/smooth scrolling after the close event. Restore only
  // after that native focus work has completed, with smooth scrolling disabled.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollPosition);
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }));
});
galleryPrevious?.addEventListener("click", () => stepGallery(-1));
galleryNext?.addEventListener("click", () => stepGallery(1));
gallery?.addEventListener("click", (event) => {
  if (event.target === gallery) gallery.close();
});
gallery?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepGallery(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    stepGallery(1);
  }
});

filters.forEach((button) => {
  const selected = button.dataset.filter === activeCategory;
  button.classList.toggle("is-active", selected);
  button.setAttribute("aria-pressed", String(selected));
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;
    filters.forEach((item) => { const isSelected = item === button; item.classList.toggle("is-active", isSelected); item.setAttribute("aria-pressed", String(isSelected)); });
    grid.classList.add("is-changing");
    window.setTimeout(() => { render(); grid.classList.remove("is-changing"); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
  });
});

render();
