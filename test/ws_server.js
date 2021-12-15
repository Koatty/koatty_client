/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-15 16:52:47
 * @LastEditTime: 2021-12-15 17:05:56
 */
const ws = require('ws');

/**
 *
 *
 */
module.exports = () => {
    const wss = new ws.WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(w) {
        w.on('message', function message(data) {
            console.log('received: %s', data);
        });

        w.send('something');
    });

    global.ws_server = wss;
    process.env.WS_SERVER_ADDRESS = "ws://127.0.0.1:8080";
    return Promise.resolve(null);
}

