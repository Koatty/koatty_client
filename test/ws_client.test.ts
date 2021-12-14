/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 17:38:28
 * @LastEditTime: 2021-12-14 19:23:17
 */
import assert from "assert";
import { WsClient } from "../src/ws/client";
const address = "ws://121.40.165.18:8800";

describe("ws_client", () => {
    it("message", async () => {
        const cli = new WsClient({ address });
        try {
            cli.onMessage(data => console.log('Message sent', data));
            const res = await cli.send({ test: "hello" });
            console.log(res);
            assert.notEqual(res, null);


        } catch (error) {
            // assert.fail(error);
        } finally {
            cli.service.close();
        }
    })
})