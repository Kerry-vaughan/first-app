// Add an event listener to the submit button
document.getElementById('submitBtn').addEventListener('click', async function() {
    const userInput = document.getElementById('userInput').value;

    if (!userInput) {
        alert('Please enter an ASIN');
        return;
    }

    // Call the serverless function on Netlify (instead of Keepa API directly)
    const apiURL = `/.netlify/functions/getKeepaData?asin=${userInput}`;

    try {
        const response = await fetch(apiURL);

        if (response.ok) {
            const data = await response.json();

            // Log the data to see the API response structure
            console.log('API Response:', data);

            // Extract referralFeePercentage and pickAndPackFee from the response
            const productInfo = data.products[0];  // Access the first product's data

            // Format the referral fee and pick and pack fee
            const referralFeePercentage = productInfo.referralFeePercentage 
                ? `${productInfo.referralFeePercentage}%` 
                : 'Not available';

            const pickAndPackFee = productInfo.fbaFees?.pickAndPackFee 
                ? `$${(productInfo.fbaFees.pickAndPackFee / 100).toFixed(2)}` 
                : 'Not available';

            // Update the HTML with the results
            document.getElementById('number1').textContent = referralFeePercentage;
            document.getElementById('number2').textContent = pickAndPackFee;
        } else {
            alert('Failed to retrieve data from the server');
        }
    } catch (error) {
        console.error('Error details:', error);
        alert('An error occurred while making the API call');
    }
});
