import React from 'react';
import './Footer.css';

// Using Font Awesome icons (make sure to add the link to Font Awesome in your `index.html` head section)
function Footer() {
  return (
    <footer>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="Follow us on LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      <div className="fun-message">
        <p>We connect hobbies... because Netflix can’t do it all!</p>
      </div>

      <p>© 2024 Hobby Connect. All rights reserved. Keep having fun!</p>
    </footer>
  );
}

export default Footer;
