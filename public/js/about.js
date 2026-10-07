import { initRevealAnimations } from "./animations.js";
import services from "../../data/services.js";
import stats from "../../data/stats.js";

const teamPhotos = [
  "1 .Proprietor.png",
  "2 Sr. Sales Executive.jpeg",
  "3 Production Manager.png",
  "4 Jr. Sales Executive.png",
  "5 Jr.Sales Executive.jpeg",
  "6 Administration.png",
  "7. Graphic Designer.png",
  "8 Sr.3D Visualizerr.jpeg",
  "9 Jr.3D Visualizer.png",
  "10 .Digital Marketing Executive.jpeg",
  "11 .Office Assistant.png",
];

const teamTarget = document.querySelector("[data-team]");
if (teamTarget) {
  teamTarget.innerHTML = teamPhotos.map((filename, index) => {
    const designation = filename.replace(/^\d+\s*\.?\s*/, "").replace(/\.[^.]+$/, "").trim();
    const imageUrl = `/assets/images/team/${filename.split("/").map(encodeURIComponent).join("/")}`;
    return `<article class="team-card reveal">
      <div class="team-card__portrait"><img src="${imageUrl}" alt="Design Touch ${designation}" loading="lazy" decoding="async" /><span class="team-card__number">${String(index + 1).padStart(2, "0")}</span></div>
      <div class="team-card__details"><p class="eyebrow">DESIGN TOUCH · TEAM</p><h3>${designation}</h3></div>
    </article>`;
  }).join("");
}

const experience = stats.find((item) => item.key === "experience" && item.confirmed);
const statTarget = document.querySelector("[data-about-stat]");
if (statTarget && experience) {
  statTarget.innerHTML = `<strong>${experience.value}${experience.suffix || ""}</strong><span>${experience.label}</span>`;
}

const aboutServices = services.filter((service) => service.includeAbout);
const serviceTarget = document.querySelector("[data-about-services]");
if (serviceTarget) {
  serviceTarget.innerHTML = aboutServices.map((service, index) => `<article class="about-service reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${service.aboutTitle || service.name}</h3><a href="/services#${service.slug}" aria-label="Explore ${service.aboutTitle || service.name}">↗</a></article>`).join("");
}

initRevealAnimations();
