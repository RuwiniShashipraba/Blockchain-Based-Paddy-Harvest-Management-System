import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Firstpage from './components/FrontPage/FrontPage.js';
import LoginBody from './components/login/LoginBody.js';
import SignUp from './components/sign/SignUp.js';
import OptionSelection from './components/option/OptionSelection.js';
import InputSelection from './components/input/InputSelection.js';
import RetriveSelection from './components/retrive/RetriveSelection.js';
import Farmer from './components/input/farmer.js';
import MillerDetailsForm from './components/input/miller.js';
import FarmerRet from './components/retrive/FarmerRet.js';
import MillerDetailsViewer from './components/retrive/millerRet.js';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Firstpage />} />
                <Route path="/login" element={<LoginBody />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/optionselection" element={<OptionSelection />} />
                <Route path='/inputselection' element={<InputSelection />} />
                <Route path='/retrieveselection' element={<RetriveSelection />} />
                <Route path='/farmer-page' element={<Farmer/>} />
                <Route path='/farmer-ret' element={<FarmerRet/>} />
                <Route path='/miller-ret' element={<MillerDetailsViewer/>} />
                <Route path='/miller-form' element={<MillerDetailsForm/>} />

            </Routes>
        </Router>
    );
}

export default App;
