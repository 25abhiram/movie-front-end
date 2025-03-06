import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"; // Ensure you have a CSS file for styling

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="contact-info">
            <h5>Questions? Call 0850-380-6444</h5>
            <p>
              Format for custom post types that are not book or you can use else if
              to specify a second post type the same way as above.
            </p>
          
          </div>

          <div className="footer-links">
            <div>
              <h5>PLAY SHOW</h5>
              <ul>
                <li><Link to="/play">Play Show</Link></li>
                <li><Link to="/devices">Devices</Link></li>
                <li><Link to="/tips">Tips</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/legal">Legal Notices</Link></li>
                <li><Link to="/terms">Our Terms</Link></li>
              </ul>
            </div>

            <div>
              <h5>SUPPORT</h5>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/media">Media Center</Link></li>
                <li><Link to="/support">Support</Link></li>
              </ul>
            </div>

            <div className="newsletter">
              <h5>NEWSLETTER</h5>
              <p>Subscribe to get the latest movie updates.</p>
              <input type="email" placeholder="Enter Your Email" className="email-input" />
              <button className="btn btn-danger">SUBMIT NOW</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>

          <p className="text-center">&copy; 2025 CineHolic, Inc. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
