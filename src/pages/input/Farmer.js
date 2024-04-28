import React, {useContext, useEffect, useState} from "react";
import {Button, InputLabel} from "@material-ui/core";
import "../../styles/farmer.css";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import Footer from "../../components/frontPage/Footer";
import NavigationBar from "../../components/frontPage/NavigationBar";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";
import {v4 as uuidv4} from "uuid";
import {MainContext} from "../../context/MainContext";

const Farmer = () => {

    const {userId, userAddress, userFullName, setIsLoading} = useContext(MainContext)
    const [fullName, setFullName] = useState(userFullName);
    const [fAddress, setfAddress] = useState(userAddress);
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
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);

    // Store input data on the blockchain
    const storeInputDataOnBlockchain = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            const gasLimit = 150000;
            const uniqueId = uuidv4()
            const farmerId = userId

            let weightFinal = weightpadddy.toString()
            let sellPriceFinal = farmselprice.toString()
            let totalPriceFinal = totalCost.toString()
            let costPerKgFinal = costPerKg.toString()

            const farmerInput = {
                uniqueId,
                farmerId,
                fullName,
                fAddress,
                year,
                cropSeason,
                culArea,
                zone,
                seed,
                weightPaddy: weightFinal,
                farmerSellPrice: sellPriceFinal,
                totalCost: totalPriceFinal,
                costPerKg: costPerKgFinal,
            };

            setIsLoading(true)
            const gasEstimate = await contract.methods.addFarmerRecord(farmerInput).estimateGas({from: accounts[0]});
            const encode = await contract.methods.addFarmerRecord(farmerInput).encodeABI();

            const receipt = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: encode,
            });

            console.log("Transaction receipt:", receipt);
            setIsLoading(false)
            alert("Farmer details stored on the blockchain successfully!");
        } catch (error) {
            console.error("Error storing farmer details on the blockchain:", error);
            if (error.message.includes("Transaction has been reverted by the EVM")) {
                console.log("Transaction reversion details:", error);
                alert("Transaction reverted. Please check your contract logic, gas limit, or other possible issues.");
            }
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
                if (window.ethereum) {
                    const _web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    setWeb3(_web3);
                } else {
                    console.error("Please install MetaMask to use this application");
                }
            } catch (error) {
                console.error("Error initializing Web3:", error);
            }
        };

        initWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            // Load user accounts
            web3.eth.getAccounts().then(response => setAccounts(response))

            const contractInstance = new web3.eth.Contract(
                CombinedContract,
                COMBINED_CONTRACT_ADDRESS
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
            setCropSeasonError("Please enter 'Yala' or 'Maha'");
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
                <img src="./paddy.jpg" alt=""/>
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
                        disabled={true}
                    />
                    <InputLabel>Address of Farmer</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={fAddress}
                        onChange={(e) => setfAddress(e.target.value)}
                        required
                        placeholder="Enter your address"
                        disabled={true}
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
