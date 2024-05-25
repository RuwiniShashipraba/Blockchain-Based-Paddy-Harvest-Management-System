import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import { COMBINED_CONTRACT_ADDRESS } from "../../constants";
import Footer from "../../components/frontPage/Footer";
import NavigationBar from "../../components/frontPage/NavigationBar";

const CustomerDetailsViewer = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [sellerRecords, setSellerRecords] = useState([]);
  const [millerRecords, setMillerRecords] = useState([]);
  const [farmerRecords, setFarmerRecords] = useState([]);
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const _web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(_web3);
        } else {
          console.error("Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then((response) => setAccounts(response));

      const contractInstance = new web3.eth.Contract(
        CombinedContract,
        COMBINED_CONTRACT_ADDRESS
      );
      setContract(contractInstance);
    }
  }, [web3]);

  const fetchRecordsByUniqueId = async () => {
    try {
      if (!contract) {
        console.error("Contract instance not found.");
        return;
      }

      const records = await contract.methods
        .getRecordsByUniqueId(uniqueId) // Use the uniqueId state
        .call();

      setMillerRecords(records[0]);
      setFarmerRecords(records[1]);
      setSellerRecords(records[2]);

      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      setErrorMessage("Error fetching records. Unique ID may not exist.");
      console.error("Error fetching records:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1>Fetch Customer Records</h1>
      <div>
        <input
          type="text"
          placeholder="Enter unique ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)} // Capture unique ID
        />
        <button onClick={fetchRecordsByUniqueId}>Fetch Customer Records</button>
      </div>

      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          {farmerRecords.length > 0 && (
            <div>
              <h2>Farmer Records</h2>
              {farmerRecords.map((record, index) => (
                <div key={index}>
                  <h3>Farmer Record {index + 1}</h3>
                  {/* <p>Unique ID: {record.uniqueId}</p> */}
                  <p>Full Name: {record.fullName}</p>
                  {/* <p>Address: {record.fAddress}</p> */}
                  <p>Year: {record.year}</p>
                  <p>Crop Season: {record.cropSeason}</p>
                  {/* <p>Cultivated Area: {record.culArea}</p> */}
                  <p>Zone: {record.zone}</p>
                  <p>Seed: {record.seed}</p>
                  {/* <p>Weight Paddy: {record.weightPaddy}</p> */}
                  <p>Farmer Sell Price: {record.farmerSellPrice}</p>
                </div>
              ))}
            </div>
          )}

          {millerRecords.length > 0 && (
            <div>
              <h2>Miller Records</h2>
              {millerRecords.map((record, index) => (
                <div key={index}>
                  <h3>Miller Record {index + 1}</h3>
                  {/* <p>Unique ID: {record.uniqueId}</p> */}
                  <p>Miller Name: {record.millerName}</p>
                  {/* <p>Production Cost: {record.productionCost}</p> */}
                  {/* <p>Rice Weight: {record.riceWeight}</p> */}
                  <p>Expiry Date: {record.expiryDate}</p>
                  <p>Manufacture Date: {record.manufactureDate}</p>
                  <p>Production Cost per Kg: {record.costPerKg}</p>
                  <p>Buying Price: {record.buyingPrice}</p>
                </div>
              ))}
            </div>
          )}

          {sellerRecords.length > 0 && (
            <div>
              <h2>Seller Records2</h2>
              {sellerRecords.map((record, index) => (
                <div key={index} style={{ paddingBottom: "40px" }}>
                  <h3>Seller Record {index + 1}</h3>
                  {/* <p>Unique ID: {record.uniqueId}</p> */}
                  <p>Seller Name: {record.sellerName}</p>
                  <p>Buying Price: {record.buyingPrice}</p>
                  <p>Selling Price: {record.sellingPrice}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default CustomerDetailsViewer;
