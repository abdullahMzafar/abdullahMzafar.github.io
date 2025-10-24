<!-- Google Consent Mode: default deny until user accepts -->

// Initialize dataLayer and default consent (no cookies until user accepts)
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied'
  // Optional (Consent Mode v2 extra signals):
  // 'ad_user_data': 'denied',
  // 'ad_personalization': 'denied',
  // 'functionality_storage': 'denied',
  // 'security_storage': 'granted' // reCAPTCHA relies on security storage
});

<!-- Google Tag Manager -->
  
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5V8BZHS9');
<!-- End Google Tag Manager -->

