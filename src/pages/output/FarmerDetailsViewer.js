import React, {useContext, useEffect, useState} from 'react';
import Web3 from 'web3';
import CombinedContract from '../../contracts/CombinedContract.json';
import QRCode from 'qrcode.react';
import {COMBINED_CONTRACT_ADDRESS} from '../../constants';
import {Box, Button, Container, Paper, Typography} from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import Footer from "../../components/frontPage/Footer";
import NavigationBar from "../../components/frontPage/NavigationBar";
import {MainContext} from "../../context/MainContext";

const FarmerDetailsViewer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [farmerDetails, setFarmerDetails] = useState([]);
    const [millerRecords, setMillerRecords] = useState([]);
    const [sellerRecords, setSellerRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {userId} = useContext(MainContext)

    useEffect(() => {
        console.log('Initializing Web3')
        const initWeb3 = async () => {
            if (window.ethereum) {
                const _web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                if (web3 !== _web3) {
                    setWeb3(_web3);
                }
            } else {
                setErrorMessage("Please install MetaMask");
            }
        };
        initWeb3();
    }, []);

    useEffect(() => {
        console.log("Web3 set, setting contract");
        if (web3) {
            const deployedContract = new web3.eth.Contract(CombinedContract, COMBINED_CONTRACT_ADDRESS);
            setContract(deployedContract);
            return () => {
                deployedContract.removeAllListeners();
            };
        }
    }, [web3]);

    useEffect(() => {
        if (contract) {
            console.log("Contract set, retrieving details");
            const farmerId = userId;
            if (farmerId && contract) {
                retrieveDetails(farmerId);
            }
        }
    }, [contract, userId]);

    const retrieveDetails = async (farmerId) => {
        console.log("Retrieving details");
        try {
            console.log('Getting Farmer Details')
            const response = await contract.methods.getFarmerRecords(farmerId).call();
            console.log('response', response);
            setFarmerDetails(response[0]);
            setSellerRecords(response[1])
            setMillerRecords(response[2])
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error retrieving details');
        }
    };

    const formatFarmerDetailsForQRCode = (record) => {
        if (!farmerDetails.length) return '';
        return `
      Record ID: ${record.uniqueId}
      Full Name: ${record.fullName}
      Address: ${record.fAddress}
      Year: ${record.year}
      Crop Season: ${record.cropSeason}
      Cultivated Area: ${record.culArea}
      Zone: ${record.zone}
      Seed: ${record.seed}
      Weight: ${record.weightPaddy}
      Price: ${record.farmerSellPrice}
      Total Cost: ${record.totalCost}
      Cost Per Kg: ${record.costPerKg}
    `;
    };

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
        <>
            <NavigationBar/>
            <Container style={{marginTop: "10%", marginBottom: "10%"}}>
                <Typography variant="h2">Farmer Details</Typography>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {farmerDetails.length ? (
                    farmerDetails.map((record, index) => (
                        <Paper key={index} style={{padding: '20px', margin: '20px 0'}}>
                            <Typography variant="h3">Record {index + 1}</Typography>
                            <Typography><strong>Record ID:</strong> {record.uniqueId}</Typography>
                            <Typography><strong>Farmer ID:</strong> {record.farmerId}</Typography>
                            <Typography><strong>Full Name:</strong> {record.fullName}</Typography>
                            <Typography><strong>Address:</strong> {record.fAddress}</Typography>
                            <Typography><strong>Year:</strong> {record.year}</Typography>
                            <Typography><strong>Crop Season:</strong> {record.cropSeason}</Typography>
                            <Typography><strong>Cultivated Area:</strong> {record.culArea}</Typography>
                            <Typography><strong>Zone:</strong> {record.zone}</Typography>
                            <Typography><strong>Seed:</strong> {record.seed}</Typography>
                            <Typography><strong>Paddy Weight:</strong> {record.weightPaddy}</Typography>
                            <Typography><strong>Farmer Sell Price:</strong> {record.farmerSellPrice}</Typography>
                            <Typography><strong>Total Cost:</strong> {record.totalCost}</Typography>
                            <Typography><strong>Cost Per KG:</strong> {record.costPerKg}</Typography>
                            <h4>Associated Miller Records:</h4>
                            {millerRecords.length > 0 ? (
                                millerRecords.map((millerRecord, i) => (
                                    <div key={i}>
                                        <p>Miller Name: {millerRecord.millerName}</p>
                                        <p>Production Cost: {millerRecord.productionCost}</p>
                                        <p>Rice Weight: {millerRecord.riceWeight}</p>
                                        <p>Expiry Date: {millerRecord.expiryDate}</p>
                                        <p>Manufacture Date: {millerRecord.manufactureDate}</p>
                                        <p>Cost per kg: {millerRecord.costPerKg}</p>
                                        <p>Buying Price: {millerRecord.buyingPrice}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No associated miller records found.</p>
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
                            <Box mt={2}>
                                <QRCode value={formatFarmerDetailsForQRCode(record)}/>
                            </Box>

                            <Button variant="contained" color="primary" onClick={handleDownloadQRCode}>
                                Download QR Code
                            </Button>
                        </Paper>
                    ))
                ) : (
                    <Typography>No farmer records found</Typography>
                )}
            </Container>
            <Footer/>
        </>
    );
};

export default FarmerDetailsViewer;
