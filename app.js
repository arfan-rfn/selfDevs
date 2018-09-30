const express = require('express');
const test = require("./model/test");

const app = express();

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(server_port, server_ip, () => {
    console.log(`Listening of ${server_ip}, port ${server_port}`);
});