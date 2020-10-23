import React from "react";
import "../css/Footer.css";
import FooterNavbar from "./footerDetail/FooterNavbar";
import MiddleSection from "./footerDetail/MiddleSection";
import ContactUs from "./footerDetail/ContactUs";

function Footer() {
  return (
    <div className="footer-container">
      <div className="top-stripe-container col-12">
        <div className="container-fluid">
          <div className="row mt-4 d-flex justify-content-center">
            <div className="col-4 sections">
              <FooterNavbar />
            </div>

            <div className="col-4 sections">
              <MiddleSection />
            </div>

            <div className="col-4 sections">
              <ContactUs />
            </div>
          </div>
        </div>
      </div>

      <div className="text-white lower-stripe-container">
        <span>SneakerHeads &copy; {new Date().getFullYear()} </span>
      </div>
    </div>
  );
}

export default Footer;
