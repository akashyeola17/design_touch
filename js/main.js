import { renderNavbar } from "./navbar.js";
import { initRevealAnimations } from "./animations.js";
import contact from "../data/contact.js";
import stats from "../data/stats.js";
import services from "../data/services.js";
import projects from "../data/projects.js";
import clients from "../data/clients.js";
import testimonials from "../data/testimonials.js";
import heroMedia from "../data/hero.js";
import processSteps from "../data/process.js";
import advantages from "../data/advantages.js";
import { instagramFeed } from "./instagram.js";

const rootPath = window.location.pathname.includes("/project/") ? "../" : "";
const navItems = [
  { label: "Home", href: `${rootPath}index.html` }, { label: "About", href: `${rootPath}about.html` },
  { label: "Services", href: `${rootPath}services.html` }, { label: "Projects", href: `${rootPath}projects.html` },
  { label: "Contact", href: `${rootPath}contact.html` },
];

function renderFooter() {
  const phoneLinks = contact.phone.map((number) => `<li><a href="tel:${number.replace(/\s/g, "")}">${number}</a></li>`).join("");
  const serviceLinks = services.map((service) => `<li><a href="${rootPath}services.html">${service.name}</a></li>`).join("");
  const socialLinks = [["Instagram", contact.instagram], ["Facebook", contact.facebook], ["LinkedIn", contact.linkedin]].filter(([, url]) => url);
  const socialMarkup = socialLinks.length ? `<li>${socialLinks.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`).join(" · ")}</li>` : "";
  return `<footer class="site-footer"><div class="container footer-main">
    <div class="footer-brand"><a class="brand" href="${rootPath}index.html" aria-label="Design Touch home"><span class="brand__mark" aria-hidden="true">DT</span><span class="brand__word">DESIGN TOUCH<small>MUMBAI</small></span></a><p class="footer-tagline">Design. Build. Transform.</p></div>
    <div><h2 class="footer-heading">Explore</h2><ul class="footer-links">${navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}</ul></div>
    <div><h2 class="footer-heading">Services</h2><ul class="footer-links">${serviceLinks}</ul></div>
    <div><h2 class="footer-heading">Contact</h2><ul class="footer-links">${phoneLinks}<li><a href="mailto:${contact.email}">${contact.email}</a></li><li>${contact.address}</li>${socialMarkup}<li><a href="${rootPath}contact.html">Start a project ↗</a></li></ul></div>
  </div><div class="container footer-bottom"><p>© <span data-current-year></span> Design Touch. All rights reserved.</p><p>Mumbai, India</p></div></footer>`;
}

function whatsappUrl() {
  if (!contact.whatsapp) return "";
  const number = contact.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(contact.whatsappMessage);
  return number ? `https://wa.me/${number}?text=${message}` : "";
}

function renderWhatsApp() {
  const url = whatsappUrl();
  if (!url) return "";
  return `<a class="whatsapp-button" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Design Touch on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2 22l5.27-1.38A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.13.82.84-3.05-.2-.31a8.1 8.1 0 1 1 6.91 3.84Zm4.45-6.07c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg><span class="whatsapp-button__label">WhatsApp</span></a>`;
}

const categories = [
  { number: "01", name: "Exhibitions", title: "Creative exhibition stall & brand spaces", slug: "exhibitions", style: "category--exhibitions" },
  { number: "02", name: "Interiors", title: "Modern & functional interior solutions", slug: "interiors", style: "category--interiors" },
  { number: "03", name: "Brand experiences", title: "Corporate events & brand experiences", slug: "events", style: "category--experiences" },
  { number: "04", name: "Branding", title: "Corporate branding & visual solutions", slug: "branding", style: "category--branding" },
];

function renderCategories() {
  const target = document.querySelector("[data-categories]");
  if (!target) return;
  target.innerHTML = categories.map((category, index) => `<article class="category-card ${category.style} reveal">
    <a class="category-card__link" href="${rootPath}services.html" aria-label="Explore ${category.name}">
      <div class="category-card__art visual-placeholder" role="img" aria-label="Placeholder for approved ${category.name.toLowerCase()} project image"><span class="placeholder-kicker">IMAGE NEEDED</span><span class="category-card__shape" aria-hidden="true"></span><span class="category-card__index">${category.number}</span></div>
      <div class="category-card__copy"><div><p class="eyebrow">0${index + 1} / DESIGN TOUCH</p><h3>${category.name}</h3><p>${category.title}</p></div><span class="arrow-link" aria-hidden="true">↗</span></div>
    </a></article>`).join("");
}

