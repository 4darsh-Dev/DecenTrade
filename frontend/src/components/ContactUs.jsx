import React from "react";
import "../styles/ContactUs.css";
import InstagramIcon from "../assets/instagram-brands-solid.svg";
import FacebookIcon from "../assets/facebook-brands-solid.svg";
import TwitterIcon from "../assets/x-twitter-brands-solid.svg";
import LinkedInIcon from "../assets/linkedin-brands-solid.svg";
import ContactUsImg from "../assets/ContactUs_Img.png";

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="title-line"></div>
        <form action="#" method="post">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>

          <button className="btn" type="submit">Send </button>
        </form>
        <div className="form-line"></div>

        {/* Social Media Icons */}
        <ul className="social-icons">
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src={InstagramIcon} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src={FacebookIcon} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <img src={TwitterIcon} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <img src={LinkedInIcon} alt="LinkedIn" />
            </a>
          </li>
        </ul>
      </div>

      {/* ContactUs Image */}
      <div className="contact-image">
        <img src={ContactUsImg} alt="Contact Us Illustration" />
      </div>
    </div>
  );
};

export default ContactUs;
