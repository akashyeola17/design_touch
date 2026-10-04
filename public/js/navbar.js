import contact from "../data/contact.js";

const LOGO_SRC = "/assets/images/logo/logo.jpeg";

function navHref(path) {
  return path;
}

function whatsappHref() {
  if (!contact.whatsapp) return `mailto:${contact.email}`;
  const number = contact.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(contact.whatsappMessage || "");
  return number ? `https://wa.me/${number}?text=${message}` : `mailto:${contact.email}`;
}

export function renderNavbar(items) {
  const header = document.querySelector("#site-header");
  if (!header) return;

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const linkItems = items.filter((item) => item.label !== "Home");

  header.innerHTML = `<header class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="${navHref("/")}" aria-label="Design Touch home">
        <img class="brand__logo" src="${LOGO_SRC}" alt="Design Touch logo" width="160" height="44" />
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
        <span class="menu-toggle__icon" aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="primary-navigation" aria-label="Main navigation">
        <ul class="site-nav__links">
          ${linkItems
            .map(
              (item) =>
                `<li><a class="site-nav__link" href="${item.href}"${
                  path === item.href.replace(/\/$/, "") || (item.href === "/" && path === "/")
                    ? ' aria-current="page"'
                    : ""
                }>${item.label}</a></li>`,
            )
            .join("")}
        </ul>
        <a class="button button--primary site-nav__cta" href="${whatsappHref()}" target="_blank" rel="noopener noreferrer">Let's Talk</a>
      </nav>
    </div>
  </header>`;

  const siteHeader = header.querySelector(".site-header");
  const menuButton = header.querySelector(".menu-toggle");
  const navigation = header.querySelector(".site-nav");

  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
    siteHeader.classList.toggle("menu-is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  const updateHeader = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 32);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
