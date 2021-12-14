/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 10:54:16
 * @LastEditTime: 2021-12-14 19:20:34
 */
import path from "path";
import * as Helper from "koatty_lib";
import { GrpcClient } from "../src/grpc/client";
import * as hello_pb from "./hello_pb";
import * as hello_grpc_pb from "./hello_grpc_pb";
import { WsClient } from "../src/ws/client";
// import * as grpc from "grpc";
const address = "ws://121.40.165.18:8800";
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
            address: "127.0.0.1:3000",
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
    try {
        const cli = new WsClient({ address });
        await cli.connection();
        cli.service.onMessage.addListener(data => console.log('Message sent', data));
        cli.service.onClose.addListener(data => console.log('close', data))
        const res = await cli.send({ test: "hello" });
        console.log(res);


        cli.service.close();
    } catch (error) {
        console.log(error.stack);

    }
}

// testGrpc();
testWs();