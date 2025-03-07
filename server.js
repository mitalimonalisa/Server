const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    // Configure CORS to accept requests from any origin in development
    // In production, you should specify your client's domain
    origin: '*'
}));

// Serve static files (optional, if you want to serve the client files from the same server)
app.use(express.static('public'));

// Add security middleware
app.use(helmet());

// Add rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Calculator routes
app.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;
    let result;

    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 