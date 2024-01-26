import React from 'react';
import '../main.js'
function Footer() {
    return (
        <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <ul className="menu menu-type2">
              <li>
                <a href="about.html">Home</a>
              </li>
              <li>
                <a href="shop-5-cols.html">Shop</a>
              </li>
              <li>
                <a href="about.html">About Us</a>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
  
          <div className="footer-middle">
            <div className="footer-left">
              <ul className="widget-body">
                <li>
                  <a href="tel:#" className="footer-icon-box">
                    <i className="p-icon-phone-solid"></i>
                    <span>+966598877123</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="p-icon-map"></i>
                    <span>Jazan Saudi Arabia, KSA</span>
                  </a>
                </li>
                <li>
                  <a href="/cdn-cgi/l/email-protection#afc2cec6c3efdfcec1cbce81ccc0c2" className="">
                    <i className="p-icon-message"></i>
                    <span><span className="__cf_email__"
                        data-cfemail="94fdfaf2fbd4e4f5faf0f5baf7fbf9">[email&#160;protected]</span></span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="p-icon-clock"></i>
                    <span>Mon-Fri: 10:00 - 18:00</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-center">
              <a  className="logo-footer">
                <img src="public/images/logo.png" alt="logo-footer" width="171" height="41" />
              </a>
              <div className="social-links">
                <a href="#" className="social-link fab fa-facebook-f" title="Facebook"></a>
                <a href="#" className="social-link fab fa-twitter" title="Twitter"></a>
                <a href="#" className="social-link fab fa-pinterest" title="Pinterest"></a>
                <a href="#" className="social-link fab fa-linkedin-in" title="Linkedin"></a>
              </div>
            </div>
            <div className="footer-right">
              <div className="widget-newsletter">
                <h4 className="widget-title">Subscribe Newsletter</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur.r<br />
                  Lorem ipsum dolor sit.
                </p>
                <form action="#" className="form-simple">
                  <input type="email" name="email" id="email" placeholder="Email address here..." required="" />
                  <button className="btn btn-link" type="submit">sign up</button>
                </form>
              </div>
            </div>
          </div>
  
          <div className="footer-bottom">
            <p className="copyright">Zuvi8Creatives© 2022. All Rights Reserved</p>
            <figure>
              <img src="images/payment.png" alt="payment" width="159" height="29" />
            </figure>
          </div>
        </div>
      </footer>
    );
}

export default Footer;