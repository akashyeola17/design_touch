import contact from "../data/contact.js";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const icon = `<svg class="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor"/></svg>`;

function whatsappHref() {
  const number = (contact.whatsapp || "").replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(contact.whatsappMessage)}` : "";
}

function renderContactInformation() {
  const phoneRows = contact.phone.map((number, index) => `<a href="tel:${number.replace(/[^\d+]/g, "")}"><span>PHONE ${String(index + 1).padStart(2, "0")}</span><strong>${escapeHTML(number)}</strong><b aria-hidden="true">↗</b></a>`).join("");
  document.querySelector("[data-contact-information]").innerHTML = `${phoneRows}<a href="mailto:${contact.email}"><span>EMAIL</span><strong>${escapeHTML(contact.email)}</strong><b aria-hidden="true">↗</b></a><div class="contact-info-address"><span>ADDRESS</span><strong>${escapeHTML(contact.address)}</strong></div>`;
  document.querySelector("[data-contact-address]").textContent = contact.address;
  const mapQuery = encodeURIComponent(contact.address);
  const directions = document.querySelector("[data-directions-link]");
  directions.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  document.querySelector("[data-contact-map]").innerHTML = `<iframe src="https://maps.google.com/maps?q=${mapQuery}&output=embed" title="Map showing the Design Touch address in Mumbai" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
}

function renderWhatsApp() {
  const target = document.querySelector("[data-contact-whatsapp]");
  const href = whatsappHref();
  target.innerHTML = href ? `<a class="button button--whatsapp" href="${href}" target="_blank" rel="noopener noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a>` : `<span class="contact-pending" aria-disabled="true">WhatsApp number pending confirmation</span>`;
  const finalAction = document.querySelector("[data-whatsapp-action]");
  if (href && finalAction) {
    finalAction.href = href;
    finalAction.target = "_blank";
    finalAction.rel = "noopener noreferrer";
    finalAction.removeAttribute("aria-disabled");
    finalAction.removeAttribute("tabindex");
    document.querySelector("[data-whatsapp-note]")?.remove();
  }
}

function renderSocialLinks() {
  const target = document.querySelector("[data-contact-social]");
  const social = [["Instagram", contact.instagram, contact.instagramHandle], ["Facebook", contact.facebook, ""], ["LinkedIn", contact.linkedin, ""]];
  target.innerHTML = social.map(([label, href, handle]) => href ? `<a href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer"><span>${label === "Instagram" ? icon : ""}<strong>${label}${handle ? ` <small>${escapeHTML(handle)}</small>` : ""}</strong></span><b aria-hidden="true">↗</b></a>` : `<div class="contact-social__pending"><span>${label === "Instagram" ? icon : ""}<strong>${label}${label === "Instagram" && contact.instagramHandle ? ` <small>${escapeHTML(contact.instagramHandle)}</small>` : ""}</strong></span><small>Profile link to be confirmed</small></div>`).join("");
}

function validateForm() {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const required = new Set(["name", "phone", "email", "projectType", "message"]);
  const validators = {
    name: (value) => value.trim().length >= 2 && value.trim().length <= 100 ? "" : "Enter a name between 2 and 100 characters.",
    company: (value) => value.length <= 120 ? "" : "Company name must be 120 characters or fewer.",
    phone: (value) => { const digits = value.replace(/\D/g, ""); return /^[+\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15 ? "" : "Enter a valid phone number with 7–15 digits."; },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254 ? "" : "Enter a valid email address.",
    projectType: (value) => value ? "" : "Choose a project type.",
    location: (value) => value.length <= 120 ? "" : "Location must be 120 characters or fewer.",
    area: (value) => value.length <= 80 ? "" : "Approximate area must be 80 characters or fewer.",
    message: (value) => value.trim().length >= 10 && value.trim().length <= 2000 ? "" : "Enter a message between 10 and 2,000 characters.",
    reference: (_value, input) => { const file = input.files?.[0]; if (!file) return ""; if (file.size > 10 * 1024 * 1024) return "Choose a file smaller than 10 MB."; if (!/^(image\/|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)/.test(file.type)) return "Choose an image, PDF, or Word document."; return ""; },
  };
  const check = (input) => {
    const error = form.querySelector(`#error-${input.name}`);
    const message = validators[input.name]?.(input.value, input) || "";
    const finalMessage = required.has(input.name) && !input.value.trim() ? `${input.labels?.[0]?.textContent.replace("*", "").trim() || "This field"} is required.` : message;
    if (error) error.textContent = finalMessage;
    input.setAttribute("aria-invalid", String(Boolean(finalMessage)));
    return !finalMessage;
  };
  form.querySelectorAll("input,select,textarea").forEach((input) => input.addEventListener(input.type === "file" ? "change" : "input", () => { check(input); status.textContent = ""; }));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputs = [...form.querySelectorAll("input,select,textarea")];
    const invalid = inputs.filter((input) => !check(input));
    if (invalid.length) {
      status.textContent = `Please review ${invalid.length} highlighted field${invalid.length === 1 ? "" : "s"}.`;
      invalid[0].focus();
      return;
    }
    status.textContent = "Your details passed the browser check. Nothing was sent because this form is not connected to an enquiry service yet. Contact Design Touch by phone or email to submit your enquiry.";
  });
}

renderContactInformation();
renderWhatsApp();
renderSocialLinks();
validateForm();
