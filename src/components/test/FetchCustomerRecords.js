import React, {useEffect, useState} from "react";
import Web3 from "web3";
import CombinedContract from "../../contracts/CombinedContract.json";
import {COMBINED_CONTRACT_ADDRESS} from "../../constants";

const FetchCustomerRecords = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [customerRecords, setCustomerRecords] = useState([]);
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

    const fetchRecordsByUniqueId = async (uniqueId) => {
        try {
            if (!contract) {
                console.error("Contract instance not found.");
                return;
            }

            const farmerRecords = await contract.methods
                .getFarmerRecords(uniqueId)
                .call();

            const millerRecords = await contract.methods
                .getMillerRecords(uniqueId)
                .call();

            const sellerRecords = await contract.methods
                .getSellerRecords(uniqueId)
                .call();

            setCustomerRecords([...farmerRecords, ...millerRecords, ...sellerRecords]);
        } catch (error) {
            setErrorMessage("Error fetching records. Unique ID may not exist.");
            console.error("Error fetching records:", error);
        }
    };

    return (
        <div>
            <h1>Fetch Customer Records</h1>
            <div>
                <button onClick={() => fetchRecordsByUniqueId("123")}>
                    Fetch Customer Records
                </button>
            </div>
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : customerRecords.length > 0 ? (
                customerRecords.map((record, index) => (
                    <div key={index}>
                        <h3>Record {index + 1}</h3>
                        <p>Unique ID: {record.uniqueId}</p>
                        <p>Full Name: {record.fullName || ''}</p>
                        <p>Address: {record.fAddress || ''}</p>
                        <p>Year: {record.year || ''}</p>
                        <p>Crop Season: {record.cropSeason || ''}</p>
                        <p>Cultivated Area: {record.culArea || ''}</p>
                        <p>Zone: {record.zone || ''}</p>
                        <p>Seed: {record.seed || ''}</p>
                        <p>Weight Paddy: {record.weightPaddy || ''}</p>
                        <p>Farmer Sell Price: {record.farmerSellPrice || ''}</p>
                        <p>Total Cost: {record.totalCost || ''}</p>
                        <p>Cost per Kg: {record.costPerKg || ''}</p>
                        <p>Miller Name: {record.millerName || ''}</p>
                        <p>Location: {record.location || ''}</p>
                        <p>Processing Type: {record.processingType || ''}</p>
                        <p>Seller Name: {record.sellerName || ''}</p>
                        <p>Market: {record.market || ''}</p>
                        <p>Product Type: {record.productType || ''}</p>
                    </div>
                ))
            ) : (
                <p>No records found for this unique ID.</p>
            )}
        </div>
    );
};

export default FetchCustomerRecords;
