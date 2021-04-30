import React from "react";
import "./footer.css";
import phonelogo from "../img/footer-phone-logo.png";
import androidlogo from "../img/android-logo.png";
import applelogo from "../img/apple.png";
import logoFacebook from "../img/splash-facebook.png";
import logoInstagram from "../img/splash-instagram.png";
import logoTwitter from "../img/splash-twitter.png";
import logoYoutube from "../img/splash-youtube.png";

function Footer() {
  return (
    <div>
      <footer>
        <section>
          <div className="footer__flex">
            <div className="flex-container">
              <div className="footer__email flex-container">
                <div className="footer__email-logo">
                  <svg
                    height="40px"
                    version="1.1"
                    viewBox="0 0 40 40"
                    width="40px"
                    aria-label="email-support"
                    name="email-support"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="none"
                      strokeWidth="1"
                    >
                      <g
                        fill="#FFFFFF"
                        transform="translate(-592.000000, -519.000000)"
                      >
                        <g>
                          <g>
                            <g transform="translate(592.000000, 519.000000)">
                              <path d="M20,40 C8.954305,40 0,31.045695 0,20 C0,8.954305 8.954305,0 20,0 C31.045695,0 40,8.954305 40,20 C40,31.045695 31.045695,40 20,40 Z M12.7263828,17.5581092 C12.9539141,17.7250061 13.6397773,18.2206903 14.7840078,19.0449059 C15.9282734,19.8691216 16.8048594,20.5037464 17.4138008,20.9488171 C17.4807031,20.9976034 17.6228398,21.1036544 17.8402813,21.2671162 C18.0577578,21.4306876 18.2384609,21.5628676 18.38225,21.6636928 C18.5261445,21.7644814 18.7000977,21.8775488 18.9042852,22.0027124 C19.1084023,22.1277663 19.3008125,22.2218308 19.4814805,22.284102 C19.6621836,22.3468847 19.829457,22.3779838 19.9833359,22.3779838 L19.9934258,22.3779838 L20.0035508,22.3779838 C20.1574297,22.3779838 20.3247734,22.3468482 20.5054766,22.284102 C20.6860742,22.2218308 20.8786602,22.1276567 21.0826016,22.0027124 C21.2866484,21.8774027 21.4606016,21.7644448 21.6044961,21.6636928 C21.7483906,21.5628676 21.9289531,21.4306876 22.1465,21.2671162 C22.3639063,21.1035082 22.5062188,20.9976034 22.5731211,20.9488171 C23.1886367,20.5037464 24.7546016,19.3734009 27.2705234,17.5578899 C27.7589844,17.2033025 28.1670781,16.7754442 28.4949102,16.2746073 C28.8229883,15.7739896 28.9868516,15.2488143 28.9868516,14.6993738 C28.9868516,14.2402337 28.8278398,13.8472019 28.509957,13.5203149 C28.1921094,13.1933548 27.8156563,13.0299662 27.3808438,13.0299662 L12.6059023,13.0299662 C12.0906875,13.0299662 11.6941953,13.2107864 11.4164961,13.5724268 C11.138832,13.9341403 11,14.3862639 11,14.9287611 C11,15.3669614 11.1840781,15.8418155 11.5520586,16.3530309 C11.9200039,16.8642829 12.3115742,17.2660122 12.7263828,17.5581092 Z M27.983,18.6743853 C25.7884063,20.2184101 24.122,21.4183722 22.9845898,22.2740158 C22.6031797,22.5660397 22.2937695,22.7940018 22.0561484,22.9573539 C21.8185273,23.1208157 21.5025078,23.2877492 21.1076328,23.4580812 C20.7128984,23.6286691 20.3450234,23.7137072 20.0036914,23.7137072 L19.9934609,23.7137072 L19.9833711,23.7137072 C19.6421094,23.7137072 19.2740234,23.6286691 18.8792891,23.4580812 C18.4845547,23.2877492 18.1683242,23.1208157 17.9307734,22.9573539 C17.693293,22.7940018 17.3837773,22.5660397 17.0024023,22.2740158 C16.0989922,21.5854518 14.4361719,20.3854166 12.0138711,18.6743853 C11.6323555,18.4102445 11.2944336,18.1074767 11,17.7667029 L11,26.0507025 C11,26.5100618 11.1571836,26.9028744 11.4717266,27.2297979 C11.7861992,27.556831 12.1643398,27.7202928 12.6060078,27.7202928 L27.3809844,27.7202928 C27.8225469,27.7202928 28.2006523,27.556831 28.5151602,27.2297979 C28.8297734,26.9027647 28.9868867,26.5100984 28.9868867,26.0507025 L28.9868867,17.7667029 C28.6990977,18.1004236 28.3646211,18.4031915 27.983,18.6743853 Z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="footer__email-details">
                  <h3>EMAIL SUPPORT</h3>
                  <a
                    href="mailto:help@princeagezinweke@gmail.com?Subject=Hello%20"
                    rel="noopener noreferrer"
                    target="_top"
                  >
                    princeagezinweke@gmail.com
                  </a>
                </div>
              </div>
              <div className="footer__phone flex-container">
                <div className="footer__phone-logo">
                  <img src={phonelogo} alt="phone logo" />
                </div>
                <div className="footer__phone-details">
                  <h3>PHONE SUPPORT</h3>
                  <a href="email">0902 484 7299</a>
                </div>
              </div>
            </div>
            <div className="footer__deals flex-container">
              <div className="footer__deals-details">
                <h3>GET THE LATEST DEALS</h3>
                <p>Our best promotions sent to your inbox.</p>
              </div>
            </div>
            <div className="footer__input">
              <span>GET LATEST DEALS</span>
              <form>
                <input type="email" placeholder="Email Address" />
                <button>Subscribe</button>
              </form>
            </div>
          </div>
        </section>
        <section>
          <div className="footer__section-two">
            <div className="footer__section-division">
              <div className="section__two-division one">
                <a href="#about-konga">
                  <h4 className="footer-title">ABOUT KONGA</h4>
                </a>
                <ul id="about-konga">
                  <li>Contact Us</li>
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Our Blog</li>
                  <li>Forum</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
              <div className="section__two-division two">
                <a href="#payment">
                  <h4 className="footer-title">PAYMENT</h4>
                  <ul id="payment">
                    <li>KongaPay</li>
                    <li>Wallet</li>
                    <li>Verve</li>
                    <li>Mastercard</li>
                    <li>Visa</li>
                  </ul>
                </a>
              </div>
              <div className="section__two-division three">
                <a href="#buying-on-konga">
                  <h4 className="footer-title">BUYING ON KONGA</h4>
                </a>
                <ul id="buying-on-konga">
                  <li>Buyer Safety Center</li>
                  <li>FAQs</li>
                  <li>Delivery</li>
                  <li>Konga Return Policy</li>
                  <li>Digital Services</li>
                  <li>Bulk Purchase</li>
                </ul>
              </div>
              <div className="section__two-division four">
                <a href="#more-info">
                  <h4 className=" overdrive">MORE INFO</h4>
                </a>
                <ul id="more-info">
                  <li>Site Map</li>
                  <li>Track My Order</li>
                  <li>Privacy Policy</li>
                  <li>Authentic Items Policy</li>
                </ul>
              </div>
              <div className="section__two-division five">
                <a href="#make-money-on-konga">
                  <h4 className="footer-title">MAKE MONEY ON KONGA</h4>
                </a>
                <ul id="make-money-on-konga">
                  <li>Become a Konga Affiliate</li>
                </ul>
              </div>
            </div>
            <div className="section__two-flex">
              <div>
                <h4>DOWNLOAD & CONNECT WITH US</h4>
              </div>
              <div className="apps__wrapper">
                <div id="app">
                  <div id="apple icon">
                    <img width="50" src={applelogo} alt="apple logo" />
                  </div>
                  <div className="apple-info">
                    <p>Download on</p>
                    <h5>App Store</h5>
                  </div>
                </div>
                <div id="app">
                  <div className="android icon">
                    <img width="50" src={androidlogo} alt="android logo" />
                  </div>
                  <div className="android-info">
                    <p>Download on</p>
                    <h5>Google Play</h5>
                  </div>
                </div>
              </div>
              <div className="social">
                <h4> CONNECT WITH US</h4>
                <div className="social__links">
                  <a href="www.facebook.com">
                    <img src={logoFacebook} alt="facebook" />
                  </a>
                  <a href="www.twitter.com">
                    <img src={logoTwitter} alt="twitter" />
                  </a>
                  <a href="www.instagram.com">
                    <img src={logoInstagram} alt="instagram" />
                  </a>
                  <a href="www.youtube.com">
                    <img src={logoYoutube} alt="youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="footer__divider"></div>
        <div className="copy-right">
          <span>
            Designed And developed By Prince Agezi .N. - Copyright &copy; 2020 konga.com All
            rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
