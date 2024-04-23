import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SellerDetailsForm from "./components/input/seller";
import MillerDetailsForm from "./components/input/miller";
import MillerDetailsViewer from "./components/retrive/millerRet";
import FarmerRet from "./components/retrive/FarmerRet";
import Farmer from "./components/input/farmer";
import InputSelection from "./components/input/InputSelection";
import RetriveSelection from "./components/retrive/RetriveSelection";
import OptionSelection from "./components/option/OptionSelection";
import SignUp from "./components/sign/SignUp";
import LoginBody from "./components/login/LoginBody";
import FrontPage from "./components/FrontPage/FrontPage";
import FetchCustomerRecords from "./components/retrive/FetchCustomerRecords";
import MainProvider from "./context/MainContext";


function App() {
    return (
        <MainProvider>
            <Router>
                <Routes>
                    {/*<Route path="/" element={<Navigate to="/farmer" />} />*/}
                    {/*<Route path='/farmer' element={<AddAndFetchFarmer/>}/>*/}
                    {/*<Route path='/miller' element={<AddAndFetchMiller/>}/>*/}
                    {/*<Route path='/seller' element={<AddAndFetchSeller/>}/>*/}
                    <Route path='/' element={<FrontPage/>}/>
                    <Route path="/login" element={<LoginBody/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/optionselection" element={<OptionSelection/>}/>
                    <Route path='/inputselection' element={<InputSelection/>}/>
                    <Route path='/retrieveselection' element={<RetriveSelection/>}/>
                    <Route path='/farmer-page' element={<Farmer/>}/>
                    <Route path='/farmer-ret' element={<FarmerRet/>}/>
                    <Route path='/customer' element={<FetchCustomerRecords/>}/>
                    <Route path='/miller-ret' element={<MillerDetailsViewer/>}/>
                    <Route path='/miller-form' element={<MillerDetailsForm/>}/>
                    <Route path='/seller-form' element={<SellerDetailsForm/>}/>
                </Routes>
            </Router>
        </MainProvider>
    );
}

export default App;
