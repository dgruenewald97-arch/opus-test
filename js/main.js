import { initTeam } from './team.js?v=12';
import { initStudio, closeStudioMenu } from './studio.js?v=12';
import { initBriefing } from './briefing.js?v=12';
import { initKonfigurator } from './konfigurator.js';
import { initGenerator } from './generator.js';
import { initJournal } from './journal.js';
import { KONFIGURATOR, SLOGAN } from './config.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const rootURL = new URL('.', location.href);
const cache = new Map();
const feedback = document.querySelector('.route-feedback');
const announcement = document.getElementById('route-status');
let currentURL = new URL(location.href);
let navigationId = 0;
let controller = null;
let pageAnimation = null;
let loadingTimer = 0;
let scrollTimer = 0;
let disposeBriefing = () => {};
let navigating = false;
const motionOff = () => reduce.matches || document.documentElement.classList.contains('no-motion');
const isLocalPage = url => url.origin === location.origin &&
  url.pathname.startsWith(rootURL.pathname) &&
  !url.pathname.slice(rootURL.pathname.length).includes('/') &&
  (/\.html$/.test(url.pathname) || url.pathname === rootURL.pathname);
const samePage = (a, b) => a.pathname === b.pathname && a.search === b.search;
const saveScroll = () => history.replaceState({ ...history.state, scroll: scrollY }, '', location.href);

history.scrollRestoration = 'manual';
saveScroll();

function imageError(img) {
  img.closest('.campaign-image,.profile-work')?.classList.add('image-failed');
}
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) imageError(event.target);
}, true);

function initPage() {
  const main = document.querySelector('main');
  main.dataset.page ||= 'legacy';
  main.tabIndex = -1;
  document.body.dataset.page = main.dataset.page;
  for (const link of document.querySelectorAll('.nav__link,.menu-primary>a')) {
    const selected = new URL(link.href).pathname === location.pathname ||
      (main.dataset.page === 'case' && link.getAttribute('href') === 'arbeiten.html');
    if (selected) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  for (const img of main.querySelectorAll('.campaign-image img,.profile-work img')) {
    if (img.complete && !img.naturalWidth) imageError(img);
  }
  initKonfigurator({ KONFIGURATOR });
  initGenerator({ SLOGAN, reducedMotion: motionOff() });
  initJournal();
  initTeam(main);
  disposeBriefing();
  disposeBriefing = initBriefing(main);
  initStudio(main);
}

function targetFor(url) {
  const agent = url.searchParams.get('agent');
  if (agent && (!url.hash || url.hash === '#crew') && document.querySelector('main[data-page="about"]')) {
    return document.querySelector(innerWidth < 701
      ? '[data-agent-mobile="' + CSS.escape(agent) + '"]'
      : '#crew');
  }
  try { return url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null; }
  catch { return null; }
}

function scrollDestination(url, { pop = false, scroll, smooth = false, focus = false } = {}) {
  if (pop && Number.isFinite(scroll)) {
    scrollTo({ top: scroll, behavior: 'instant' });
    return;
  }
  const target = targetFor(url);
  const behavior = smooth && !motionOff() ? 'smooth' : 'instant';
  if (target) {
    target.scrollIntoView({ behavior, block: 'start' });
    if (focus) {
      if (!target.matches('a,button,input,textarea,select,[tabindex]')) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  } else scrollTo({ top: 0, behavior });
  return focus ? target : null;
}

function syncHead(doc) {
  document.title = doc.title;
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]',
    'meta[property="og:description"]', 'meta[property="og:image"]', 'link[rel="canonical"]']) {
    const next = doc.querySelector(selector);
    const old = document.querySelector(selector);
    if (next && old) old.replaceWith(next.cloneNode(true));
  }
}

async function loadPage(url, signal) {
  const key = url.pathname;
  if (cache.has(key)) return cache.get(key).cloneNode(true);
  const requestURL = new URL(url);
  requestURL.searchParams.set('_build', new URL(import.meta.url).searchParams.get('v') || '12');
  const response = await fetch(requestURL.href, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error('Page unavailable');
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  if (!doc.querySelector('main') || !doc.querySelector('.nav')) throw new Error('Invalid page');
  cache.set(key, doc);
  if (cache.size > 12) cache.delete(cache.keys().next().value);
  return doc.cloneNode(true);
}

function clearLoading() {
  clearTimeout(loadingTimer);
  delete document.body.dataset.loading;
  document.querySelector('main')?.removeAttribute('aria-busy');
}

async function animatePage(main, entering) {
  if (motionOff() || !main.animate) return;
  pageAnimation?.cancel();
  const animation = main.animate(entering
    ? [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }]
    : [{ opacity: 1 }, { opacity: 0 }], {
    duration: entering ? 240 : 140,
    easing: 'cubic-bezier(.22,1,.36,1)',
    fill: 'both'
  });
  pageAnimation = animation;
  await animation.finished.catch(() => {});
  if (pageAnimation === animation) {
    animation.cancel();
    pageAnimation = null;
  }
}

