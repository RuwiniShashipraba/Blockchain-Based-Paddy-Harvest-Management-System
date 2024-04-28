import React from "react";
import "../../styles/firstpage.css";

function Contact() {
    return (
        <div className="contact-section" id="Contact">
            <h2>Contact Us</h2>
            <p>
                Interested in learning more about our project or collaborating with us?
                We'd love to hear from you! Feel free to reach out through the contact information below.
            </p>
            <ul>
                <li>
                    <i className="fa fa-envelope"></i> <span>Email:</span> smartpaddy@gmail.com
                </li>
                <li>
                    <i className="fa fa-phone"></i> <span>Phone:</span> (123) 456-7890
                </li>
            </ul>
        </div>
    );
}

export default Contact;
