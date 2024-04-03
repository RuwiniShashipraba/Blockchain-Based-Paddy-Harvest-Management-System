import React, { useState } from "react";
import Service from "./Service";
// import "../../styles/card.css";
function ServiceSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="service-section" id="service">
        <div className="benefits-section">
          <Service
            title="Increased Transparency"
            description="Track the journey of rice from the farm to your table with complete transparency."
            onClick={() => handleServiceClick("Increased Transparency")}
          />
          <Service
            title="Enhanced Trust"
            description="Build trust in the rice supply chain by ensuring the authenticity and quality of the products."
            onClick={() => handleServiceClick("Enhanced Trust")}
          />
          <Service
            title="Efficient Management"
            description="Streamline supply chain processes for farmers, distributors, and retailers for better efficiency."
            onClick={() => handleServiceClick("Efficient Management")}
          />
          <Service
            title="Quality Assurance"
            description="Assure the highest quality standards in every step of the rice supply chain management."
            onClick={() => handleServiceClick("Quality Assurance")}
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Details for {selectedService}</h2>
            {/* Add more details or content here */}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceSection;
