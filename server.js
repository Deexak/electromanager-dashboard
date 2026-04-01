const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Main route - serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

function startServer(port) {
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`
🚀 ELECTROMANAGER SERVER IS ONLINE!
=====================================
🌐 URL: http://localhost:${port}
📁 Serving from: ${__dirname}
=====================================
✨ Keep this window OPEN while using the site.
        `);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`⚠️  Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error("❌ Server Error:", err);
        }
    });
}

startServer(3000);
