console.log('✅ index.js loaded correctly');


/* index.js - combined theme toggle + cookie consent with debugging */

// Small helper to safely run init even if DOMContentLoaded already fired
function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    // DOM already ready
    fn();
  }
}

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  console.info('[initThemeToggle] starting');

  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('theme'); } catch (e) { saved = null; }

  // Apply saved theme or default to dark
  const theme = saved || 'dark';
  root.setAttribute('data-theme', theme);
  console.info('[initThemeToggle] applied theme ->', theme);

  // Function to set avatar image according to theme
  function setAvatarForTheme(currentTheme) {
    const avatarImg = document.querySelector('.avatar img');
    if (!avatarImg) {
      // not fatal; just log
      // console.debug('[setAvatarForTheme] .avatar img not found');
      return;
    }

    avatarImg.src = currentTheme === 'light'
      ? 'Image/BlueCircuitHandshakeWCuff.png'
      : 'Image/WhiteCircuitHandshakeWCuff.png';

    console.info('[setAvatarForTheme] set src ->', avatarImg.src);
  }

  // Set initial avatar
  setAvatarForTheme(theme);

  // Theme toggle button logic
  const btn = document.getElementById('themeToggle');
  if (!btn) {
    console.warn('[initThemeToggle] themeToggle button not found (id="themeToggle")');
  } else {
    // ensure it doesn't submit a form
    if (!btn.getAttribute('type')) btn.setAttribute('type', 'button');

    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      try { localStorage.setItem('theme', current); } catch (e) { /* ignore */ }
      setAvatarForTheme(current);
      console.info('[themeToggle] toggled ->', current);
    });

    console.info('[initThemeToggle] listener attached to #themeToggle');
  }

  // Set copyright year element (if exists)
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
    // log silently
  } else {
    console.warn('[initThemeToggle] #year element not found');
  }
}

/* ---------- Cookie Consent Banner ---------- */
function initCookieConsent() {
  console.info('[initCookieConsent] starting');

  const key = 'cookie-consent';
  const store = (() => {
    try { return window.localStorage; } catch (e) { return null; }
  })();

  function updateGTag(val) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': val === 'accepted' ? 'granted' : 'denied',
        'analytics_storage': val === 'accepted' ? 'granted' : 'denied'
      });
      console.info('[initCookieConsent] gtag consent updated ->', val);
    } else {
      // gtag not present, safe to ignore
      // console.debug('[initCookieConsent] gtag not present');
    }
  }

  function recordConsent(val) {
    if (store) {
      try { store.setItem(key, val); } catch (e) { /* ignore e.g., storage disabled */ }
    }

    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';

    updateGTag(val);
    console.info('[recordConsent] recorded ->', val);
  }

  function showBannerIfNeeded() {
    const consent = store ? store.getItem(key) : null;
    const banner = document.getElementById('cookie-banner');
    if (!banner) {
      console.warn('[showBannerIfNeeded] #cookie-banner not found');
      return;
    }

    if (!consent) {
      banner.style.display = 'block';
      console.info('[showBannerIfNeeded] showing banner (no consent found)');
    } else {
      console.info('[showBannerIfNeeded] consent already ->', consent);
      if (consent === 'accepted') updateGTag('accepted');
    }
  }

  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  if (acceptBtn) {
    if (!acceptBtn.getAttribute('type')) acceptBtn.setAttribute('type', 'button');
    acceptBtn.addEventListener('click', () => recordConsent('accepted'));
  } else {
    console.warn('[initCookieConsent] #accept-cookies not found');
  }

  if (rejectBtn) {
    if (!rejectBtn.getAttribute('type')) rejectBtn.setAttribute('type', 'button');
    rejectBtn.addEventListener('click', () => recordConsent('rejected'));
  } else {
    console.warn('[initCookieConsent] #reject-cookies not found');
  }

  showBannerIfNeeded();
}

/* ---------- Initialize Both (safe) ---------- */
ready(() => {
  try {
    initThemeToggle();
  } catch (err) {
    console.error('[index.js] initThemeToggle error', err);
  }

  try {
    initCookieConsent();
  } catch (err) {
    console.error('[index.js] initCookieConsent error', err);
  }
});
