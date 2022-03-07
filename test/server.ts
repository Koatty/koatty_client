/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 14:25:13
 * @LastEditTime: 2021-12-15 18:49:48
 */
import * as Helper from "koatty_lib";
const rpcServer = require('./grpc_server');
const wsServer = require('./ws_server');



// rpcServer
// rpcServer();

// wsServer
// wsServer();

console.log(divide(8.2, 7.9));


function divide(num1: any, num2: any) {
    let t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = num1.toString().split(".")[1].length;
    } catch (e) { }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) { }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}