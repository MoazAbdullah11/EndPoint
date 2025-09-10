const express = require('express');
const si = require('systeminformation');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to receive system info
app.post('/system-info', async (req, res) => {
    try {
        const systemInfoFromClient = req.body.system_info;

        // Optional: log or save in DB here
        console.log('Received system info from client:', systemInfoFromClient);

        // Return the same data in response
        res.json({
            success: true,
            systemInfo: systemInfoFromClient
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Optional: Endpoint to fetch server machine info
app.get('/server-system-info', async (req, res) => {
    try {
        const cpu = await si.cpu();
        const mem = await si.mem();
        const os = await si.osInfo();
        const disk = await si.diskLayout();
        const gpu = await si.graphics();
        const battery = await si.battery();
        const network = await si.networkInterfaces();

        const systemInfo = { cpu, mem, os, disk, gpu, battery, network };

        res.json({ success: true, systemInfo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
