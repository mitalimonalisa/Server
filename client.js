// Configure the API URL based on environment
const API_URL = 'https://your-deployed-server-url.com'; // Replace with your actual deployed server URL

async function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert('Please enter valid numbers');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operation,
                num1,
                num2
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('resultValue').textContent = data.result;
        } else {
            alert(data.error || 'An error occurred');
        }
    } catch (error) {
        alert('Failed to connect to the server');
        console.error('Error:', error);
    }
} 