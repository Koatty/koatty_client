/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-10 14:55:56
 * @LastEditTime: 2021-12-10 15:20:17
 */
import { Client } from "../src/http/client";

describe("http_client", () => {
    it("get", async () => {
        const cli = new Client();
        const res = await cli.request('https://httpbin.org/get');

        console.log(res);

    })
})