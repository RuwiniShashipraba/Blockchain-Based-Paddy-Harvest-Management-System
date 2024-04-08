import React, { useState, useEffect } from "react";
import { InputLabel, Button } from "@material-ui/core";
import "../../styles/farmer.css";
import Web3 from "web3";
import FarmerDetailsContract from "../../contracts/FarmerDetails.json";
import Footer from "../FrontPage/Footer";
import NavigationBar from "../FrontPage/NavigationBar";

const Farmer = () => {
  const [fullName, setFullName] = useState("");
  const [faddress, setfAddress] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [cropSeasonError, setCropSeasonError] = useState("");
  const [culArea, setCulArea] = useState("");
  const [culAreaError, setCulAreaError] = useState("");
  const [zone, setZone] = useState("");
  const [zoneError, setZoneError] = useState("");
  const [seed, setSeed] = useState("");
  const [weightpadddy, setWeightPaddy] = useState("");
  const [weightError, setWeightError] = useState("");
  const [farmselprice, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [landPreparationCost, setLandPreparationCost] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [maintenanceCost, setMaintenanceCost] = useState("");
  const [cuttingCost, setCuttingCost] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [costPerKg, setCostperkg] = useState(0);

  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  // Store input data on the blockchain
  const storeInputDataOnBlockchain = async () => {
    try {
      // Check if contract instance exists
      if (!contract) {
        console.error("Contract instance not found.");
        return;
      }

      const totalCostString = totalCost.toString();
      const costPerKgString = costPerKg.toString();

      // Call the smart contract method to store farmer details
      await contract.methods
        .addFarmerDetails(
          fullName,
          faddress,
          year,
          cropSeason,
          culArea,
          zone,
          seed,
          weightpadddy,
          farmselprice,
          totalCostString,
          costPerKgString
        )
        .send({ from: accounts[0] });

      // Display success message
      alert("Farmer details stored on the blockchain successfully!");
    } catch (error) {
      console.error("Error storing farmer details on the blockchain:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store input data on the blockchain
    storeInputDataOnBlockchain();
  };

  const calculateTotalCost = () => {
    const landPreparation = parseFloat(landPreparationCost) || 0;
    const fertilizer = parseFloat(fertilizerCost) || 0;
    const maintenance = parseFloat(maintenanceCost) || 0;
    const cutting = parseFloat(cuttingCost) || 0;

    const total = landPreparation + fertilizer + maintenance + cutting;
    setTotalCost(total);

    // Calculate cost per kg
    const weight = parseFloat(weightpadddy) || 0;
    if (weight > 0) {
      const costPerKg = total / weight;
      setCostperkg(costPerKg);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Initialize Web3 using MetaMask's provider
          const _web3 = new Web3(window.ethereum);
          // Request account access if needed
          await window.ethereum.enable();
          // Set the Web3 instance to state
          setWeb3(_web3);
        } else {
          // If MetaMask is not installed, display an error message
          console.error("Please install MetaMask to use this application");
        }
      } catch (error) {
        // Handle initialization errors
        console.error("Error initializing Web3:", error);
      }
    };

    // Call the initialization function
    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      // Load user accounts
      web3.eth.getAccounts().then(setAccounts);

      // Load smart contract
      const contractAddress = "0x189364e831d6f766fac878bccf6dbd2fc0dc54c8";
      const contractInstance = new web3.eth.Contract(
        FarmerDetailsContract.abi,
        contractAddress
      );
      setContract(contractInstance);
    }
  }, [web3]);

  useEffect(() => {
    calculateTotalCost();
  }, [landPreparationCost, fertilizerCost, maintenanceCost, cuttingCost]);

  const handleYearChange = (e) => {
    const newValue = e.target.value;

    if (/^\d*\.?\d*$/.test(newValue)) {
      setYear(newValue);
      setYearError("");
    } else {
      setYear("");
      setCulAreaError("Please enter a valid input");
    }
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

  const handleWeightChange = (e) => {
    const newValue = e.target.value;

    if (/^\d*\.?\d*$/.test(newValue)) {
      setWeightPaddy(newValue);
      setWeightError("");
    } else {
      setWeightPaddy("");
      setWeightError("Please enter a valid input");
    }
  };

  const handlePriceChange = (e) => {
    const newValue = e.target.value;

    if (/^\d*\.?\d*$/.test(newValue)) {
      setPrice(newValue);
      setPriceError("");
    } else {
      setPrice("");
      setPriceError("Please enter a valid input");
    }
  };

  /*const getQRCode = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const dataToEncode = `Full Name: ${fullName}\nfAddress: ${faddress}\nCrop Season: ${cropSeason}\nCultivated Area (Ha): ${culArea}\nZone (Wet, Dry, Intermidiate): ${zone}`;
            const encodedData = encodeURIComponent(dataToEncode);

            const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`);
            const blob = await res.blob();
            const qrImageUrl = URL.createObjectURL(blob);
            setQr(qrImageUrl);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }*/

  /*const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qr;
        link.download = 'qr_code.png';
        link.click();
    };*/

  const submitFarmerDetails = async () => {
    try {
      // Perform actions related to submitting farmer details, if needed
      console.log("Farmer details submitted successfully!");
    } catch (error) {
      console.error("Error submitting farmer details:", error);
    }
  };

  return (
    <div>
        <NavigationBar/>
    <div className="page-container">
      <img src="./paddy.jpg" alt="" />
      <form className="form">
        <h1 className="title">Farming Details</h1>
        <InputLabel>Full Name of Farmer</InputLabel>
        <input
          type="text"
          className="input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="Enter your full name"
        />
        <InputLabel>Address of Farmer</InputLabel>
        <input
          type="text"
          className="input"
          value={faddress}
          onChange={(e) => setfAddress(e.target.value)}
          required
          placeholder="Enter your address"
        />

        <InputLabel>Year</InputLabel>
        <input
          type="text"
          className="input"
          value={year}
          onChange={handleYearChange}
          required
          placeholder="Enter the Year"
        />
        {yearError && <div className="error-message">{yearError}</div>}

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
        {culAreaError && <div className="error-message">{culAreaError}</div>}

        <InputLabel>Zone (Wet, Dry, Intermidiate)</InputLabel>
        <input
          type="text"
          className="input"
          value={zone}
          onChange={handlezoneonChange}
          required
          placeholder="Enter the Zone"
        />
        {zoneError && <div className="error-message">{zoneError}</div>}

        <InputLabel>Seed</InputLabel>
        <input
          type="text"
          className="input"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          required
          placeholder="Enter the Seed type"
        />

        <InputLabel>Weight</InputLabel>
        <input
          type="text"
          className="input"
          value={weightpadddy}
          onChange={handleWeightChange}
          required
          placeholder="Enter the weight"
        />
        {weightError && <div className="error-message">{weightError}</div>}
        <InputLabel>Price</InputLabel>
        <input
          type="text"
          className="input"
          value={farmselprice}
          onChange={handlePriceChange}
          required
          placeholder="Enter the price"
        />

        {priceError && <div className="error-message">{priceError}</div>}

        <InputLabel>Land Preparation Cost</InputLabel>
        <input
          type="text"
          className="input"
          value={landPreparationCost}
          onChange={(e) => setLandPreparationCost(e.target.value)}
          required
          placeholder="Enter land preparation cost"
        />

        <InputLabel>Fertilizer Cost</InputLabel>
        <input
          type="text"
          className="input"
          value={fertilizerCost}
          onChange={(e) => setFertilizerCost(e.target.value)}
          required
          placeholder="Enter fertilizer cost"
        />

        <InputLabel>Maintenance Cost</InputLabel>
        <input
          type="text"
          className="input"
          value={maintenanceCost}
          onChange={(e) => setMaintenanceCost(e.target.value)}
          required
          placeholder="Enter maintenance cost"
        />

        <InputLabel>Cutting Cost</InputLabel>
        <input
          type="text"
          className="input"
          value={cuttingCost}
          onChange={(e) => setCuttingCost(e.target.value)}
          required
          placeholder="Enter cutting cost"
        />

        <div>Total Cost: {totalCost}</div>
        <div>Cost per KG: {costPerKg}</div>

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              submitFarmerDetails();
              storeInputDataOnBlockchain(); // Store input data on blockchain on "Next" button click
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default Farmer;
