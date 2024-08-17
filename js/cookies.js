document.addEventListener('DOMContentLoaded', () => {
    const cookieModal = document.getElementById('cookieConsentModal');
    const acceptButton = document.getElementById('acceptCookies');
  
    // Check if consent has already been given
    if (!localStorage.getItem('cookieConsent')) {
      cookieModal.style.display = 'block';
    }
  
    acceptButton.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieModal.style.display = 'none';
    });
  
    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (event.target === cookieModal) {
        cookieModal.style.display = 'none';
      }
    });
  });