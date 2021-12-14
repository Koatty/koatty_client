/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 14:25:13
 * @LastEditTime: 2021-12-14 15:57:07
 */
import path from "path";
import * as Helper from "koatty_lib";
import { GrpcObject, Server, ServerCredentials } from "@grpc/grpc-js";
import { ListServices, LoadProto } from "koatty_proto";
const PROTO_PATH = path.resolve("./test/hello.proto");
const server = new Server();
/**
 *
 *
 * @export
 * @returns {*}  
 */
export function Start() {

    const protoDef: GrpcObject = LoadProto(PROTO_PATH);
    if (!Object.hasOwnProperty.call(protoDef, "Hello")) {
        return Promise.reject("service name does not exist");
    }
    const services = ListServices(protoDef);

    server.addService(services[0].service, {
        SayHello: (_: any, callback: any) => {
            callback(null, { message: "ccc" });
        },
    });

    const def = Helper.getDefer();
    server.bindAsync(
        "127.0.0.1:50051",
        ServerCredentials.createInsecure(),
        () => {
            console.log("Server running at http://127.0.0.1:3000");
            server.start();
            def.resolve(null);
        }
    );
    return def.promise;
}

/**
 *
 *
 * @export
 */
export function Stop() {
    server.tryShutdown(() => {
        console.log('shutdown');
    });
}
