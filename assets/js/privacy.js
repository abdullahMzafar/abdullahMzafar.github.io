const lastUpdated = new Date(document.lastModified);
  document.getElementById('last-updated').textContent =
    lastUpdated.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