async function navigate(url, options = {}) {
  const id = ++navigationId;
  controller?.abort();
  pageAnimation?.cancel();
  pageAnimation = null;
  clearLoading();
  clearTimeout(scrollTimer);
  closeStudioMenu({ immediate: true });
  feedback.hidden = true;
  navigating = true;
  const requestController = new AbortController();
  controller = requestController;
  // The current page stays usable while loading; motion starts only with usable content.
  loadingTimer = setTimeout(() => {
    if (id !== navigationId) return;
    document.body.dataset.loading = 'true';
    document.querySelector('main').setAttribute('aria-busy', 'true');
    announcement.textContent = 'Nächste Seite wird geladen.';
  }, 250);
  const timeout = setTimeout(() => requestController.abort(), 10000);
  try {
    const doc = await loadPage(url, requestController.signal);
    clearTimeout(timeout);
    if (id !== navigationId) return;
    await animatePage(document.querySelector('main'), false);
    if (id !== navigationId) return;
    if (!options.pop) {
      saveScroll();
      history[options.replace ? 'replaceState' : 'pushState']({ scroll: 0 }, '', url.href);
    }
    document.querySelector('main').replaceWith(doc.querySelector('main'));
    currentURL = new URL(url);
    syncHead(doc);
    initPage();
    const focusedTarget = scrollDestination(url, { ...options, focus: !options.pop && (!!url.hash || url.searchParams.has('agent')) });
    if (!focusedTarget) document.querySelector('main').focus({ preventScroll: true });
    clearLoading();
    announcement.textContent = document.title.replace(' | GRELLWERK', '') + ' geladen.';
    await animatePage(document.querySelector('main'), true);
  } catch (error) {
    if (id !== navigationId) return;
    if (options.pop) {
      // Keep the usable page and its address aligned when a historical page is unavailable.
      history.replaceState({ ...history.state, scroll: scrollY }, '', currentURL.href);
    }
    feedback.querySelector('p').textContent = 'Die Seite konnte gerade nicht geladen werden. Dein aktueller Stand bleibt erhalten.';
    feedback.querySelector('a').href = url.href;
    feedback.hidden = false;
    announcement.textContent = 'Seite nicht geladen. Über den Hinweis kannst du sie erneut öffnen.';
  } finally {
    clearTimeout(timeout);
    if (id === navigationId) {
      clearLoading();
      navigating = false;
      controller = null;
      saveScroll();
    }
  }
}

feedback.querySelector('button').addEventListener('click', () => { feedback.hidden = true; });

document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
    event.shiftKey || event.altKey || link.target || link.hasAttribute('download') || link.hasAttribute('data-native')) return;
  const url = new URL(link.href, location.href);
  if (!isLocalPage(url) || location.protocol === 'file:') return;
  event.preventDefault();
  if (samePage(url, currentURL)) {
    ++navigationId;
    controller?.abort();
    controller = null;
    pageAnimation?.cancel();
    pageAnimation = null;
    navigating = false;
    clearLoading();
    closeStudioMenu({ immediate: true });
    feedback.hidden = true;
    saveScroll();
    if (url.href !== location.href) history.pushState({ scroll: 0 }, '', url.href);
    currentURL = new URL(url);
    scrollDestination(url, { smooth: true, focus: !!url.hash });
    return;
  }
  navigate(url);
});

addEventListener('grellwerk:statechange', () => {
  if (!navigating) currentURL = new URL(location.href);
});

addEventListener('popstate', event => {
  const url = new URL(location.href);
  if (samePage(url, currentURL)) {
    ++navigationId;
    controller?.abort();
    controller = null;
    pageAnimation?.cancel();
    pageAnimation = null;
    navigating = false;
    clearLoading();
    closeStudioMenu({ immediate: true });
    currentURL = url;
    scrollDestination(url, { pop: true, scroll: event.state?.scroll });
  } else navigate(url, { pop: true, scroll: event.state?.scroll });
});

addEventListener('scroll', () => {
  if (navigating) return;
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => { if (!navigating) saveScroll(); }, 120);
}, { passive: true });

initPage();
const oldTool = document.body.dataset.page === 'home' &&
  ['#pakete', '#konfigurator', '#slogan-lab', '#faq'].includes(location.hash);
if (oldTool) navigate(new URL('labor.html' + location.hash, location.href), { replace: true });
else if (location.hash || currentURL.searchParams.has('agent')) {
  requestAnimationFrame(() => scrollDestination(currentURL));
}
