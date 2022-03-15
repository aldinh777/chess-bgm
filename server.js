const path = require('path');
const fs = require('fs');
const http = require('http');

const ZA_PATH = 'C:/chess-bgm';
const getpath = (...paths) => path.join(ZA_PATH, ...paths);

const server = http.createServer((req, res) => {
    const ref = decodeURI(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.match(/^\/playing\/?$/) || req.url.match(/^\/matching\/?$/)) {
        fs.readdir(getpath(ref), (err, files) => {
            if (err) {
                res.statusCode = 500;
                res.end(err.message);
            } else {
                res.statusCode = 200;
                res.end(JSON.stringify(files));
            }
        });
    } else {
        fs.readFile(getpath(ref), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err.message);
            } else {
                res.statusCode = 200;
                res.end(data);
            }
        });
    }
});

server.listen('9696');
