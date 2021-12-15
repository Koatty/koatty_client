/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-15 16:51:50
 * @LastEditTime: 2021-12-15 16:51:50
 */
const path = require('path');
const Helper = require('koatty_lib');
const proto = require('koatty_proto');
const grpc = require('@grpc/grpc-js');
const PROTO_PATH = path.resolve("./test/hello.proto");

/**
 *
 *
 * @returns {*}  
 */
module.exports = () => {
    const server = new grpc.Server();
    const protoDef = proto.LoadProto(PROTO_PATH);
    if (!Object.hasOwnProperty.call(protoDef, "Hello")) {
        return Promise.reject("service name does not exist");
    }
    const services = proto.ListServices(protoDef);

    server.addService(services[0].service, {
        SayHello: (_, callback) => {
            callback(null, { message: "ccc" });
        },
    });

    const host = '127.0.0.1:8081';
    const def = Helper.getDefer();
    server.bindAsync(
        host,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log(`Server running at http://${host}`);
            server.start();
            process.env.GRPC_SERVER_ADDRESS = host;
            global.rpc_server = server;
            def.resolve(null);
        }
    );
    return def.promise;
}