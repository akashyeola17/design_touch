const LOGO_SRC = "/assets/images/logo/logo.jpeg";

function navHref(path) {
  return path;
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
      </nav>
    </div>
  </header>`;

  const siteHeader = header.querySelector(".site-header");
  const menuButton = header.querySelector(".menu-toggle");
  const navigation = header.querySelector(".site-nav");
  const syncHomeSnapOffset = () => {
    if (!document.documentElement.classList.contains("home-page")) return;
    const offset = siteHeader.classList.contains("is-hidden") ? "0px" : "var(--header-height)";
    document.documentElement.style.setProperty("--home-snap-offset", offset);
  };

  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
    siteHeader.classList.toggle("menu-is-open", open);
    if (open) siteHeader.classList.remove("is-hidden");
    syncHomeSnapOffset();
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

  let lastScrollY = window.scrollY;
  let directionDistance = 0;
  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    siteHeader.classList.toggle("is-scrolled", currentScrollY > 32);
    if (menuButton.getAttribute("aria-expanded") === "true" || currentScrollY <= 32) {
      siteHeader.classList.remove("is-hidden");
      directionDistance = 0;
    } else if (scrollDelta !== 0) {
      directionDistance = Math.sign(directionDistance) === Math.sign(scrollDelta)
        ? directionDistance + scrollDelta
        : scrollDelta;

      if (directionDistance > 3) {
        siteHeader.classList.add("is-hidden");
        directionDistance = 0;
      } else if (directionDistance < -3) {
        siteHeader.classList.remove("is-hidden");
        directionDistance = 0;
      }
    }

    lastScrollY = currentScrollY;
    syncHomeSnapOffset();
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  siteHeader.addEventListener("focusin", () => {
    siteHeader.classList.remove("is-hidden");
    syncHomeSnapOffset();
  });
}
