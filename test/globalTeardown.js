/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 16:19:21
 * @LastEditTime: 2021-12-15 16:50:27
 */
module.exports = async () => {
    // global.rpc_server.close();
    global.rpc_server.tryShutdown(() => {
        console.log('close grpc server ');
    });
    global.ws_server.close(() => {
        console.log('close ws server');
    });


};