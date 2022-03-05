const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const ref = decodeURI(req.url);
    fs.readFile(path.join('C:/chess-bgm', ref), (err, data) => {
        res.statusCode = 200;
        res.end(data);
    });
});

server.listen('9696');
