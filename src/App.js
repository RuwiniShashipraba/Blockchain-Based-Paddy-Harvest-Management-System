import React, {useContext} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {MainContext} from "./context/MainContext";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import OptionSelection from "./components/option/OptionSelection";
import InputSelection from "./components/input/InputSelection";
import RetriveSelection from "./components/retrieve/RetriveSelection";
import Farmer from "./pages/input/Farmer";
import CustomerDetailsViewer from "./pages/output/CustomerDetailsViewer";
import MillerDetailsViewer from "./pages/output/MillerDetailsViewer";
import MillerDetailsForm from "./pages/input/Miller";
import SellerDetailsForm from "./pages/input/Seller";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import GetFarmerDetails from "./pages/output/FarmerDetailsViewer";
import SellerDetailsViewer from "./pages/output/SellerDetailsViewer";
import Loader from "./components/common/Loader";

function App() {
    const {isUserLoggedIn, isLoading} = useContext(MainContext);

    return (
        <Router>
            {isLoading ? (
                <Loader/>
            ) : (
                <Routes>
                    {isUserLoggedIn ? (
                        <>
                            <Route path="/" element={<OptionSelection/>}/>
                            <Route path="/inputSelection" element={<InputSelection/>}/>
                            <Route path="/retrieveselection" element={<RetriveSelection/>}/>
                            <Route path="/farmer-page" element={<Farmer/>}/>
                            <Route path="/farmer-ret" element={<GetFarmerDetails/>}/>
                            <Route path="/customer" element={<CustomerDetailsViewer/>}/>
                            <Route path="/miller-ret" element={<MillerDetailsViewer/>}/>
                            <Route path="/seller-ret" element={<SellerDetailsViewer/>}/>
                            <Route path="/miller-form" element={<MillerDetailsForm/>}/>
                            <Route path="/seller-form" element={<SellerDetailsForm/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            )}
        </Router>
    );
}

export default App;
