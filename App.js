// src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data from backend', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>AI Crop Disease Management</h1>
        </div>
    );
};

export default App;
