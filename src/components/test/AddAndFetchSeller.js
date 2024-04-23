import React, {useEffect, useState} from "react";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";

const AddAndFetchSeller = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [sellerRecords, setSellerRecords] = useState([]);
    const [millerRecords, setMillerRecords] = useState([]);
    const [farmerRecords, setFarmerRecords] = useState([]);
    const [uniqueId, setUniqueId] = useState(""); // Unique ID from Miller
    const [sellerId, setSellerId] = useState(""); // Seller ID
    const [errorMessage, setErrorMessage] = useState("");

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

    const addSellerRecord = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            if (!uniqueId) {
                alert("Please enter the unique ID from the Miller's record.");
                return;
            }

            if (!sellerId) {
                alert("Please enter your Seller ID.");
                return;
            }

            const sellerInput = {
                uniqueId,
                sellerId,
                sellerName: "Super Sellers",
                market: "Farmers Market",
                productType: "Grains",
            };

            const gasEstimate = await contract.methods
                .addSellerRecord(uniqueId, sellerInput)
                .estimateGas({from: accounts[0]});

            const tx = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: contract.methods.addSellerRecord(uniqueId, sellerInput).encodeABI(),
            });

            console.log("Transaction receipt:", tx);
            alert("Seller record stored on the blockchain successfully!");
        } catch (error) {
            console.error("Error storing seller record on the blockchain:", error);
        }
    };

    const fetchRecords = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            if (!sellerId) {
                alert("Please enter your Seller ID to fetch records.");
                return;
            }

            const response = await contract.methods
                .getRecordsBySellerId(sellerId)
                .call();

            console.log('response - ', response)
            setSellerRecords(response[0]);
            setFarmerRecords(response[1]);
            setMillerRecords(response[2]);
        } catch (error) {
            setErrorMessage("Error fetching records. Seller ID may not exist.");
            console.error("Error fetching records:", error);
        }
    };

    return (
        <div>
            <h1>Add and Fetch Seller Records</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Unique ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Seller ID"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                />
                <button onClick={addSellerRecord}>Add Seller Record</button>
                <button onClick={fetchRecords}>Fetch Records</button>
            </div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <>
                    <h2>Seller Records</h2>
                    {sellerRecords.length > 0 ? (
                        sellerRecords.map((record, index) => (
                            <div key={index}>
                                <h3>Record {index + 1}</h3>
                                <p>Seller Name: {record.sellerName}</p>
                                <p>Market: {record.market}</p>
                                <p>Product Type: {record.productType}</p>
                            </div>
                        ))
                    ) : (
                        <p>No seller records found.</p>
                    )}

                    <h2>Farmer Records</h2>
                    {farmerRecords.length > 0 ? (
                        farmerRecords.map((record, index) => (
                            <div key={index}>
                                <h3>Record {index + 1}</h3>
                                <p>Full Name: {record.fullName}</p>
                                <p>Weight of Paddy: {record.weightPaddy}</p>
                                {/* Add other farmer fields as needed */}
                            </div>
                        ))
                    ) : (
                        <p>No associated farmer records found.</p>
                    )}

                    <h2>Miller Records</h2>
                    {millerRecords.length > 0 ? (
                        millerRecords.map((record, index) => (
                            <div key={index}>
                                <h3>Record {index + 1}</h3>
                                <p>Miller Name: {record.millerName}</p>
                                <p>Location: {record.location}</p>
                                <p>Processing Type: {record.processingType}</p>
                            </div>
                        ))
                    ) : (
                        <p>No associated miller records found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AddAndFetchSeller;
