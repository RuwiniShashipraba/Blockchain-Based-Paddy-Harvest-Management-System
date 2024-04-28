import React, {useContext, useEffect, useState} from "react";
import Web3 from "web3";
import {InputLabel} from "@material-ui/core";
import "../../styles/miller.css";
import CombinedContract from "../../contracts/CombinedContract.json";
import NavigationBar from "../../components/frontPage/NavigationBar";
import Footer from "../../components/frontPage/Footer";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";
import {MainContext} from "../../context/MainContext";

const MillerDetailsForm = () => {

    const {userId, userFullName, setIsLoading} = useContext(MainContext)
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [uniqueId, setUniqueId] = useState("");
    const [millerId, setMillerId] = useState("");
    const [name, setName] = useState(userFullName);
    const [cost, setCost] = useState("");
    const [riceWeight, setRiceWeight] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [manufactureDate, setManufactureDate] = useState("");
    const [costPerKg, setCostPerKg] = useState("");
    const [buyingPrice, setBuyingPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Initialize Web3 and contract
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    const _web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    setWeb3(_web3);
                } catch (error) {
                    console.error("Error enabling Ethereum provider:", error);
                    setErrorMessage(
                        "Error enabling Ethereum provider. Please make sure MetaMask is installed and unlocked."
                    );
                }
            } else {
                console.error("Please install MetaMask to use this application");
                setErrorMessage("Please install MetaMask to use this application");
            }
        };
        initWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            const deployedContract = new web3.eth.Contract(
                CombinedContract,
                COMBINED_CONTRACT_ADDRESS
            );
            setContract(deployedContract);
        }
    }, [web3]);

    useEffect(() => {
        if (userId) {
            setMillerId(userId)
        }
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contract) {
            setErrorMessage("Contract not loaded. Please wait for the contract to load.");
            return;
        }

        if (!uniqueId) {
            setErrorMessage("Please enter the unique ID from the Farmer's record.");
            return;
        }

        if (!millerId) {
            setErrorMessage("Please enter your Miller ID");
            return;
        }

        try {
            const millerInput = {
                uniqueId,
                millerId,
                millerName: name,
                productionCost: cost,
                riceWeight,
                expiryDate,
                manufactureDate,
                costPerKg,
                buyingPrice
            };

            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                setErrorMessage(
                    "No account found in MetaMask. Please make sure you have an Ethereum account connected."
                );
                return;
            }

            setIsLoading(true)
            const gasEstimate = await contract.methods.addMillerRecord(millerInput).estimateGas({from: accounts[0]});
            const encode = await contract.methods.addMillerRecord(millerInput).encodeABI();

            const receipt = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: encode,
            });

            // Clear form fields after successful submission
            setUniqueId("")
            setName("");
            setCost("");
            setRiceWeight("");
            setExpiryDate("");
            setManufactureDate("")
            setCostPerKg("");
            setBuyingPrice("");
            setErrorMessage("");

            console.log("Transaction receipt:", receipt);
            setIsLoading(false)
            alert("Miller details added successfully!");
        } catch (error) {
            console.error("Error adding Miller details:", error);
            setErrorMessage(
                "Error adding Miller details. Please check the console for more information."
            );
        }
    };

    return (
        <div>
            <NavigationBar/>
            <div className="page-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="title">Miller Details</h1>

                    <InputLabel>Unique ID from QR</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        required
                        placeholder="Enter the unique ID"
                    />

                    <InputLabel>Full Name</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        disabled={true}
                    />

                    <InputLabel>Production Cost</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                        placeholder="Enter the production cost"
                    />

                    <InputLabel>Rice Weight</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={riceWeight}
                        onChange={(e) => setRiceWeight(e.target.value)}
                        required
                        placeholder="Enter the weight"
                    />

                    <InputLabel>Expiry Date</InputLabel>
                    <input
                        type="date"
                        className="input"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        placeholder="Enter the expiry date"
                    />

                    <InputLabel>Manufacture Date</InputLabel>
                    <input
                        type="date"
                        className="input"
                        value={manufactureDate}
                        onChange={(e) => setManufactureDate(e.target.value)}
                        required
                        placeholder="Enter the manufacture date"
                    />

                    <InputLabel>Cost Per Kg</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={costPerKg}
                        onChange={(e) => setCostPerKg(e.target.value)}
                        required
                        placeholder="Enter the cost per KG"
                    />

                    <InputLabel>Buying Price</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                        required
                        placeholder="Enter the buying price"
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>

            <Footer/>
        </div>
    );
};

export default MillerDetailsForm;
