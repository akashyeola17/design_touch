import { renderNavbar } from "./navbar.js";
import { initRevealAnimations } from "./animations.js";
import contact from "../data/contact.js";
import stats from "../data/stats.js";
import services from "../data/services.js";
import projects from "../data/projects.js";
import clients from "../data/clients.js";
import testimonials from "../data/testimonials.js";
import heroMedia from "../data/hero.js";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const footerServices = [
  "Exhibition Stall Design & Fabrication",
  "Interior Design & Execution",
  "Event Design & Setup",
  "Branding & Display Solutions",
];

function whatsappUrl() {
  if (!contact.whatsapp) return "";
  const number = contact.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(contact.whatsappMessage || "");
  return number ? `https://wa.me/${number}?text=${message}` : "";
}

function renderFooter() {
  const phoneLinks = (contact.phone || [])
    .map((number) => `<li><a href="tel:${number.replace(/\s/g, "")}">${number}</a></li>`)
    .join("");
  const serviceLinks = footerServices.map((name) => `<li><a href="/services">${name}</a></li>`).join("");
  const navLinks = navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("");
  const social = [
    contact.facebook ? `<a href="${contact.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>` : "",
    contact.instagram ? `<a href="${contact.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>` : "",
    contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return `<footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="Design Touch home">
          <img class="brand__logo brand__logo--footer" src="/assets/images/logo/tag.jpeg" alt="Indian Exhibition Industry Association" width="160" height="52" />
        </a>
        <p>Design Touch is a proud member of the Indian Exhibition Industry Association (IEIA), connecting us with India’s professional exhibition industry and reflecting our commitment to quality, professionalism, and industry standards.</p>
      </div>
      <div>
        <h2 class="footer-heading">Navigation</h2>
        <ul class="footer-links">${navLinks}</ul>
      </div>
      <div>
        <h2 class="footer-heading">Services</h2>
        <ul class="footer-links">${serviceLinks}</ul>
      </div>
      <div>
        <h2 class="footer-heading">Contact</h2>
        <ul class="footer-links">
          ${phoneLinks}
          <li><a href="mailto:${contact.email}">${contact.email}</a></li>
          <li>${contact.address}</li>
          ${social ? `<li>${social}</li>` : ""}
        </ul>
        <p class="footer-cities"><strong>Mumbai · Delhi · Bangalore · Chennai · Pune</strong></p>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span data-current-year></span> Design Touch. All Rights Reserved.</p>
    </div>
  </footer>`;
}

function renderWhatsApp() {
  const url = whatsappUrl();
  if (!url) {
    return `<a class="whatsapp-button" href="mailto:${contact.email}" aria-label="Email Design Touch">
      <span class="whatsapp-button__tooltip">Email Design Touch</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2 22l5.27-1.38A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.13.82.84-3.05-.2-.31a8.1 8.1 0 1 1 6.91 3.84Zm4.45-6.07c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>
      <span class="whatsapp-button__label">Email</span>
    </a>`;
  }
  return `<a class="whatsapp-button" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Design Touch on WhatsApp">
    <span class="whatsapp-button__tooltip">Chat on WhatsApp</span>
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2 22l5.27-1.38A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.13.82.84-3.05-.2-.31a8.1 8.1 0 1 1 6.91 3.84Zm4.45-6.07c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>
    <span class="whatsapp-button__label">WhatsApp</span>
  </a>`;
}

function renderStats() {
  const target = document.querySelector("[data-stats]");
  if (!target) return;
  target.innerHTML = stats
    .map(
      (stat) => `<article class="stat-item reveal">
      <p class="stat-value" data-count="${stat.value}" data-suffix="${stat.suffix || ""}" aria-label="${stat.value}${stat.suffix || ""} ${stat.label}">${stat.value}${stat.suffix || ""}</p>
      <h3>${stat.label}</h3>
    </article>`,
    )
    .join("");
}

function renderProjects() {
  const target = document.querySelector("[data-projects]");
  if (!target) return;
  if (!projects.length) {
    target.innerHTML = `<p class="reveal">Portfolio projects will appear here once configured.</p>`;
    return;
  }
  const featured = projects.find((p) => p.featured) || projects[0];
  const rest = projects.filter((p) => p !== featured).slice(0, 5);
  const featuredHtml = `<a class="project-featured project-card reveal" href="/projects">
    <div class="project-card__media">
      <img src="${featured.image}" alt="${featured.alt}" loading="lazy" decoding="async" />
      <span class="project-card__shade" aria-hidden="true"></span>
    </div>
    <div class="project-card__caption">
      <span class="project-card__category">${featured.category}</span>
      <h3>${featured.client}</h3>
      <p>${featured.title}${featured.location ? ` · ${featured.location}` : ""}</p>
    </div>
  </a>`;
  const restHtml = rest
    .map(
      (project) => `<a class="project-card project-card--sm reveal" href="/projects">
      <div class="project-card__media">
        <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async" />
        <span class="project-card__shade" aria-hidden="true"></span>
      </div>
      <div class="project-card__caption">
        <span class="project-card__category">${project.category}</span>
        <h3>${project.client}</h3>
        <p>${project.title}</p>
      </div>
    </a>`,
    )
    .join("");
  target.innerHTML = featuredHtml + restHtml;
}

function renderServicesGrid() {
  const target = document.querySelector("[data-services-grid]");
  if (!target) return;
  target.innerHTML = services
    .map(
      (service) => `<a class="service-card reveal" href="/services">
      <div class="service-card__image">
        <img src="${service.image}" alt="${service.name} — Design Touch" loading="lazy" decoding="async" />
      </div>
      <div class="service-card__body">
        <h3>${service.name}</h3>
      </div>
    </a>`,
    )
    .join("");
}

function renderClients() {
  const target = document.querySelector("[data-clients]");
  if (!target) return;
  if (!clients.length) {
    target.innerHTML = `<p class="reveal">Approved client logos will be displayed here.</p>`;
    return;
  }
  target.innerHTML = clients
    .map(
      (client) => `<div class="client-logo reveal">
      <img src="${client.logo}" alt="${client.name} — Design Touch client" loading="lazy" decoding="async" />
    </div>`,
    )
    .join("");

}

function renderTestimonials() {
  const target = document.querySelector("[data-testimonial-stage]");
  if (!target) return;
  if (!testimonials.length) {
    target.innerHTML = `<p class="reveal">Client testimonials will be added here.</p>`;
    return;
  }
  const dots = document.querySelector("[data-testimonial-dots]");
  let activeIndex = 0;
  const draw = () => {
    const item = testimonials[activeIndex];
    target.innerHTML = `<article class="testimonial-slide reveal is-visible">
      <blockquote>“${item.quote}”</blockquote>
      <div class="testimonial-credit">
        <strong>${item.name}</strong>
        <span>${item.company}</span>
      </div>
    </article>`;
    if (dots) {
      dots.innerHTML = testimonials
        .map(
          (_, index) =>
            `<button type="button" class="testimonial-dot${index === activeIndex ? " is-active" : ""}" data-testimonial-dot="${index}" role="tab" aria-selected="${index === activeIndex}" aria-label="Testimonial ${index + 1}"></button>`,
        )
        .join("");
      dots.querySelectorAll("[data-testimonial-dot]").forEach((button) => {
        button.addEventListener("click", () => {
          activeIndex = Number(button.dataset.testimonialDot);
          draw();
        });
      });
    }
  };
  document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    draw();
  });
  document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % testimonials.length;
    draw();
  });
  draw();
}

