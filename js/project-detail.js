import projects from "../data/projects.js";
import contact from "../data/contact.js";

const main = document.querySelector("[data-project-detail]");
const slug = location.pathname.split("/").pop().replace(/\.html$/, "");
const project = projects.find((entry) => entry.slug === slug);
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function renderPending() {
  main.innerHTML = `<section class="project-pending"><div class="container project-pending__inner"><p class="eyebrow">DESIGN TOUCH / PROJECT PROFILE</p><span class="project-pending__mark" aria-hidden="true">—</span><h1>Project story<br><em>in preparation.</em></h1><p>Project details and original photography will be published here once verified source material is available.</p><div class="button-row"><a class="button button--dark" href="../projects.html">Back to all work <span aria-hidden="true">↗</span></a><a class="button button--outline-dark" href="../contact.html">Get a quote <span aria-hidden="true">↗</span></a><a class="button button--outline-dark" href="#" data-whatsapp-action aria-disabled="true">WhatsApp us <span aria-hidden="true">↗</span></a></div><p class="project-pending__note">WhatsApp contact will be available once the number is confirmed.</p></div></section>`;
}

function renderProject(item) {
  const fields = [["CLIENT", item.client], ["EVENT", item.event], ["LOCATION", item.location], ["AREA", item.area], ["CATEGORY", item.category]].filter(([, value]) => value);
  const hero = item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt || item.client || "Design Touch project")}" fetchpriority="high" width="1800" height="1100">` : `<div class="project-detail__missing"><span>PROJECT PHOTOGRAPHY</span></div>`;
  const gallery = (item.gallery || []).filter((image) => image.src).map((image, index) => `<button class="project-gallery__item" type="button" data-lightbox-index="${index}" aria-label="Open image ${index + 1}: ${escapeHTML(image.alt || item.client || "Project image")}"><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || item.client || "Project image")}" loading="lazy" decoding="async" width="1000" height="760"></button>`).join("");
  const related = projects.filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category).slice(0, 3);
  const relatedHTML = related.length ? `<section class="related-projects section-pad"><div class="container"><p class="eyebrow">CONTINUE EXPLORING</p><h2>Related <em>projects</em></h2><div class="related-projects__grid">${related.map((entry) => `<a href="${escapeHTML(entry.slug)}.html"><span>${escapeHTML(entry.category || "PROJECT")}</span><strong>${escapeHTML(entry.client || entry.title)}</strong><b aria-hidden="true">↗</b></a>`).join("")}</div></div></section>` : "";
  main.innerHTML = `<section class="project-detail__hero"><div class="project-detail__hero-media">${hero}</div><div class="project-detail__hero-shade"></div><div class="container project-detail__hero-copy"><p class="eyebrow">PROJECT / ${escapeHTML(item.category || "DESIGN TOUCH")}</p><h1>${escapeHTML(item.client || item.title || "Project")}</h1>${item.title ? `<p>${escapeHTML(item.title)}</p>` : ""}${item.location ? `<span class="project-detail__location">${escapeHTML(item.location)}</span>` : ""}</div></section><section class="project-facts section-pad"><div class="container project-facts__grid">${fields.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHTML(value)}</strong></div>`).join("")}</div></section>${item.description ? `<section class="project-description section-pad"><div class="container"><p class="eyebrow">THE PROJECT</p><p>${escapeHTML(item.description)}</p></div></section>` : ""}${gallery ? `<section class="project-gallery section-pad"><div class="container"><div class="portfolio-work__heading"><div><p class="eyebrow">DETAILS IN VIEW</p><h2>Project <em>gallery</em></h2></div></div><div class="project-gallery__grid">${gallery}</div></div></section>` : ""}${relatedHTML}<section class="page-cta portfolio-cta"><div class="container page-cta__inner"><p class="eyebrow">LIKE WHAT YOU SEE?</p><h2>LET'S BUILD YOUR<br><em>NEXT SPACE TOGETHER.</em></h2><div class="button-row"><a class="button button--light" href="../contact.html">Get a quote <span aria-hidden="true">↗</span></a><a class="button button--outline-light" href="#" data-whatsapp-action aria-disabled="true">WhatsApp us <span aria-hidden="true">↗</span></a></div></div></section><dialog class="lightbox" aria-label="Project image viewer" data-lightbox><button class="lightbox__close" type="button" data-lightbox-close aria-label="Close image viewer">×</button><button class="lightbox__previous" type="button" data-lightbox-prev aria-label="Previous image">←</button><figure><img data-lightbox-image alt=""><figcaption data-lightbox-caption></figcaption></figure><button class="lightbox__next" type="button" data-lightbox-next aria-label="Next image">→</button></dialog>`;
  const description = item.description || `${item.client || item.title} project profile by Design Touch.`;
  document.title = `${item.client || item.title} | Design Touch Projects`;
  document.querySelector('meta[name="robots"]')?.remove();
  document.querySelector('meta[name="description"]')?.setAttribute("content", description.slice(0, 155));
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description.slice(0, 200));
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", `${location.origin}${location.pathname}`);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${location.origin}${location.pathname}`);
  setupLightbox(item.gallery || []);
}

function setupLightbox(images) {
  const dialog = main.querySelector("[data-lightbox]");
  if (!dialog || !images.length) return;
  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  let active = 0;
  const show = (index) => {
    active = (index + images.length) % images.length;
    image.src = images[active].src;
    image.alt = images[active].alt || "Project gallery image";
    caption.textContent = image.alt;
  };
  main.querySelectorAll("[data-lightbox-index]").forEach((button) => button.addEventListener("click", () => { show(Number(button.dataset.lightboxIndex)); dialog.showModal(); dialog.querySelector("[data-lightbox-close]").focus(); }));
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(active - 1));
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => show(active + 1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); show(active + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); show(active - 1); }
  });
}

function setupWhatsApp() {
  const action = main.querySelector("[data-whatsapp-action]");
  if (!action) return;
  const number = (contact.whatsapp || "").replace(/\D/g, "");
  if (number) {
    action.href = `https://wa.me/${number}?text=${encodeURIComponent(contact.whatsappMessage)}`;
    action.target = "_blank";
    action.rel = "noopener noreferrer";
    action.removeAttribute("aria-disabled");
    action.removeAttribute("tabindex");
    main.querySelector(".project-pending__note")?.remove();
  } else {
    action.addEventListener("click", (event) => event.preventDefault());
  }
}

project ? renderProject(project) : renderPending();
setupWhatsApp();