function renderStats() {
  const target = document.querySelector("[data-stats]");
  if (!target) return;
  target.innerHTML = stats.map((stat) => `<article class="stat-item reveal"><p class="stat-value" ${stat.confirmed ? `data-count="${stat.value}" data-suffix="${stat.suffix || ""}" aria-label="${stat.value}${stat.suffix || ""} ${stat.label}"` : ""}>${stat.confirmed ? `${stat.value}${stat.suffix || ""}` : "—"}</p><h2>${stat.label}</h2>${stat.confirmed ? "" : `<p class="stat-pending">Value pending confirmation</p>`}</article>`).join("");
}

function renderProjects() {
  const target = document.querySelector("[data-projects]");
  if (!target) return;
  if (!projects.length) {
    target.innerHTML = `<article class="projects-empty reveal"><p class="eyebrow">PORTFOLIO / CONTENT PENDING</p><h3>Verified project stories will appear here.</h3><p>Approved project photography and source-checked details are not yet available.</p><a class="text-link" href="contact.html">Discuss a project <span aria-hidden="true">↗</span></a></article>`;
    return;
  }
  target.innerHTML = projects.slice(0, 8).map((project, index) => `<a class="project-card reveal" href="${rootPath}project/${project.slug}.html"><div class="project-card__media">${project.image ? `<img src="${project.image}" alt="${project.alt || `${project.client} project by Design Touch`}" loading="lazy" />` : `<div class="project-placeholder__media" role="img" aria-label="Approved project image needed for ${project.client}"><span class="placeholder-kicker">IMAGE NEEDED</span></div>`}<span class="project-card__index">${String(index + 1).padStart(2, "0")}</span><span class="project-card__arrow" aria-hidden="true">↗</span></div><div class="project-card__caption"><h3>${project.client}</h3><p>${project.title || project.category || "Project details"}${project.location ? ` · ${project.location}` : ""}</p></div></a>`).join("");
}

function renderApproach() {
  const target = document.querySelector("[data-process]");
  if (target) target.innerHTML = processSteps.map(({ number, title, description }) => `<li class="process-step reveal"><span class="process-step__number">${number}</span><h3>${title}</h3><p>${description}</p></li>`).join("");
}

function renderServices() {
  const target = document.querySelector("[data-services]");
  if (target) target.innerHTML = services.map((service, index) => `<a class="service-row reveal" href="${rootPath}services.html"><span class="service-row__number">${String(index + 1).padStart(2, "0")}</span><span class="service-row__body"><strong>${service.name}</strong><small>${service.homeDescription}</small></span><span class="service-row__arrow" aria-hidden="true">↗</span></a>`).join("");
}

function renderReasons() {
  const target = document.querySelector("[data-reasons]");
  if (target) target.innerHTML = advantages.map((item, index) => {
    const stat = item.statKey ? stats.find((candidate) => candidate.key === item.statKey && candidate.confirmed) : null;
    const number = stat ? `${stat.value}${stat.suffix || ""}` : String(index + 1).padStart(2, "0");
    return `<article class="reason-item reveal"><span>${number}</span><h3>${item.title}</h3>${item.description ? `<p>${item.description}</p>` : ""}</article>`;
  }).join("");
}

function renderClients() {
  const target = document.querySelector("[data-clients]");
  if (target) target.innerHTML = clients.map((client) => `<div class="client-logo-placeholder"><span>${client.logo ? `<img src="${client.logo}" alt="${client.name}" loading="lazy" />` : client.name}</span>${client.logo ? "" : "<small>LOGO ARTWORK NEEDED</small>"}</div>`).join("");
}

function renderInstagram() {
  const grid = document.querySelector("[data-instagram-grid]");
  const approvedItems = instagramFeed.slice(0, 6);
  if (grid) grid.innerHTML = approvedItems.length ? approvedItems.map((post, index) => {
    const href = post.url || contact.instagram;
    const content = `<img src="${post.image}" alt="${post.alt || ""}" loading="lazy" decoding="async"><span aria-hidden="true">↗</span>`;
    return href ? `<a class="instagram-post" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${post.alt || `Instagram post ${index + 1}`}">${content}</a>` : `<div class="instagram-post" aria-label="${post.alt || `Instagram post ${index + 1}`} ">${content}</div>`;
  }).join("") : Array.from({ length: 6 }, (_, index) => `<div class="instagram-placeholder instagram-placeholder--${index + 1}" role="img" aria-label="Instagram feed placeholder ${index + 1}; approved post not yet connected"><span class="instagram-placeholder__icon" aria-hidden="true">◎</span><span>POST ${String(index + 1).padStart(2, "0")} / APPROVED FEED NEEDED</span></div>`).join("");
  const action = document.querySelector("[data-instagram-action]");
  if (!action) return;
  const instagramIcon = `<svg class="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor"/></svg>`;
  const handle = contact.instagramHandle || "ACCOUNT TO BE CONFIRMED";
  if (contact.instagram) action.innerHTML = `<a class="text-link instagram-action" href="${contact.instagram}" target="_blank" rel="noopener noreferrer">${instagramIcon}<span><small>${handle}</small><strong>Follow on Instagram</strong></span><span aria-hidden="true">↗</span></a>`;
  else action.innerHTML = `<span class="text-link instagram-action instagram-action--pending" aria-disabled="true">${instagramIcon}<span><small>${handle}</small><strong>Follow on Instagram</strong></span></span>`;
}

