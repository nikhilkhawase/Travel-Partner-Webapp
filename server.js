const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

const apiKey = 'KcTuOaDUDT7Ty7CryQjDWTF92Jj43wnE'; // Your Amadeus API key

// Helper function to log and respond to errors
function handleError(res, error) {
    console.error('Error Message:', error.message);
    if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
    }
    res.status(500).send('Error fetching data');
}

// Endpoint for flight offers
app.get('/api/flight-offers', async (req, res) => {
    const { origin, destination, departureDate, adults = 1, nonStop = false, max = 250 } = req.query;
    const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonStop}&max=${max}`;
    console.log('Requesting Flight Offers:', apiUrl);

    try {
        const response = await axios.get(apiUrl, { headers: { 'Authorization': `Bearer ${apiKey}` } });
        console.log('Response:', response.data);
        res.json(response.data);
    } catch (error) {
        handleError(res, error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
