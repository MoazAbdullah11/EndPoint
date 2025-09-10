const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to receive client system info
app.post('/system-info', (req, res) => {
    const clientInfo = req.body.system_info;
    console.log('Received client system info:', clientInfo);

    res.json({
        success: true,
        message: 'Client system info received',
        systemInfo: clientInfo
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