function renderTestimonials() {
  const target = document.querySelector("[data-testimonial-stage]");
  if (!target || !testimonials.length) return;
  const dots = document.querySelector("[data-testimonial-dots]");
  let activeIndex = 0;
  const draw = () => {
    const item = testimonials[activeIndex];
    target.innerHTML = `<article class="testimonial-slide"><span class="testimonial-mark" aria-hidden="true">“</span><blockquote>“${item.quote}”</blockquote><div class="testimonial-credit"><span class="testimonial-credit__line" aria-hidden="true"></span><div><strong>${item.name}</strong><span>${item.company}</span></div><span class="testimonial-count">${String(activeIndex + 1).padStart(2, "0")} / ${String(testimonials.length).padStart(2, "0")}</span></div></article>`;
    if (dots) dots.innerHTML = testimonials.map((testimonial, index) => `<button type="button" class="testimonial-dot${index === activeIndex ? " is-active" : ""}" data-testimonial-dot="${index}" aria-label="Show testimonial ${index + 1} from ${testimonial.name}" aria-pressed="${index === activeIndex}"></button>`).join("");
    dots?.querySelectorAll("[data-testimonial-dot]").forEach((button) => button.addEventListener("click", () => { activeIndex = Number(button.dataset.testimonialDot); draw(); }));
  };
  document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => { activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length; draw(); });
  document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => { activeIndex = (activeIndex + 1) % testimonials.length; draw(); });
  draw();
}

function configureHeroMedia() {
  const visual = document.querySelector("[data-hero-visual]");
  if (!visual) return;
  visual.style.setProperty("--hero-object-position", heroMedia.objectPosition || "center");
  if (heroMedia.fallbackImage) {
    visual.classList.add("has-media");
    const image = document.createElement("img");
    image.className = "hero__image";
    image.src = heroMedia.fallbackImage;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    visual.append(image);
  }
  if (heroMedia.mobileImage) {
    visual.classList.add("has-media");
    visual.style.setProperty("--hero-mobile-image", `url("${heroMedia.mobileImage}")`);
  }
  if (heroMedia.video) {
    visual.classList.add("has-media");
    const video = document.createElement("video");
    video.className = "hero__video";
    video.src = heroMedia.video;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("aria-hidden", "true");
    if (heroMedia.fallbackImage) video.poster = heroMedia.fallbackImage;
    visual.append(video);
    if (!window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
  }
}

function animateStats() {
  const counters = document.querySelectorAll("[data-count]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finish = (counter) => { counter.textContent = `${counter.dataset.count}${counter.dataset.suffix || ""}`; };
  if (!("IntersectionObserver" in window) || reducedMotion) { counters.forEach(finish); return; }
  const observer = new IntersectionObserver((entries, activeObserver) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const end = Number(counter.dataset.count);
    const start = performance.now();
    const duration = 850;
    counter.textContent = `0${counter.dataset.suffix || ""}`;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = `${Math.round(end * (1 - Math.pow(1 - progress, 3)))}${counter.dataset.suffix || ""}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    activeObserver.unobserve(counter);
  }), { threshold: 0.55 });
  counters.forEach((counter) => observer.observe(counter));
}

function configureWhatsAppAction() {
  const actions = document.querySelectorAll("[data-whatsapp-action]");
  if (!actions.length) return;
  const url = whatsappUrl();
  if (url) {
    actions.forEach((action) => {
      action.href = url;
      action.target = "_blank";
      action.rel = "noopener noreferrer";
      action.removeAttribute("aria-disabled");
      action.removeAttribute("tabindex");
      action.removeAttribute("title");
    });
    document.querySelector("[data-whatsapp-note]")?.remove();
  } else {
    actions.forEach((action) => action.addEventListener("click", (event) => event.preventDefault()));
  }
}

renderNavbar(navItems);
document.querySelector("#site-footer").innerHTML = renderFooter();
document.querySelector("#whatsapp-contact").innerHTML = renderWhatsApp();
document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
renderStats();
renderCategories();
renderProjects();
renderApproach();
renderServices();
renderReasons();
renderClients();
renderInstagram();
renderTestimonials();
configureHeroMedia();
configureWhatsAppAction();
initRevealAnimations();
animateStats();
