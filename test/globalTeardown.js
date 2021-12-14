/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 16:19:21
 * @LastEditTime: 2021-12-14 16:33:01
 */
module.exports = async () => {
    // global.server.close();
    global.server.tryShutdown(() => {
        console.log('shutdown');
    });
};