function initHeroCarousel() {
  const slidesWrap = document.querySelector("[data-hero-slides]");
  const slides = heroMedia.slides || [];
  if (!slidesWrap || !slides.length) return;

  slidesWrap.innerHTML = slides
    .map(
      (slide, i) => `<div class="hero__slide${i === 0 ? " is-active" : ""}" data-hero-slide="${i}">
      <img src="${slide.src}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
    </div>`,
    )
    .join("");

  let index = 0;
  let rafId = 0;
  const duration = 7000;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slideEls = slidesWrap.querySelectorAll("[data-hero-slide]");

  const setSlide = (next) => {
    index = (next + slides.length) % slides.length;
    slideEls.forEach((el, i) => el.classList.toggle("is-active", i === index));
  };

  const tick = (now, start) => {
    if (reducedMotion) return;
    if (now - start >= duration) {
      setSlide(index + 1);
      rafId = requestAnimationFrame((t) => tick(t, t));
      return;
    }
    rafId = requestAnimationFrame((t) => tick(t, start));
  };

  const startAutoplay = () => {
    cancelAnimationFrame(rafId);
    if (reducedMotion) return;
    rafId = requestAnimationFrame((t) => tick(t, t));
  };

  document.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    setSlide(index - 1);
    startAutoplay();
  });
  document.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    setSlide(index + 1);
    startAutoplay();
  });

  setSlide(0);
  startAutoplay();
}

function animateStats() {
  const counters = document.querySelectorAll("[data-count]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finish = (counter) => {
    counter.textContent = `${counter.dataset.count}${counter.dataset.suffix || ""}`;
  };
  if (!("IntersectionObserver" in window) || reducedMotion) {
    counters.forEach(finish);
    return;
  }
  const observer = new IntersectionObserver(
    (entries, activeObserver) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const end = Number(counter.dataset.count);
        const suffix = counter.dataset.suffix || "";
        const start = performance.now();
        const duration = 900;
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          counter.textContent = `${Math.round(end * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        activeObserver.unobserve(counter);
      }),
    { threshold: 0.4 },
  );
  counters.forEach((counter) => observer.observe(counter));
}

function configureWhatsAppAction() {
  const url = whatsappUrl();
  document.querySelectorAll("[data-whatsapp-action]").forEach((action) => {
    if (url) {
      action.href = url;
      action.target = "_blank";
      action.rel = "noopener noreferrer";
    }
  });
}

renderNavbar(navItems);
const footerEl = document.querySelector("#site-footer");
if (footerEl) footerEl.innerHTML = renderFooter();
const waEl = document.querySelector("#whatsapp-contact");
if (waEl) waEl.innerHTML = renderWhatsApp();
document.querySelectorAll("[data-current-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

renderStats();
renderProjects();
renderServicesGrid();
renderClients();
renderTestimonials();
initHeroCarousel();
configureWhatsAppAction();
initRevealAnimations();
animateStats();
