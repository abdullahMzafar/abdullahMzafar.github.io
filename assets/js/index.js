function () {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');

    // Apply saved theme if present
    if (saved) root.setAttribute('data-theme', saved);

    // Function: set avatar image according to theme
    function setAvatarForTheme(theme) {
      const avatarImg = document.querySelector('.avatar img');
      if (!avatarImg) return;
      if (theme === 'light') {
        // file you will add for light theme (upload BlueCircuitHandshakeWCuff.png)
        avatarImg.src = 'Image/BlueCircuitHandshakeWCuff.png';
      } else {
        avatarImg.src = 'Image/WhiteCircuitHandshakeWCuff.png';
      }
    }

    // Set initial avatar according to saved or default theme
    setAvatarForTheme(root.getAttribute('data-theme') || 'dark');

    // Theme toggle button
    const btn = document.getElementById('themeToggle');
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      // update avatar immediately after switching theme
      setAvatarForTheme(current);
    });
}();

  // set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  
function(){
    // Robust storage helpers (avoid errors if storage is disabled)
    const key = 'cookie-consent';
    function getStorage(){
      try { return window.localStorage; } catch(e) { return null; }
    }
    const store = getStorage();
  
    function showBannerIfNeeded() {
      const consent = store ? store.getItem(key) : null;
      if (!consent) {
        document.getElementById('cookie-banner').style.display = 'block';
      } else {
        // If previously accepted, ensure consent is granted (in case script ran before)
        if (consent === 'accepted' && typeof gtag === 'function') {
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
            // 'ad_user_data': 'granted',
            // 'ad_personalization': 'granted',
            // 'functionality_storage': 'granted'
          });
        }
      }
    }
  
    function recordConsent(val) {
      if (store) store.setItem(key, val);
      document.getElementById('cookie-banner').style.display = 'none';
  
      if (typeof gtag === 'function') {
        if (val === 'accepted') {
          // User accepted: upgrade consent → full GA4 tracking
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
            // 'ad_user_data': 'granted',
            // 'ad_personalization': 'granted',
            // 'functionality_storage': 'granted'
          });
        } else {
          // User rejected: remain in limited/cookieless mode
          gtag('consent', 'update', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
            // 'ad_user_data': 'denied',
            // 'ad_personalization': 'denied',
            // 'functionality_storage': 'denied'
          });
        }
      }
    }
  
    document.getElementById('accept-cookies').addEventListener('click', function(){ recordConsent('accepted'); });
    document.getElementById('reject-cookies').addEventListener('click', function(){ recordConsent('rejected'); });
  
    // Show on first load if no decision
    showBannerIfNeeded();
}();

// --- Initialize both once DOM is ready ---
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCookieConsent();
});
