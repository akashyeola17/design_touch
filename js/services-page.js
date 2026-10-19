import { initRevealAnimations } from "./animations.js";
import services from "../data/services.js";
import contact from "../data/contact.js";

const list = document.querySelector("[data-service-page-list]");
if (list) {
  const whatsappNumber = (contact.whatsapp || "").replace(/\D/g, "");
  list.innerHTML = services.map((service, index) => {
    const imageAlt = service.imageAlt || service.name;
    const image = service.image
      ? `<img src="${service.image}" alt="${imageAlt}" loading="lazy" />`
      : `<div class="service-feature__placeholder" role="img" aria-label="Approved ${service.name.toLowerCase()} project image needed"><span class="placeholder-kicker">APPROVED SERVICE IMAGE NEEDED</span><span class="service-feature__shape" aria-hidden="true"></span><span class="service-feature__image-number">${String(index + 1).padStart(2, "0")}</span></div>`;
    const extra = (service.pageDetails || [])
      .map((paragraph) => `<p class="service-feature__description">${paragraph}</p>`)
      .join("");
    const copy = service.pageDescription
      ? `<p class="service-feature__description">${service.pageDescription}</p>${extra}`
      : `<p class="service-feature__pending">Approved service description from the company profile PDF needed.</p>`;
    const message = encodeURIComponent(`Hello Design Touch, I would like to discuss ${service.name}.`);
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`;
    const projectCategory = service.slug === "interiors" ? "interior" : "exhibition";
    return `<article class="service-feature reveal" id="${service.slug}">
      <div class="service-feature__media">${image}</div>
      <div class="service-feature__copy"><p class="eyebrow">SERVICE ${String(index + 1).padStart(2, "0")}</p><h2><span>${String(index + 1).padStart(2, "0")}</span>${service.name}</h2>${copy}<div class="service-feature__actions"><a class="service-feature__button service-feature__button--contact" href="${whatsappHref}" target="_blank" rel="noopener noreferrer">Discuss this service <span aria-hidden="true">↗</span></a><a class="service-feature__button service-feature__button--projects" href="/projects?category=${projectCategory}#portfolio">View related projects <span aria-hidden="true">↗</span></a></div></div>
    </article>`;
  }).join("");
}

initRevealAnimations();
