import { initRevealAnimations } from "./animations.js";
import services from "../../data/services.js";
import stats from "../../data/stats.js";

const teamMembers = [
  { image: "1 .Proprietor.png", name: "Govindkumar Goud", role: "Founder & Proprietor" },
  { image: "2 Sr. Sales Executive.jpeg", name: "Kruttika Jangam", role: "Sr. Sales Executive" },
  { image: "3 Production Manager.png", name: "Kapil Kajaniya", role: "Execution Head" },
  { image: "4 Jr. Sales Executive.png", name: "Chandralata Sharma", role: "Jr. Sales Executive" },
  { image: "5 Jr.Sales Executive.jpeg", name: "Jyoti Gupta", role: "Jr. Sales Executive" },
  { image: "6 Administration.png", name: "Aarohi Bandkar", role: "Administration" },
  { image: "7. Graphic Designer.png", name: "Shital Ramane", role: "Graphic Designer" },
  { image: "8 Sr.3D Visualizerr.jpeg", name: "Gauri Shelar", role: "Sr. 3D Visualizer" },
  { image: "9 Jr.3D Visualizer.png", name: "Yash Bhovad", role: "Jr. 3D Visualizer" },
  { image: "10 .Digital Marketing Executive.jpeg", name: "Sanjana Gupta", role: "Digital Marketing Executive" },
  { image: "11 .Office Assistant.png", name: "Abhishek Thukrul", role: "Office Assistant" },
];

const teamTarget = document.querySelector("[data-team]");
if (teamTarget) {
  teamTarget.innerHTML = teamMembers.map((member, index) => {
    const imageUrl = `/assets/images/team/${encodeURIComponent(member.image)}`;
    return `<article class="team-card reveal">
      <div class="team-card__portrait"><img src="${imageUrl}" alt="${member.name} — ${member.role}, Design Touch" loading="lazy" decoding="async" /><span class="team-card__number">${String(index + 1).padStart(2, "0")}</span></div>
      <div class="team-card__details"><p class="eyebrow">${member.name}</p><h3>${member.role}</h3></div>
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
