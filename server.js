// server.js
const express = require('express');
const si = require('systeminformation');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to receive client system info
app.post('/system-info', (req, res) => {
    const clientInfo = req.body.system_info;
    console.log('Received client system info:', clientInfo);

    res.json({
        success: true,
        systemInfo: clientInfo
    });
});

// Endpoint to fetch server system info (Windows optimized)
app.get('/server-system-info', async (req, res) => {
    try {
        const [cpu, mem, os, disk, gpu, battery, network] = await Promise.all([
            si.cpu(),
            si.mem(),
            si.osInfo(),
            si.fsSize(),         // Use fsSize for Windows disks
            si.graphics(),
            si.battery(),
            si.networkInterfaces()
        ]);

        const systemInfo = {
            cpu,
            mem,
            os,
            disk,
            gpu,
            battery,
            network
        };

        res.json({ success: true, systemInfo });
    } catch (err) {
        console.error('Error fetching system info:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
