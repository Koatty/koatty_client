/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 10:31:57
 * @LastEditTime: 2021-12-15 16:48:44
 */
import assert from "assert";
import path from "path";
import { GrpcClient } from "../src/grpc/client";
const PROTO_PATH = path.resolve("./test/hello.proto");

// beforeAll(async () => {

// });

// afterAll(() => {

// });


describe("grpc_client", () => {
    it("SayHello", async () => {
        try {
            const cli = new GrpcClient({
                protoFile: PROTO_PATH,
                serviceName: "Hello",
                timeout: 10000,
                address: process.env.GRPC_SERVER_ADDRESS,
            });
            console.log(process.env.GRPC_SERVER_ADDRESS);

            const res = await cli.call("SayHello", { id: 1, name: "test", phone: 0 });

            assert.notEqual(res, null);
            console.log(res);
        } catch (error) {
            assert.fail(error);
        }

    })
})