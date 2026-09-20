const PROJECTS = new Map([
  ['kold', 'KOLD BREW'], ['kold-brew', 'KOLD BREW'], ['kold brew', 'KOLD BREW'],
  ['neon', 'NEONTRITT'], ['neontritt', 'NEONTRITT'],
  ['hafer', 'HAFERKRAFT'], ['haferkraft', 'HAFERKRAFT'],
  ['blitz', 'BLITZBANK'], ['blitzbank', 'BLITZBANK'],
]);

export function initBriefing(main) {
  const form = main.querySelector('#contact-form');
  if (!form) return () => {};
  const preview = form.querySelector('#briefing-preview');
  const status = form.querySelector('#form-status');
  const button = form.querySelector('[data-briefing-copy]');
  const idea = form.querySelector('#f-msg');
  const source = main.querySelector('#briefing-source');
  const company = form.querySelector('#f-company');
  if (!preview || !status || !button || !idea) return () => {};
  const requested = new URLSearchParams(window.location.search).get('project');
  const project = PROJECTS.get((requested || '').trim().toLowerCase());
  if (project) {
    if (company && !company.value) company.value = project;
    if (source) {
      source.hidden = false;
      source.textContent = `Ausgangspunkt: die fiktive Markenstudie ${project}. Du kannst Marke und Idee frei ändern.`;
    }
  }

  let active = true;
  let copying = false;
  function update() {
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    idea.setCustomValidity(idea.value && !value('message') ? 'Bitte beschreibe deine Projektidee.' : '');
    const lines = ['GRELLWERK · Briefing', '', 'Projektidee:', value('message') || '[Deine Idee]'];
    for (const [key, label] of [['goal', 'Ziel'], ['company', 'Marke / Unternehmen'], ['name', 'Name'], ['email', 'E-Mail']]) {
      if (value(key)) lines.push('', `${label}: ${value(key)}`);
    }
    preview.value = lines.join('\n');
    status.textContent = '';
  }

  async function copy(event) {
    event.preventDefault();
    if (copying) return;
    update();
    if (!form.reportValidity()) return;
    const text = preview.value;
    copying = true;
    button.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (active) status.textContent = preview.value === text
        ? 'Briefing kopiert. Es wurde nichts versendet.'
        : 'Die vorherige Fassung wurde kopiert. Deine neuesten Änderungen bitte erneut kopieren.';
    } catch {
      if (active) {
        preview.focus();
        preview.select();
        status.textContent = 'Automatisches Kopieren war nicht möglich. Der Vorschautext ist ausgewählt. Kopiere ihn mit Strg+C, ⌘C oder der Kopieren-Funktion deines Geräts. Es wurde nichts versendet.';
      }
    } finally {
      copying = false;
      if (active) button.disabled = false;
    }
  }

  form.addEventListener('input', update);
  form.addEventListener('submit', copy);
  button.type = 'submit';
  update();
  return () => {
    active = false;
    form.removeEventListener('input', update);
    form.removeEventListener('submit', copy);
    button.type = 'button';
  };
}
