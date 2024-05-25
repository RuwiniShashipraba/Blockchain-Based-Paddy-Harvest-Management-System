import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { InputLabel } from "@material-ui/core";
import "../../styles/miller.css";
import CombinedContract from "../../contracts/CombinedContract.json";
import NavigationBar from "../../components/frontPage/NavigationBar";
import Footer from "../../components/frontPage/Footer";
import { COMBINED_CONTRACT_ADDRESS } from "../../constants";
import { MainContext } from "../../context/MainContext";

const SellerDetailsForm = () => {

    const { userId, setIsLoading, userFullName } = useContext(MainContext)
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    const [uniqueId, setUniqueId] = useState("");
    const [name, setName] = useState(userFullName);
    const [buyingPrice, setBuyingPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");

    const [setErrorMessage] = useState("");

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
            // Load contract
            const deployedContract = new web3.eth.Contract(
                CombinedContract,
                COMBINED_CONTRACT_ADDRESS
            );
            setContract(deployedContract);
        }
    }, [web3]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contract) {
            setErrorMessage(
                "Contract not loaded. Please wait for the contract to load."
            );
            return;
        }

        const sellerId = userId
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                setErrorMessage(
                    "No account found in MetaMask. Please make sure you have an Ethereum account connected."
                );
                return;
            }

            const sellerInput = {
                uniqueId,
                sellerId,
                sellerName: name,
                buyingPrice,
                sellingPrice: sellPrice
            };

            setIsLoading(true)
            const gasEstimate = await contract.methods.addSellerRecord(sellerInput).estimateGas({ from: accounts[0] });
            const encode = await contract.methods.addSellerRecord(sellerInput).encodeABI();

            const receipt = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: encode,
            });
            console.log('receipt', receipt);

            // Clear form fields after successful submission
            setName("");
            setUniqueId("")
            setSellPrice("");
            setBuyingPrice("");
            setErrorMessage("");

            setIsLoading(false)
            alert("Seller details added successfully!");
        } catch (error) {
            console.error("Error adding Seller details:", error);
            setErrorMessage(
                "Error adding Seller details. Please check the console for more information."
            );
        }
    };

    return (
        <div>
            <NavigationBar />

            <div className="page-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="title">Seller Details</h1>

                    <InputLabel>Unique Id</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        required
                        placeholder="Enter your Unique ID"
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

                    <InputLabel>Buying Price</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                        required
                        placeholder="Enter the buying price"
                    />

                    <InputLabel>Sell Price</InputLabel>
                    <input
                        type="text"
                        className="input"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        required
                        placeholder="Enter the sell price"
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default SellerDetailsForm;
