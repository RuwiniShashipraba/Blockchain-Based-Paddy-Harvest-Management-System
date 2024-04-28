import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/input.css";
import customerImage from "../../img/customer.jpg";
import sellerImage from "../../img/seller.jpg";
import InputPage from "./Input";
import { MainContext } from "../../context/MainContext";

function InputSelection() {
  const navigate = useNavigate();
  const [selectedInput, setSelectedInput] = useState(null);
  const { userRole } = useContext(MainContext);

  const handleInputClick = (inputTitle) => {
    setSelectedInput(inputTitle);
  };

  return (
    <div className="input-section">
      <div className="select-section">
        <div className="row">
          {userRole === "farmer" && (
            <div className="input-box" onClick={() => navigate("/farmer-page")}>
              <InputPage
                title="Farmer Details"
                description="Track the journey of rice from the farm to your table with complete transparency."
                img={customerImage}
                onClick={() => handleInputClick("Increased Transparency")}
              />
            </div>
          )}

          {userRole === "seller" && (
            <div className="input-box" onClick={() => navigate("/seller-form")}>
              <InputPage
                title="Seller Details"
                description="Build trust in the rice supply chain by ensuring the authenticity and quality"
                img={sellerImage}
                onClick={() => handleInputClick("Enhanced Trust")}
              />
            </div>
          )}

          {userRole === "miller" && (
            <div className="row">
              <div
                className="input-box"
                onClick={() => navigate("/miller-form")}
              >
                <InputPage
                  title="Miller Details"
                  description="Description for another option2"
                  img={customerImage}
                  onClick={() => handleInputClick("Another Option")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputSelection;
