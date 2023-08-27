import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Card from './components/Card';
import Landprep from './components/Landprep';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Card />} />
                <Route path="/Landprep" element={<Landprep />} />
            </Routes>
        </Router>
    );
}

export default App;








