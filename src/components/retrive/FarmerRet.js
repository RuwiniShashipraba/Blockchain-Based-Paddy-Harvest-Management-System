import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import CombinedContract from '../../contracts/CombinedContract.json';
import QRCode from 'qrcode.react';
import {COMBINED_CONTRACT_ADDRESS} from '../../constants';
import {Box, Button, CircularProgress, Container, Paper, Typography} from '@material-ui/core';
import {Alert} from "@material-ui/lab";

const FarmerDetailsViewer = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [farmerDetails, setFarmerDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const _web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                setWeb3(_web3);
            } else {
                setErrorMessage('Please install MetaMask to use this application');
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
        const farmerId = 'F001'; // TODO: Get the actual farmer id
        if (contract && farmerId) {
            retrieveDetails(farmerId);
        }
    }, [contract]);

    const retrieveDetails = async (farmerId) => {
        setLoading(true);
        try {
            const records = await contract.methods.getFarmerRecords(farmerId).call();
            setFarmerDetails(records);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error retrieving details');
        } finally {
            setLoading(false);
        }
    };

    const formatFarmerDetailsForQRCode = (record) => {
        if (!farmerDetails.length) return '';
        return `
      Record ID: ${record.uniqueId}
      Farmer ID: ${record.farmerId}
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
        <Container>
            <Typography variant="h2">Farmer Details</Typography>
            {loading && <CircularProgress/>}
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
    );
};

export default FarmerDetailsViewer;
