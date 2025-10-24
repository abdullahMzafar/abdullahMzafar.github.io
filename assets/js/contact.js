console.log('✅ contact.js loaded correctly');

// Immediately restore theme from localStorage
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
})();


let recaptchaWidgetId = null;

// Initialize the reCAPTCHA when the API loads
function onLoadRecaptcha() {
  const container = document.getElementById('recaptcha-widget');
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  recaptchaWidgetId = grecaptcha.render(container, {
    sitekey: '6LdfWO4rAAAAAGfHiczFudPmhmJlqf_Ryq8OiU1Z',  // ✅ replace with your own visible v2 key
    theme: theme
  });
  document.getElementById('recaptcha-container').classList.remove('hidden');
}

// Watch for theme changes (light/dark toggle)
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement.getAttribute('data-theme');
  if (recaptchaWidgetId !== null) {
    const container = document.getElementById('recaptcha-widget');
    container.innerHTML = '';
    recaptchaWidgetId = grecaptcha.render(container, {
      sitekey: '6LdfWO4rAAAAAGfHiczFudPmhmJlqf_Ryq8OiU1Z',
      theme: newTheme
    });
  }
});

observer.observe(document.documentElement, { attributes: true });

document.querySelector('form').addEventListener('submit', function (e) {
  const response = grecaptcha.getResponse();
  if (!response.length) {
    e.preventDefault();
    alert('⚠️ Please verify you’re not a robot before submitting.');
  }
});


