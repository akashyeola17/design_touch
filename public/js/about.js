import { initRevealAnimations } from "./animations.js";
import services from "../../data/services.js";
import stats from "../../data/stats.js";

const capabilities = [
  "Exhibition stall design",
  "Fabrication",
  "Interior design",
  "Event environments",
  "3D design & visualization",
  "Branding & visual displays",
  "Complete project execution",
];

const experience = stats.find((item) => item.key === "experience" && item.confirmed);
const statTarget = document.querySelector("[data-about-stat]");
if (statTarget && experience) {
  statTarget.innerHTML = `<strong>${experience.value}${experience.suffix || ""}</strong><span>${experience.label}</span>`;
}

const aboutServices = services.filter((service) => service.includeAbout);
const serviceTarget = document.querySelector("[data-about-services]");
if (serviceTarget) {
  serviceTarget.innerHTML = aboutServices.map((service, index) => `<article class="about-service reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${service.aboutTitle || service.name}</h3><a href="services.html" aria-label="Explore ${service.aboutTitle || service.name}">↗</a></article>`).join("");
}

const capabilityTarget = document.querySelector("[data-capabilities]");
if (capabilityTarget) {
  capabilityTarget.innerHTML = capabilities.map((capability, index) => `<li class="capability-item reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${capability}</strong><span aria-hidden="true">↗</span></li>`).join("");
}

initRevealAnimations();
