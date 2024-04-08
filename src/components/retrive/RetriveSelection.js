import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/retrive.css";
import customerImage from "../../img/customer.jpg";
import sellerImage from "../../img/seller.jpg";
import RetrievePage from './Retrive';
import Footer from '../FrontPage/Footer';
import NavigationBar from '../FrontPage/NavigationBar';

function RetriveSelection() {
  const navigate = useNavigate();
  const [selectedRetrive, setSelectedRetrive] = useState(null);

  const handleRetriveClick = (retriveTitle) => {
    setSelectedRetrive(retriveTitle);
  };

  return (
    <div>
      <NavigationBar/>
    <div className="retrive-section">
      <div className="selectretrive-section">
      <div className="row">
        <div className="retrive-box" onClick={() => navigate("/farmer-ret")}>
          <RetrievePage
            title="Farmer Details"
            description="Track the journey of rice from the farm to your table with complete transparency."
            img={customerImage}
            onClick={() => handleRetriveClick("Increased Transparency")}
          />
        </div>

        <div className="retrive-box" onClick={() => navigate("/miller-page")}>
          <RetrievePage
            title="Seller Details"
            description="Build trust in the rice supply chain by ensuring the authenticity and quality"
            img={sellerImage}
            onClick={() => handleRetriveClick("Enhanced Trust")}
          />
          </div>
        </div>
      </div>

      <div className="select-section">
      <div className="row">
        <div className="retrive-box" onClick={() => navigate("/miller-ret")}>
          <RetrievePage
            title="Miller Details"
            description="Description for another option."
            img={customerImage}
            onClick={() => handleRetriveClick("Another Option")}
          />
        </div>

        <div className="retrive-box" onClick={() => navigate("/different-page")}>
          <RetrievePage
            title="Customer Details"
            description="Description for a different option."
            img={sellerImage}
            onClick={() => handleRetriveClick("Different Option")}
          />
          </div>
        </div>
        
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default RetriveSelection;
