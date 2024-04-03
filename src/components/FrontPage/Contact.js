import React from "react";
// import emailIcon from "../../img/mail.png";
// import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome CSS

import "../../styles/firstpage.css";

function Contact() {
  return (
    <div className="contact-section" id="Contact">
      <h2>Contact Us</h2>
      <p>
        Interested in learning more about our project or collaborating with us?
        We'd love to hear from you! Feel free to reach out to us through the
        contact information provided below.
        {/* <ul>
          
          <img src="../../img/mail.png" alt="Email Icon" width="20" height="20" /> 
          <li>Email: smartpaddy@gmail.com</li>
          <li>Phone: (123) 456-7890</li>
          
        </ul> */}
        <ul>
          <li>
            {/* <i className="fa fa-envelope"></i> */}
            <span>Email:</span> smartpaddy@gmail.com
          </li>
          <li>
            {/* <i className="fa fa-phone"></i> */}
            <span>Phone:</span> (123) 456-7890
          </li>
        </ul>
      </p>

      {/* You can also include a contact form or other contact information */}
    </div>
  );
}

export default Contact;
