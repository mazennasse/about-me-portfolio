// ===== Smooth Scroll for Hero Section Button =====
const heroBtn = document.querySelector('.contact-btn');
if (heroBtn) {
  heroBtn.addEventListener('click', function() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===== Smooth Scroll for About Me Section Button =====
const aboutBtn = document.querySelector('.aboutme-btn');
if (aboutBtn) {
  aboutBtn.addEventListener('click', function() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===== Contact Form Functionality =====
const contactFormBtn = document.querySelector('.contact-section .contact-btn');
const nameInput = document.querySelector('.contact-section .form-input');
const messageInput = document.querySelector('.contact-section .form-textarea');

if(contactFormBtn) {
  contactFormBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if(name === '' || message === '') {
      alert('Please fill in both your Name and Message before sending.');
    } else {
      alert(`Thank you ${name}! Your message has been sent successfully.`);
      // Clear the inputs after sending
      nameInput.value = '';
      messageInput.value = '';
    }
  });
}