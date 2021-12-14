/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 16:19:42
 * @LastEditTime: 2021-12-14 16:43:26
 */
const path = require('path');
const Helper = require('koatty_lib');
const proto = require('koatty_proto');
const grpc = require('@grpc/grpc-js');
const PROTO_PATH = path.resolve("./test/hello.proto");
global.server = new grpc.Server();

module.exports = async () => {
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

    const host = '127.0.0.1:3000';
    const def = Helper.getDefer();
    server.bindAsync(
        host,
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log(`Server running at http://${host}`);
            server.start();
            process.env.SERVER_ADDRESS = host;
            def.resolve(null);
        }
    );
    return def.promise;

};