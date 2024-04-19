import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { InputLabel, Button } from "@material-ui/core";
import "../../styles/miller.css";
import FarmerDetailsContract from "../../contracts/FarmerDetails.json";
import NavigationBar from "../FrontPage/NavigationBar";
import Footer from "../FrontPage/Footer";

const MillerDetailsForm = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [mAddress, setMAddress] = useState("");
  const [cost, setCost] = useState("");
  const [riceWeight, setRiceWeight] = useState("");
  const [costPerKg, setCostPerKg] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [exp, setExp] = useState("");
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
          cost,
          riceWeight,
          costPerKg,
          sellPrice,
          exp
        )
        .send({ from: accounts[0] });
      // Clear form fields after successful submission
      setName("");
      setMAddress("");
      setCost("");
      setRiceWeight("");
      setCostPerKg("");
      setSellPrice("");
      setExp("");
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
      {/* <h2>Add Miller Details</h2>
            <form onSubmit={handleSubmit}> */}
      {/* <div>
                    <label>Full Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={mAddress} onChange={(e) => setMAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Cost:</label>
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required />
                </div>
                <div>
                    <label>Rice Weight:</label>
                    <input type="text" value={riceWeight} onChange={(e) => setRiceWeight(e.target.value)} required />
                </div>
                <div>
                    <label>Cost Per Kg:</label>
                    <input type="text" value={costPerKg} onChange={(e) => setCostPerKg(e.target.value)} required />
                </div>
                <div>
                    <label>Sell Price:</label>
                    <input type="text" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Expiry Date:</label>
                    <input type="text" value={exp} onChange={(e) => setExp(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form> */}
      <div className="page-container">
        <form className="form">
          <h1 className="title">Miller Details</h1>
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
          <InputLabel>Cost</InputLabel>
          <input
            type="text"
            className="input"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            placeholder="Enter the cost"
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
          <InputLabel>Cost Per Kg</InputLabel>
          <input
            type="text"
            className="input"
            value={costPerKg}
            onChange={(e) => setCostPerKg(e.target.value)}
            required
            placeholder="Enter the cost per Kg"
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
          <InputLabel>Expiry Data</InputLabel>
          <input
            type="text"
            className="input"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            required
            placeholder="Enter the expiry data"
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default MillerDetailsForm;
