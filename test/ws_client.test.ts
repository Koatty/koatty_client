/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-14 17:38:28
 * @LastEditTime: 2021-12-15 17:13:32
 */
import assert from "assert";
import { WsClient } from "../src/ws/client";

describe("ws_client", () => {
    it("message", async () => {
        const cli = new WsClient({ address: process.env.WS_SERVER_ADDRESS });
        try {
            cli.onMessage(data => {
                assert.notEqual(data, null);
            });
            cli.send({ test: "hello" });
        } catch (error) {
            assert.fail(error);
        }
    })
})