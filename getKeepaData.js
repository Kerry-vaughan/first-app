// getKeepaData.js

const fetch = require('node-fetch'); // Import node-fetch to make the API call

exports.handler = async function(event, context) {
    const asin = event.queryStringParameters.asin;

    console.log('Received ASIN:', asin);  // Log the ASIN to check if it’s being passed correctly

    if (!asin) {
        console.log('No ASIN provided');
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'ASIN is required' }),
        };
    }

    const accessKey = process.env.KEEPA_API_KEY;  // Use environment variable for your API key
    const domainId = 1;  // For US Amazon
    console.log('Using API Key:', accessKey);  // Log to check if the API key is being used correctly

    const apiURL = `https://api.keepa.com/product?key=${accessKey}&domain=${domainId}&asin=${asin}`;
    console.log('Making request to Keepa API with URL:', apiURL);  // Log the API URL to make sure it's correctly formed

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log('Received data from Keepa:', data);  // Log the data from Keepa

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error during API call:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API request failed' }),
        };
    }
};
