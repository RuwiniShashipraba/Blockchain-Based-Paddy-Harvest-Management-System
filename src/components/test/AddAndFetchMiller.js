import React, {useEffect, useState} from "react";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";

const AddAndFetchMiller = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [millerRecords, setMillerRecords] = useState([]);
    const [sellerRecords, setSellerRecords] = useState([]);
    const [farmerRecords, setFarmerRecords] = useState([]);
    const [uniqueId, setUniqueId] = useState("");
    const [millerId, setMillerId] = useState(""); // Miller's unique ID
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

    const addMillerRecord = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            if (!uniqueId) {
                alert("Please enter the unique ID from the Farmer's record.");
                return;
            }

            if (!millerId) {
                alert("Please enter your Miller ID.");
                return;
            }

            const millerInput = {
                uniqueId, // Unique ID from the Farmer's record
                millerId,
                millerName: "Mill Masters",
                location: "Downtown",
                processingType: "Dry Milling",
            };

            const gasEstimate = await contract.methods.addMillerRecord(millerInput).estimateGas({from: accounts[0]});
            const encode = await contract.methods.addMillerRecord(millerInput).encodeABI();

            const tx = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: encode,
            });

            console.log("Transaction receipt:", tx);
            alert("Miller record stored on the blockchain successfully!");
        } catch (error) {
            console.error("Error storing miller record on the blockchain:", error);
        }
    };

    const fetchMillerRecords = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            if (!millerId) {
                alert("Please enter your Miller ID.");
                return;
            }

            // const {millerRecords, farmerRecords, sellerRecords} = await contract.methods
            const response = await contract.methods
                .getRecordsByMillerId(millerId)
                .call();

            console.log("Miller, Farmer, and Seller records:", {millerRecords, farmerRecords, sellerRecords});

            setMillerRecords(response[0]);
            setFarmerRecords(response[1]);
            setSellerRecords(response[2]);
            // Add logic to display all records if needed
        } catch (error) {
            setErrorMessage("Error fetching records. Miller ID may not exist.");
            console.error("Error fetching records:", error);
        }
    };

    return (
        <div>
            <h1>Add and Fetch Miller Records</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Farmer's Unique ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Your Miller ID"
                    value={millerId}
                    onChange={(e) => setMillerId(e.target.value)}
                />
                <button onClick={addMillerRecord}>
                    Add Miller Record
                </button>
                <button onClick={fetchMillerRecords}>
                    Fetch Records
                </button>
            </div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <>
                    {millerRecords.length > 0 ? (
                        millerRecords.map((record, index) => (
                            <div key={index}>
                                <h3>Record {index + 1}</h3>
                                <p>Miller Name: {record.millerName}</p>
                                <p>Location: {record.location}</p>
                                <p>Processing Type: {record.processingType}</p>
                                <h4>Associated Farmer Records:</h4>
                                {farmerRecords.length > 0 ? (
                                    farmerRecords.map((farmerRecord, i) => (
                                        <div key={i}>
                                            <p>Full Name: {farmerRecord.fullName}</p>
                                            {/* Add other farmer record fields as needed */}
                                        </div>
                                    ))
                                ) : (
                                    <p>No associated farmer records found.</p>
                                )}
                                <h4>Associated Seller Records:</h4>
                                {sellerRecords.length > 0 ? (
                                    sellerRecords.map((sellerRecord, i) => (
                                        <div key={i}>
                                            <p>Seller Name: {sellerRecord.sellerName}</p>
                                            {/* Add other seller record fields as needed */}
                                        </div>
                                    ))
                                ) : (
                                    <p>No associated seller records found.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No records found for this Miller ID.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AddAndFetchMiller;
