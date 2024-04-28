import React, {useContext, useEffect, useState} from 'react';
import Web3 from 'web3';
import CombinedContract from '../../contracts/CombinedContract.json';
import {COMBINED_CONTRACT_ADDRESS} from '../../constants';
import QRCode from 'qrcode.react';
import NavigationBar from "../../components/frontPage/NavigationBar";
import Footer from "../../components/frontPage/Footer";
import {MainContext} from "../../context/MainContext"; // Import QRCode component

const MillerDetailsViewer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [millerRecords, setMillerRecords] = useState([]);
    const [farmerRecords, setFarmerRecords] = useState([]);
    const [sellerRecords, setSellerRecords] = useState([]);
    const {userId, setIsLoading} = useContext(MainContext)

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
            const deployedContract = new web3.eth.Contract(CombinedContract, COMBINED_CONTRACT_ADDRESS);
            setContract(deployedContract);
        }
    }, [web3]);

    useEffect(() => {
        const millerId = userId;
        if (contract && millerId) {
            retrieveMillerDetails(millerId);
        }
    }, [contract]);

    // Function to retrieve miller details
    const retrieveMillerDetails = async (millerId) => {

        if (!contract || !millerId) return;

        try {
            console.log('Getting Miller Details for ' + millerId)
            const response = await contract.methods.getRecordsByMillerId(millerId).call();

            setMillerRecords(response[0]);
            setFarmerRecords(response[1]);
            setSellerRecords(response[2]);
            setErrorMessage('');
        } catch (error) {
            console.error('Error retrieving miller details:', error);
            setErrorMessage('Error retrieving miller details');
        }
    };

    // Format the retrieved details for QR code display
    const formatDetailsForQRCode = (record) => {
        if (!record) return '';
        return `Unique Id from QR: ${record.uniqueId}
        Full Name: ${record.millerName}
Production Cost: ${record.productionCost}
Rice Weight: ${record.riceWeight}
Expiry Date: ${record.expiryDate}
Manufacture Date: ${record.manufactureDate}
Cost per kg: ${record.costPerKg}
Buying Price: ${record.buyingPrice}`;
    };

    // Function to download QR code
    const handleDownloadQRCode = () => {
        const canvas = document.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'miller_details_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <NavigationBar/>
            <h2>Miller Details</h2>
            {errorMessage && <p>{errorMessage}</p>}
            {millerRecords.length > 0 ? (
                millerRecords.map((record, index) => (
                    <div key={index}>
                        <h3>Record {index + 1}</h3>
                        <p>Unique ID: {record.uniqueId}</p>
                        <p>Miller Name: {record.millerName}</p>
                        <p>Production Cost: {record.productionCost}</p>
                        <p>Rice Weight: {record.riceWeight}</p>
                        <p>Expiry Date: {record.expiryDate}</p>
                        <p>Manufacture Date: {record.manufactureDate}</p>
                        <p>Cost per kg: {record.costPerKg}</p>
                        <p>Buying Price: {record.buyingPrice}</p>
                        <h4>Associated Farmer Records:</h4>
                        {farmerRecords.length > 0 ? (
                            farmerRecords.map((farmerRecord, i) => (
                                <div key={i}>
                                    <p>Full Name: {farmerRecord.fullName}</p>
                                    <p>Seed Type: {farmerRecord.seed}</p>
                                    <p>Cost per kg: {farmerRecord.costPerKg}</p>
                                    <p>Paddy Weight: {farmerRecord.weightPaddy}</p>
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
                                    <p>Buying Price: {sellerRecord.buyingPrice}</p>
                                    <p>Selling Price: {sellerRecord.sellingPrice}</p>
                                </div>
                            ))
                        ) : (
                            <p>No associated seller records found.</p>
                        )}
                        <QRCode value={formatDetailsForQRCode(record)}/>
                        <button onClick={handleDownloadQRCode}>Download QR Code</button>
                    </div>
                ))
            ) : (
                <p>No miller records found.</p>
            )}
            <Footer/>
        </div>
    );
};

export default MillerDetailsViewer;
