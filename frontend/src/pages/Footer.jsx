import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa"; // Import icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>Connect with us:</p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="social-icon" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                    </a>
                    <a href="www.linkedin.com/in/vidya-bharti-92163b255" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="social-icon" />
                    </a>
                    <a href="https://github.com/vidyabharti9" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="social-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
