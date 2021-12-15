/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 10:54:16
 * @LastEditTime: 2021-12-15 17:08:54
 */
import path from "path";
import * as Helper from "koatty_lib";
import { GrpcClient } from "../src/grpc/client";
import * as hello_pb from "./hello_pb";
import * as hello_grpc_pb from "./hello_grpc_pb";
import { WsClient } from "../src/ws/client";
// import * as grpc from "grpc";
const address = "ws://127.0.0.1:8080";
const PROTO_PATH = path.resolve("./test/hello.proto");

async function testGrpc() {
    try {
        const request = new hello_pb.SayHelloRequest();
        request.setId(1);
        request.setName("test");
        request.setPhone(0);

        // ==========================
        const cli = new GrpcClient({
            protoFile: PROTO_PATH,
            serviceName: "Hello",
            address: "127.0.0.1:8081",
        });
        const res = await cli.call("SayHello", { id: 1, name: "test", phone: 0 });

        // ==========================
        // const client = new hello_grpc_pb.HelloClient(
        //     "127.0.0.1:3000",
        //     grpc.credentials.createInsecure()
        // );
        // const def = Helper.getDefer();
        // client.sayHello(request, function (err: Error, response: hello_pb.SayHelloReply) {
        //     if (err) {
        //         def.reject(err);
        //     }
        //     def.resolve(response);
        // });
        // const reply: hello_pb.SayHelloReply = await def.promise;
        // const res = reply.toObject();
        // ==========================


        console.log(res);
    } catch (error) {
        console.log(error.stack);
    }
}

async function testWs() {
    const cli = new WsClient({ address });
    try {
        // await cli.connection();
        cli.onMessage(data => console.log('Message sent', data));
        cli.onClose(data => console.log('close', data))
        // cli.onError(data => console.log('error', data))
        const res = await cli.send({ test: "hello" });
        console.log(res);
    } catch (error) {
        console.log(error.stack);
    } finally {
        cli.service.close();
    }
}

// testGrpc();
testWs();