import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginBody from "./components/login/LoginBody";
import SignUp from "./components/SignUp";
import Card from "./components/Card";
import Landprep from "./components/Landprep";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginBody/>}/>
                <Route path="/card" element={<Card/>}/>
                <Route path="/landPrep" element={<Landprep/>}/>
                <Route path="/" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

export default App;








