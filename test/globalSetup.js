/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 16:19:42
 * @LastEditTime: 2021-12-15 16:54:26
 */
const rpcServer = require('./grpc_server');
const wsServer = require('./ws_server');


module.exports = async () => {
    await wsServer();
    await rpcServer();

};
