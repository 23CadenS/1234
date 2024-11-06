const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        const response = await fetch(targetUrl);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
