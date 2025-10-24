/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
const root = document.documentElement;
const saved = localStorage.getItem('theme');

// Apply saved theme or default to dark
const theme = saved || 'dark';
root.setAttribute('data-theme', theme);

// Function to set avatar image according to theme
function setAvatarForTheme(currentTheme) {
const avatarImg = document.querySelector('.avatar img');
if (!avatarImg) return;

```
avatarImg.src = currentTheme === 'light'
  ? 'Image/BlueCircuitHandshakeWCuff.png'
  : 'Image/WhiteCircuitHandshakeWCuff.png';
```

}

// Set initial avatar
setAvatarForTheme(theme);

// Theme toggle button logic
const btn = document.getElementById('themeToggle');
if (btn) {
btn.addEventListener('click', () => {
const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
root.setAttribute('data-theme', current);
localStorage.setItem('theme', current);
setAvatarForTheme(current);
});
}

// Set copyright year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Cookie Consent Banner ---------- */
function initCookieConsent() {
const key = 'cookie-consent';
const store = (() => {
try { return window.localStorage; } catch (e) { return null; }
})();

function recordConsent(val) {
if (store) store.setItem(key, val);
const banner = document.getElementById('cookie-banner');
if (banner) banner.style.display = 'none';

```
if (typeof gtag === 'function') {
  gtag('consent', 'update', {
    'ad_storage': val === 'accepted' ? 'granted' : 'denied',
    'analytics_storage': val === 'accepted' ? 'granted' : 'denied',
  });
}
```

}

function showBannerIfNeeded() {
const consent = store ? store.getItem(key) : null;
const banner = document.getElementById('cookie-banner');
if (!banner) return;

```
if (!consent) {
  banner.style.display = 'block';
} else if (consent === 'accepted' && typeof gtag === 'function') {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted',
  });
}
```

}

const acceptBtn = document.getElementById('accept-cookies');
const rejectBtn = document.getElementById('reject-cookies');
if (acceptBtn) acceptBtn.addEventListener('click', () => recordConsent('accepted'));
if (rejectBtn) rejectBtn.addEventListener('click', () => recordConsent('rejected'));

showBannerIfNeeded();
}

/* ---------- Initialize Both ---------- */
document.addEventListener('DOMContentLoaded', () => {
initThemeToggle();
initCookieConsent();
});
