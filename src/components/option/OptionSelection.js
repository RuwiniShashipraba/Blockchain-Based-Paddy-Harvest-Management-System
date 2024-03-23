import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard';
import "../../styles/option.css";
import customerImage from "../../img/customer.jpg";
import sellerImage from "../../img/seller.jpg";

function OptionSelection() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionTitle) => {
    setSelectedOption(optionTitle);
  };

  return (
    <div className="option-section">
      <div className="select-section">
        <div className="option-box" onClick={() => navigate("/inputselection")}>
          <OptionCard
            title="Input the details"
            description="Track the journey of rice from the farm to your table with complete transparency."
            img={customerImage}
            onClick={() => handleOptionClick("Increased Transparency")}
          />
        </div>

        <div className="option-box" onClick={() => navigate("/retrieveselection")}>
          <OptionCard
            title="View the details"
            description="Build trust in the rice supply chain by ensuring the authenticity and quality"
            img={sellerImage}
            onClick={() => handleOptionClick("Enhanced Trust")}
          />
        </div>
        
      </div>
    </div>
  );
}

export default OptionSelection;

