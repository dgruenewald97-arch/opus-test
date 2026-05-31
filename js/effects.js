// GRELLWERK — text scramble + seamless marquee (pure vanilla, no libs needed).

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&!*/—";

// Mobile nav: hamburger toggle. No-op if markup is absent (graceful).
export function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = nav && nav.querySelector(".nav__toggle");
  const menu = nav && nav.querySelector(".nav__links");
  if (!nav || !toggle || !menu) return;

  const setOpen = (open) => {
    nav.setAttribute("data-open", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };
  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(nav.getAttribute("data-open") !== "true");
  });
  // Close after tapping a link or pressing Escape.
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

export function initScramble({ reducedMotion }) {
  if (reducedMotion) return;
  const els = document.querySelectorAll("[data-scramble]");
  els.forEach((el) => {
    const finalText = el.textContent;
    let frame = null;
    el.addEventListener("mouseenter", () => {
      let iteration = 0;
      cancelAnimationFrame(frame);
      const tick = () => {
        el.textContent = finalText
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration) return finalText[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        iteration += 1 / 2;
        if (iteration < finalText.length) {
          frame = requestAnimationFrame(tick);
        } else {
          el.textContent = finalText;
        }
      };
      tick();
    });
    el.addEventListener("mouseleave", () => {
      cancelAnimationFrame(frame);
      el.textContent = finalText;
    });
  });
}

// Duplicate marquee content so the -50% loop is seamless regardless of width.
export function initMarquee() {
  document.querySelectorAll(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });
}

// Rotating proof ticker: cycles the child spans one at a time (fade via CSS).
export function initRotator({ reducedMotion }) {
  document.querySelectorAll("[data-rotate]").forEach((box) => {
    const items = Array.from(box.children);
    if (!items.length) return;
    items.forEach((el, i) => el.classList.toggle("is-on", i === 0));
    if (reducedMotion || items.length < 2) return;
    let i = 0;
    setInterval(() => {
      items[i].classList.remove("is-on");
      i = (i + 1) % items.length;
      items[i].classList.add("is-on");
    }, 2400);
  });
}

// Count-up for stat numbers, triggered when the band scrolls into view.
export function initCounters({ reducedMotion }) {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;

  const run = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    if (reducedMotion || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

// Brutalist placeholder form: no real submission, just a buzzy success state.
export function initForm({ COPY, onSuccess }) {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = COPY.formError;
      return;
    }
    status.textContent = COPY.formSuccess;
    form.reset();
    if (typeof onSuccess === "function") onSuccess();
  });
}
