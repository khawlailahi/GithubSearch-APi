const express = require('express');
// import axios from 'axios';
const Redis = require('redis');
const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const client = Redis.createClient(REDIS_PORT);

app.post("/api/search", (req, res) => {

})

app.delete("/api/clear-cache", (req, res) => {

})





app.listen(PORT, () => { console.log('app listening on port:', PORT) });