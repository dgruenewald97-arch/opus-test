// GRELLWERK — Journal-Kategoriefilter. Pure-vanilla, läuft nur auf journal.html.
// Eine Kategorie + „Alle": blendet `.post`-Karten per data-cat ein/aus.

export function initJournal() {
  const filter = document.getElementById("journal-filter");
  const grid = document.getElementById("journal-grid");
  const empty = document.getElementById("journal-empty");
  if (!filter || !grid) return;

  const chips = filter.querySelectorAll(".journal__chip");
  const posts = grid.querySelectorAll(".post");

  function apply(cat) {
    let visible = 0;
    posts.forEach((post) => {
      const show = cat === "all" || post.getAttribute("data-cat") === cat;
      post.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cat = chip.getAttribute("data-filter") || "all";
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", active ? "true" : "false");
      });
      apply(cat);
    });
  });
}
