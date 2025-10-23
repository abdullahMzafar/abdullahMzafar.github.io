document.getElementById('last-updated').textContent =
  new Date(document.lastModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

