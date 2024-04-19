import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { InputLabel, Button } from "@material-ui/core";
import "../../styles/miller.css";
import FarmerDetailsContract from "../../contracts/FarmerDetails.json";
import NavigationBar from "../FrontPage/NavigationBar";
import Footer from "../FrontPage/Footer";

const SellerDetailsForm = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [mAddress, setMAddress] = useState("");
  //   const [cost, setCost] = useState("");
  //   const [riceWeight, setRiceWeight] = useState("");
  //   const [costPerKg, setCostPerKg] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  //   const [exp, setExp] = useState("");
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
      // Load contract
      const contractAddress = "0x189364e831d6f766fac878bccf6dbd2fc0dc54c8"; // Replace with your contract address
      const deployedContract = new web3.eth.Contract(
        FarmerDetailsContract.abi,
        contractAddress
      );
      setContract(deployedContract);
    }
  }, [web3]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      setErrorMessage(
        "Contract not loaded. Please wait for the contract to load."
      );
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setErrorMessage(
          "No account found in MetaMask. Please make sure you have an Ethereum account connected."
        );
        return;
      }

      await contract.methods
        .addMillerDetails(
          name,
          mAddress,

          buyingPrice,
          sellPrice
        )
        .send({ from: accounts[0] });
      // Clear form fields after successful submission
      setName("");
      setMAddress("");

      setSellPrice("");
      setBuyingPrice("");

      setErrorMessage("");
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
      <NavigationBar />

      <div className="page-container">
        <form className="form">
          <h1 className="title">Seller Details</h1>
          <InputLabel>Full Name</InputLabel>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />

          <InputLabel>Address</InputLabel>
          <input
            type="text"
            className="input"
            value={mAddress}
            onChange={(e) => setMAddress(e.target.value)}
            required
            placeholder="Enter your address"
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
          <InputLabel>Buying Price</InputLabel>
          <input
            type="text"
            className="input"
            value={buyingPrice}
            onChange={(e) => setBuyingPrice(e.target.value)}
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
