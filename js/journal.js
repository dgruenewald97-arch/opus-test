// GRELLWERK — Journal-Kategoriefilter + Sortierung. Pure-vanilla, läuft nur auf
// journal.html. Filter: eine Kategorie + „Alle" (blendet `.post` per data-cat
// ein/aus). Sortierung: ordnet die Karten im Grid um (Datum/Titel/Kategorie).

export function initJournal() {
  const filter = document.getElementById("journal-filter");
  const grid = document.getElementById("journal-grid");
  const empty = document.getElementById("journal-empty");
  if (!filter || !grid) return;

  const sortEl = document.getElementById("journal-sort");
  const chips = filter.querySelectorAll(".journal__chip");
  const sortChips = sortEl ? sortEl.querySelectorAll(".journal__chip") : [];
  const posts = Array.from(grid.querySelectorAll(".post"));

  // Reihenfolge der Kategorien für die „Nach Kategorie"-Sortierung.
  const catOrder = ["performance", "branding", "social", "daten", "web", "meinung"];

  // Sortier-Schlüssel je Karte einmal auslesen.
  const meta = new Map(
    posts.map((el) => {
      const time = el.querySelector("time");
      return [el, {
        date: time ? new Date(time.getAttribute("datetime")).getTime() || 0 : 0,
        title: (el.querySelector(".post__title")?.textContent || "").trim(),
        cat: el.getAttribute("data-cat") || "",
      }];
    })
  );

  function applyFilter(cat) {
    let visible = 0;
    posts.forEach((post) => {
      const show = cat === "all" || post.getAttribute("data-cat") === cat;
      post.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  }

  function applySort(mode) {
    const sorted = posts.slice().sort((a, b) => {
      const A = meta.get(a);
      const B = meta.get(b);
      switch (mode) {
        case "date-asc": return A.date - B.date;
        case "title-asc": return A.title.localeCompare(B.title, "de");
        case "category": {
          const d = catOrder.indexOf(A.cat) - catOrder.indexOf(B.cat);
          return d !== 0 ? d : B.date - A.date; // innerhalb Kategorie: neueste zuerst
        }
        case "date-desc":
        default: return B.date - A.date;
      }
    });
    // Karten in neuer Reihenfolge wieder anhängen (Filter-/hidden-Status bleibt).
    sorted.forEach((post) => grid.appendChild(post));
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", active ? "true" : "false");
      });
      applyFilter(chip.getAttribute("data-filter") || "all");
    });
  });

  sortChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      sortChips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", active ? "true" : "false");
      });
      applySort(chip.getAttribute("data-sort") || "date-desc");
    });
  });
}
