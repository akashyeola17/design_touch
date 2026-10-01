import contact from "../data/contact.js";

export function renderNavbar(items) {
  const header = document.querySelector("#site-header");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const homeHref = window.location.pathname.includes("/project/") ? "../index.html" : "index.html";
  header.innerHTML = `<header class="site-header"><div class="container nav-shell">
    <a class="brand" href="${homeHref}" aria-label="Design Touch home"><span class="brand__mark" aria-hidden="true">DT</span><span class="brand__word">DESIGN TOUCH<small>MUMBAI</small></span></a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation"><span class="menu-toggle__icon" aria-hidden="true"></span></button>
    <nav class="site-nav" id="primary-navigation" aria-label="Main navigation"><ul class="site-nav__links">${items.map((item) => `<li><a class="site-nav__link" href="${item.href}"${currentPage === item.href.split("/").pop() ? ' aria-current="page"' : ""}>${item.label}</a></li>`).join("")}</ul><a class="button button--primary site-nav__cta" href="https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}" target="_blank" rel="noopener noreferrer">Get a quote <span aria-hidden="true">↗</span></a></nav>
  </div></header>`;
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
  navigation.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });
  const updateHeader = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
