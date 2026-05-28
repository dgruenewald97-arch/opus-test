// GRELLWERK — custom cursor + magnetic buttons (pure vanilla, rAF-throttled).

export function initCursor({ reducedMotion, gsap }) {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer || reducedMotion) return;

  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  document.body.classList.add("cursor-on");
  cursor.classList.add("is-active");

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let raf = null;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(render);
  });

  function render() {
    // lerp for trailing feel
    cx += (mx - cx) * 0.22;
    cy += (my - cy) * 0.22;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (Math.abs(mx - cx) > 0.4 || Math.abs(my - cy) > 0.4) {
      raf = requestAnimationFrame(render);
    } else {
      raf = null;
    }
  }

  const hotSelector = "a, button, .magnetic, .service, .case, input, textarea";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hotSelector)) cursor.classList.add("is-hot");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hotSelector)) cursor.classList.remove("is-hot");
  });

  initMagnetic({ gsap });
}

function initMagnetic({ gsap }) {
  const els = document.querySelectorAll(".magnetic");
  els.forEach((el) => {
    const strength = 0.35;
    let setX, setY;
    if (gsap) {
      setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    }
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      if (gsap) { setX(dx); setY(dy); }
      else el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener("mouseleave", () => {
      if (gsap) { setX(0); setY(0); }
      else el.style.transform = "";
    });
  });
}
