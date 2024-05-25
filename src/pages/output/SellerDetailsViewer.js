import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import { COMBINED_CONTRACT_ADDRESS, HOSTED_URL } from "../../constants";
import QRCode from "qrcode.react";
import NavigationBar from "../../components/frontPage/NavigationBar";
import Footer from "../../components/frontPage/Footer";
import { MainContext } from "../../context/MainContext";

const SellerDetailsViewer = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [millerRecords, setMillerRecords] = useState([]);
  const [farmerRecords, setFarmerRecords] = useState([]);
  const [sellerRecords, setSellerRecords] = useState([]);
  const { userId, setIsLoading } = useContext(MainContext);

  // Initialize Web3 and contract
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(_web3);
      } else {
        console.error("Please install MetaMask to use this application");
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
    const sellerId = userId;
    if (contract && sellerId) {
      retrieveSellerDetails(sellerId);
    }
  }, [contract]);

  // Function to retrieve seller details
  const retrieveSellerDetails = async (sellerId) => {
    if (!contract || !sellerId) return;

    try {
      console.log("Getting Seller Details by id - ", sellerId);
      const response = await contract.methods
        .getRecordsBySellerId(sellerId)
        .call();
      console.log("response", response);

      setSellerRecords(response[0]);
      setFarmerRecords(response[1]);
      setMillerRecords(response[2]);
      setErrorMessage("");
    } catch (error) {
      console.error("Error retrieving miller details:", error);
      setErrorMessage("Error retrieving seller details");
    }
  };

  // Format the retrieved details for QR code display
  const formatDetailsForQRCode = (record) => {
    if (!record) return "";
    return `
        Unique Id from QR: ${record.uniqueId}
        Site URL: ${HOSTED_URL}`;
  };

  // Function to download QR code
  const handleDownloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "miller_details_qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: "10%", marginBottom: "10%" }}>
        <h2>Seller Details</h2>
        {errorMessage && <p>{errorMessage}</p>}
        {sellerRecords.length > 0 ? (
          sellerRecords.map((record, index) => (
            <div key={index}>
              <h3>Record {index + 1}</h3>
              <p>Unique ID: {record.uniqueId}</p>
              <p>Seller Name: {record.sellerName}</p>
              <p>Buying Price: {record.buyingPrice}</p>
              <p>Selling Price: {record.sellingPrice}</p>
              <h4>Associated Farmer Records:</h4>
              {farmerRecords.length > 0 &&
              farmerRecords.find((m) => m.uniqueId === record.uniqueId) ? (
                farmerRecords.map((farmerRecord, i) => {
                  if (farmerRecord.uniqueId === record.uniqueId) {
                    return (
                      <div key={i}>
                        <p>Full Name: {farmerRecord.fullName}</p>
                        <p>Seed Type: {farmerRecord.seed}</p>
                        <p>Cost per kg: {farmerRecord.costPerKg}</p>
                        <p>Paddy Weight: {farmerRecord.weightPaddy}</p>
                      </div>
                    );
                  }
                })
              ) : (
                <p>No associated farmer records found.</p>
              )}
              <h4>Associated Miller Records:</h4>
              {millerRecords.length > 0 &&
              millerRecords.find((m) => m.uniqueId === record.uniqueId) ? (
                millerRecords.map((millerRecord, i) => {
                  if (millerRecord.uniqueId === record.uniqueId) {
                    return (
                      <div key={i}>
                        <p>Miller Name: {millerRecord.millerName}</p>
                        <p>Production Cost: {millerRecord.productionCost}</p>
                        <p>Rice Weight: {millerRecord.riceWeight}</p>
                        <p>Expiry Date: {millerRecord.expiryDate}</p>
                        <p>Manufacture Date: {millerRecord.manufactureDate}</p>
                        <p>Cost per kg: {millerRecord.costPerKg}</p>
                        <p>Buying Price: {millerRecord.buyingPrice}</p>
                      </div>
                    );
                  }
                })
              ) : (
                <p>No associated miller records found.</p>
              )}
              <QRCode value={formatDetailsForQRCode(record)} />
              <button onClick={handleDownloadQRCode}>Download QR Code</button>
            </div>
          ))
        ) : (
          <p>No Seller records found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SellerDetailsViewer;
