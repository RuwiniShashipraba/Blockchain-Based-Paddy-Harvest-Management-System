import React, {useState} from "react";
import {Button, InputLabel} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import "../styles/form.css";

const Card = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [cropSeasonError, setCropSeasonError] = useState("");
  const [culArea, setCulArea] = useState("");
  const [culAreaError, setCulAreaError] = useState("");
  const [zone, setZone] = useState("");
  const [zoneError, setZoneError] = useState("");
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [landPrepData, setLandPrepData] = useState({});

  const navigate = useNavigate();

  const navigateToLandprep = () => {
    navigate("/landPrep", {
      state: { cardData: { fullName, address, cropSeason, culArea, zone } },
    });
  };

  const handleCropSeasonChange = (e) => {
    const newValue = e.target.value;
    setCropSeason(newValue);

    if (newValue !== "Yala" && newValue !== "Maha") {
      setCropSeasonError("Please enter 'yala' or 'Maha'");
    } else {
      setCropSeasonError("");
    }
  };

  const handleCulAreaChange = (e) => {
    const newValue = e.target.value;

    // Check if the value is a valid float
    if (/^\d*\.?\d*$/.test(newValue)) {
      setCulArea(newValue);
      setCulAreaError("");
    } else {
      setCulArea("");
      setCulAreaError("Please enter a valid input");
    }
  };

  const handlezoneonChange = (e) => {
    const newValue = e.target.value;
    setZone(newValue);

    if (
      newValue !== "Wet" &&
      newValue !== "Dry" &&
      newValue !== "Intermidiate"
    ) {
      setZoneError("Please enter 'Wet' or 'Dry' or Intermidiate");
    } else {
      setZoneError("");
    }
  };

  const getQRCode = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const dataToEncode = `Full Name: ${fullName}\nAddress: ${address}\nCrop Season: ${cropSeason}\nCultivated Area (Ha): ${culArea}\nZone (Wet, Dry, Intermidiate): ${zone}`;
      const encodedData = encodeURIComponent(dataToEncode);

      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`
      );
      const blob = await res.blob();
      const qrImageUrl = URL.createObjectURL(blob);
      setQr(qrImageUrl);
      setLandPrepData(dataToEncode);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr_code.png";
    link.click();
  };

  return (
    <div className="page-container">
      <img src="./styles/paddy.jpg" alt="" />
      <form className="form" onSubmit={getQRCode}>
        <h1 className="title"> QR Code Generator</h1>
        <InputLabel>Full Name</InputLabel>
        <input
            type="text"
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
        />
        <InputLabel>Address</InputLabel>
        <input
            type="text"
            className="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
        />
        <InputLabel>Crop Season</InputLabel>
        <input
            type="text"
            className="input"
            value={cropSeason}
            onChange={handleCropSeasonChange}
            required
            placeholder="Enter the crop Season"
        />
        {cropSeasonError && (
            <div className="error-message">{cropSeasonError}</div>
        )}
        <InputLabel>Cultivated Area (Ha)</InputLabel>
        <input
            type="text"
            className="input"
            value={culArea}
            onChange={handleCulAreaChange}
            required
            placeholder="Enter the Cultivated Area"
        />
        {culAreaError && <div className="error-message">{culAreaError}</div>}{" "}
        {/* Display error message */}
        <InputLabel>Zone (Wet, Dry, Intermidiate)</InputLabel>
        <input
            type="text"
            className="input"
            value={zone}
            onChange={handlezoneonChange}
            required
            placeholder="Enter the Zone"
        />
        {zoneError && <div className="error-message">{zoneError}</div>}{" "}
        {/* Display error message */}
        {/* Navigate button */}
        <input type="submit" className="submit" value="Generate QR Code"/>
        {isLoading && (
            <div className="loading">
              <span></span>Loading....
            </div>
        )}
        {!isLoading &&
        (qr ? (
            <img className="qr_code" src={qr} alt="qr_code"/>
        ) : (
            <div className="loading"> QR Code for the user </div>
        ))}
        <div className="download-container">
          <button className="download-button" onClick={handleDownload}>
            Download QR Code
          </button>
        </div>
        <div className="button-container">
          <Button
              variant="contained"
              color="primary"
              onClick={navigateToLandprep}
          >
            {" "}
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Card;
