import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"; // Ensure you have a CSS file for styling

export const Footer = () => {
  return (
    <footer className="footer ">
      <div className="footer-container">

        <div className="footer-bottom">

        <Link className="abt btn  mb-3" to={"/about-US"}>
            ABOUT US
          </Link>
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
