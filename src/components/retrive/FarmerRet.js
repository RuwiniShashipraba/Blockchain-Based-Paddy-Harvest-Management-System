import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import FarmerDetailsContract from "../../contracts/FarmerDetails.json";
import QRCode from 'qrcode.react';

const FarmerDetailsViewer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [farmerName, setFarmerName] = useState('');
    const [farmerDetails, setFarmerDetails] = useState(null);
    const [millerDetails, setMillerDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize Web3 and contract
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const _web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                setWeb3(_web3);
            } else {
                console.error('Please install MetaMask to use this application');
            }                  
        };
        initWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            // Load contract
            const contractAddress = '0x189364e831d6f766fac878bccf6dbd2fc0dc54c8'; // Replace with your contract address
            const deployedContract = new web3.eth.Contract(FarmerDetailsContract.abi, contractAddress);
            setContract(deployedContract);
        }
    }, [web3]);

    // Function to handle input change
    const handleInputChange = (e) => {
        setFarmerName(e.target.value);
    };

    // Function to retrieve farmer and miller details
    const retrieveDetails = async () => {
        if (!contract || !farmerName) return;
    
        try {
            setLoading(true);
            const farmerDetails = await contract.methods.getFarmerDetailsByName(farmerName).call();
            const millerDetails = await contract.methods.getMillerDetailsByName(farmerName).call();

            setFarmerDetails(farmerDetails);
            setMillerDetails(millerDetails);
            setErrorMessage('');
        } catch (error) {
            console.error('Error retrieving details:', error);
            setErrorMessage('Error retrieving details');
        } finally {
            setLoading(false);
        }
    };

    // Format the retrieved farmer details for QR code display
    const formatFarmerDetailsForQRCode = () => {
        if (!farmerDetails) return '';
        const formattedDetails = `
            Full Name: ${farmerDetails[0]}
            Address: ${farmerDetails[1]}
            Year: ${farmerDetails[2]}
            Crop Season: ${farmerDetails[3]}
            Cultivated Area: ${farmerDetails[4]}
            Zone: ${farmerDetails[5]}
            Seed: ${farmerDetails[6]}
            Weight: ${farmerDetails[7]}
            Price: ${farmerDetails[8]}
            Total Cost: ${farmerDetails[9]}
            Cost Per Kg: ${farmerDetails[10]}
        `;
        return formattedDetails;
    };

    // Format the retrieved miller details
    const formatMillerDetails = () => {
        if (!millerDetails) return '';
        return (
            <div>
                <h3>Miller Details</h3>
                <p><strong>Full Name:</strong> {millerDetails[0]}</p>
                <p><strong>Address:</strong> {millerDetails[1]}</p>
                <p><strong>Cost:</strong> {millerDetails[2]}</p>
                <p><strong>Rice Weight:</strong> {millerDetails[3]}</p>
                <p><strong>Cost Per Kg:</strong> {millerDetails[4]}</p>
                <p><strong>Sell Price:</strong> {millerDetails[5]}</p>
                <p><strong>Experience:</strong> {millerDetails[6]}</p>
            </div>
        );
    };
    
    // Function to handle downloading QR code
    const handleDownloadQRCode = () => {
        const canvas = document.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'farmer_details_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Retrieve Farmer Details</h2>
            <label>Enter Farmer Name:</label>
            <input type="text" value={farmerName} onChange={handleInputChange} />
            <button onClick={retrieveDetails}>Retrieve Details</button>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {farmerDetails && (
                <div>
                    <h3>Farmer Details</h3>
                    <p><strong>Full Name:</strong> {farmerDetails[0]}</p>
                    <p><strong>Address:</strong> {farmerDetails[1]}</p>
                    <p><strong>Year:</strong> {farmerDetails[2]}</p>
                    <p><strong>Crop Season:</strong> {farmerDetails[3]}</p>
                    <p><strong>Cultivated Area:</strong> {farmerDetails[4]}</p>
                    <p><strong>Zone:</strong> {farmerDetails[5]}</p>
                    <p><strong>Seed:</strong> {farmerDetails[6]}</p>
                    <p><strong>Weight:</strong> {farmerDetails[7]}</p>
                    <p><strong>Price:</strong> {farmerDetails[7]}</p>

                    
                    <QRCode value={formatFarmerDetailsForQRCode()} />
                    <button onClick={handleDownloadQRCode}>Download QR Code</button>
                </div>
            )}
        </div>
    );
};

export default FarmerDetailsViewer;

