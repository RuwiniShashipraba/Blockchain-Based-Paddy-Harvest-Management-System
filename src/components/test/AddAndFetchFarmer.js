import React, {useEffect, useState} from "react";
import Web3 from "web3";
import {v4 as uuidv4} from "uuid"; // Import the UUID library
import CombinedContract from "../../contracts/CombinedContract.json";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";

const AddAndFetchFarmer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [farmerRecords, setFarmerRecords] = useState([]);
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

    const addFarmerRecordWithUniqueId = async () => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            const uniqueId = uuidv4(); // Generate a unique ID for the farmer input

            const farmerInput = {
                uniqueId: uniqueId,
                farmerId: "F001",
                fullName: "Jim Pappa",
                fAddress: "123 Main St",
                year: "2024",
                cropSeason: "Yala",
                culArea: "10",
                zone: "Wet",
                seed: "Samba",
                weightPaddy: "100",
                farmerSellPrice: "100",
                totalCost: "400",
                costPerKg: "4",
            };

            const gasEstimate = await contract.methods.addFarmerRecord(farmerInput).estimateGas({from: accounts[0]});
            const encode = await contract.methods.addFarmerRecord(farmerInput).encodeABI();

            const tx = await web3.eth.sendTransaction({
                from: accounts[0],
                to: COMBINED_CONTRACT_ADDRESS,
                gas: gasEstimate,
                data: encode,
            });

            console.log("Transaction receipt:", tx);
            alert("Farmer record stored on the blockchain successfully!");
        } catch (error) {
            console.error("Error storing farmer record on the blockchain:", error);
            if (error.message.includes("Transaction has been reverted by the EVM")) {
                alert("Transaction reverted. Check contract logic, gas limit, or other issues.");
            }
        }
    };

    const fetchFarmerRecords = async (farmerId) => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            const records = await contract.methods
                .getFarmerRecords(farmerId)
                .call();
            setFarmerRecords(records);
        } catch (error) {
            setErrorMessage("Error fetching farmer records. Farmer ID may not exist.");
            console.error("Error fetching farmer records:", error);
        }
    };

    return (
        <div>
            <h1>Add and Fetch Farmer Records</h1>
            <div>
                <button onClick={addFarmerRecordWithUniqueId}>
                    Add Farmer
                </button>
                <button onClick={() => fetchFarmerRecords("F001")}>
                    Fetch Farmer Records
                </button>
            </div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : farmerRecords.length > 0 ? (
                farmerRecords.map((record, index) => (
                    <div key={index}>
                        <h3>Record {index + 1}</h3>
                        <p>Farmer Input ID: {record.uniqueId}</p>
                        <p>Full Name: {record.fullName}</p>
                        <p>Address: {record.fAddress}</p>
                        <p>Year: {record.year}</p>
                        <p>Crop Season: {record.cropSeason}</p>
                        <p>Cultivated Area: {record.culArea}</p>
                        <p>Zone: {record.zone}</p>
                        <p>Seed: {record.seed}</p>
                        <p>Weight Paddy: {record.weightPaddy}</p>
                        <p>Farmer Sell Price: {record.farmerSellPrice}</p>
                        <p>Total Cost: {record.totalCost}</p>
                        <p>Cost per Kg: {record.costPerKg}</p>
                    </div>
                ))
            ) : (
                <p>No farmer records found for this ID.</p>
            )}
        </div>
    );
};

export default AddAndFetchFarmer;
