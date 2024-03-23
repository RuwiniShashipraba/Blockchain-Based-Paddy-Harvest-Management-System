import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Web3 from 'web3';
import FarmerDetailsContract from "../../contracts/FarmerDetails.json";
import QRCode from 'qrcode.react'; // Import QRCode component

const MillerDetailsViewer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [farmerName, setFarmerName] = useState('');
    const [retrievedDetails, setRetrievedDetails] = useState(null);
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

    // Function to retrieve farmer details
    const retrieveFarmerDetails = async () => {
        if (!contract || !farmerName) return;
    
        try {
            setLoading(true);
            const details = await contract.methods.getFarmerDetailsByName(farmerName).call();

            setRetrievedDetails(details);
            setErrorMessage('');
        } catch (error) {
            console.error('Error retrieving farmer details:', error);
            setErrorMessage('Error retrieving farmer details');
        } finally {
            setLoading(false);
        }
    };

    // Format the retrieved details for QR code display
    const formatDetailsForQRCode = () => {
        if (!retrievedDetails) return '';
        const formattedDetails = `
            Full Name: ${retrievedDetails[0]}
            Year: ${retrievedDetails[2]}
            Crop Season: ${retrievedDetails[3]}
            Seed: ${retrievedDetails[6]}
            Weight: ${retrievedDetails[7]}
            Price: ${retrievedDetails[8]}
            Total Cost: ${retrievedDetails[9]}
            Cost Per Kg: ${retrievedDetails[10]}
        `;
        return formattedDetails;
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
            <button onClick={retrieveFarmerDetails}>Retrieve Details</button>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {retrievedDetails && (
                <div>
                    <h3>Farmer Details</h3>
                    <p><strong>Full Name:</strong> {retrievedDetails[0]}</p>
                    <p><strong>Year:</strong> {retrievedDetails[2]}</p>
                    <p><strong>Crop Season:</strong> {retrievedDetails[3]}</p>
                    <p><strong>Seed:</strong> {retrievedDetails[6]}</p>
                    <p><strong>Weight:</strong> {retrievedDetails[7]}</p>
                    <p><strong>Price:</strong> {retrievedDetails[8]}</p>
                    <p><strong>Total Cost:</strong> {retrievedDetails[9]}</p>
                    <p><strong>Cost Per Kg:</strong> {retrievedDetails[10]}</p>
                    
                    <QRCode value={formatDetailsForQRCode()} />
                    <button onClick={handleDownloadQRCode}>Download QR Code</button>

                    {/* Add a Link for navigation */}
                    <Link to="/miller-form">
                        <button>Proceed</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MillerDetailsViewer;

