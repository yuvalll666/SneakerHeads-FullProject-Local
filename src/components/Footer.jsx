import React from "react";
import "../css/Footer.css";
import FooterNavbar from "./footerDetail/FooterNavbar";

function Footer() {
  return (
    <div className="footer-container">
      <div className="top-stripe-container col-12">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="d-flex justify-content-center col-4">
              <FooterNavbar />
            </div>
            <div className="d-flex justify-content-center col-4 text-white">
              middle
            </div>
            <div className="d-flex justify-content-center col-4 text-white">
              end
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
