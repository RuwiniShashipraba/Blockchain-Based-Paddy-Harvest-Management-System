import React, { useState, useEffect } from 'react';
import { InputLabel} from '@material-ui/core';
import { useNavigate, useLocation  } from 'react-router-dom';
import '../styles/form.css';

const Landprep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [firPlowCost, setFirPlowCost] = useState("");
  const [firPlowCostError, setfirPlowCostError] = useState("");
  const [secPlowCost, setSecPlowCost] = useState("");
  const [secPlowCostError, setsecPlowCostError] = useState("");
  const [qr, setQr] = useState("");
  const [landPrepData, setLandPrepData] = useState({});
  const [combinedData, setCombinedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);



  const handlfirPlowCostChange = (e) => {
    const newValue = e.target.value;
  
    // Check if the value is a valid number
    if (/^\d*\.?\d*$/.test(newValue)) {
      setFirPlowCost(newValue);
      setfirPlowCostError("");
      } else {
        setFirPlowCost("");
        setfirPlowCostError("Please enter a valid Price");
      }
      
  };

  const handlsecPlowCostChange = (e) => {
    const newValue = e.target.value;
  
    // Check if the value is a valid number
    if (/^\d*\.?\d*$/.test(newValue)) {
      setSecPlowCost(newValue);
      setsecPlowCostError("");
      } else {
        setSecPlowCost("");
        setsecPlowCostError("Please enter a valid Price");
      }
      
  };
  
  useEffect(() => {
    const cardData = location.state?.cardData;
    if (cardData) {
        setCombinedData(cardData);
    }
}, [location]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const landPrepData = {
      firstPlowingCost: firPlowCost,
      secondPlowingCost: secPlowCost,
      ...combinedData,
    };
    setLandPrepData(landPrepData);
    await getQRCode(landPrepData);
  };

  const getQRCode = async (landPrepData) => {
    const formattedData = `
        Full Name: ${landPrepData.fullName}
        Address: ${landPrepData.address}
        Crop Season: ${landPrepData.cropSeason}
        Cultivated Area: ${landPrepData.culArea}
        Zone: ${landPrepData.zone}
        First Plowing Cost: ${landPrepData.firstPlowingCost}
        Second Plowing Cost: ${landPrepData.secondPlowingCost}
    `;

    //const dataToEncode = JSON.stringify(landPrepData);
    const encodedData = encodeURIComponent(formattedData);

    const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`)
    const blob = await res.blob();
    const qrImageUrl = URL.createObjectURL(blob);
    setQr(qrImageUrl);
  };

  return (
    <div className='page-container'>
      <form className='form' onSubmit={handleFormSubmit}>
        <h1 className='title'> Land Preparation </h1>
        <InputLabel>First plowing Cost</InputLabel>
        <input
          type="text"
          className='input'
          value={firPlowCost}
          onChange={handlfirPlowCostChange}
          required
          placeholder='Enter The Cost'
        />
        {firPlowCostError && <div className='error-message'>{firPlowCostError}</div>} {/* Display error message */}

        <InputLabel>Second plowing Cost</InputLabel>
        <input
          type="text"
          className='input'
          value={secPlowCost}
          onChange={handlsecPlowCostChange}
          required
          placeholder='Enter The Cost'
        />

      {secPlowCostError && <div className='error-message'>{secPlowCostError}</div>} {/* Display error message */}

        {/* Rest of the form */}
        <input type="submit" className='submit' value="Submit" />

        {isLoading && <div className='loading'><span></span>Loading....</div>}

        {!isLoading && (qr ? <img className='qr_code' src={qr} alt='qr_code' /> :
                <div className='loading'> QR Code for the user </div>)}


        <button onClick={() => navigate(-1)}>Go Back</button>
      </form>
      
    </div>
  );
};

export default Landprep;
