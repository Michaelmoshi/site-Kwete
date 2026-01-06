/* ===============================
   Utils: chargement dynamique
================================= */
function loadHTML(id, file) {
  return fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status} pour ${file}`);
      return r.text();
    })
    .then((html) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`Élément #${id} introuvable`);
      el.innerHTML = html;
    });
}

function loadCSSOnce(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScriptOnce(src, id) {
  return new Promise((resolve, reject) => {
    if (window.tns) return resolve(); // déjà chargé
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener("load", () => resolve());
      document.getElementById(id).addEventListener("error", (e) => reject(e));
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

/* ===============================
   Menu burger
================================= */
function initMenuBurger() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("active");
    });
  });

  // Fermer le menu si clic à l'extérieur
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
      menu.classList.remove("active");
      burger.classList.remove("active");
    }
  });

  // Empêcher propagation clic à l'intérieur du menu
  menu.addEventListener("click", (event) => event.stopPropagation());
}

/* ===============================
   Sliders (Tiny Slider)
================================= */
function initSlidersIfAny() {
  const sliders = document.querySelectorAll(".my-slider");
  if (!sliders.length) return;

  sliders.forEach((container) => {
    if (container.dataset.tnsInitialized === "1") return; // éviter doublons
    tns({
      container,
      items: 1,
      slideBy: "page",
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayButtonOutput: false,
      controls: false,
      nav: true,
      navPosition: "bottom",
      mouseDrag: true,
      loop: true,
    });
    container.dataset.tnsInitialized = "1";
  });
}

/* ===============================
   Page reload sur logo/nom
================================= */
function initBrandClick() {
  const brand = document.querySelector(".brand");
  if (brand) {
    brand.addEventListener("click", () => {
      location.reload(); // recharge la page
    });
  }
}

/* ===============================
   Orchestration au chargement
================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Charger CSS Tiny Slider (une seule fois)
  loadCSSOnce(
    "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css",
    "tiny-slider-css"
  );

  // Charger header, footer et Tiny Slider JS
  const headerLoaded = loadHTML("header", "header.html");
  const footerLoaded = loadHTML("footer", "footer.html");
  const tnsLoaded = loadScriptOnce(
    "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js",
    "tiny-slider-js"
  );

  // Quand header + Tiny Slider sont prêts -> init
  Promise.all([headerLoaded, tnsLoaded])
    .then(() => {
      // Laisser le DOM injecté s’attacher
      requestAnimationFrame(() => {
        initMenuBurger();
        initSlidersIfAny();
        initBrandClick(); // nouveau : reload page sur logo/nom
      });
    })
    .catch((err) => console.error("Erreur d'initialisation:", err));
});
