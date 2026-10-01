import { initRevealAnimations } from "./animations.js";
import services from "../data/services.js";

const list = document.querySelector("[data-service-page-list]");
if (list) {
  list.innerHTML = services.map((service, index) => {
    const image = service.image
      ? `<img src="${service.image}" alt="${service.name}" loading="lazy" />`
      : `<div class="service-feature__placeholder" role="img" aria-label="Approved ${service.name.toLowerCase()} project image needed"><span class="placeholder-kicker">APPROVED SERVICE IMAGE NEEDED</span><span class="service-feature__shape" aria-hidden="true"></span><span class="service-feature__image-number">${String(index + 1).padStart(2, "0")}</span></div>`;
    const copy = service.pageDescription
      ? `<p class="service-feature__description">${service.pageDescription}</p>`
      : `<p class="service-feature__pending">Approved service description from the company profile PDF needed.</p>`;
    return `<article class="service-feature reveal" id="${service.slug}">
      <div class="service-feature__media">${image}</div>
      <div class="service-feature__copy"><p class="eyebrow">SERVICE ${String(index + 1).padStart(2, "0")}</p><h2><span>${String(index + 1).padStart(2, "0")}</span>${service.name}</h2>${copy}<a class="text-link" href="contact.html?service=${service.slug}">Discuss this service <span aria-hidden="true">↗</span></a></div>
    </article>`;
  }).join("");
}

initRevealAnimations();
