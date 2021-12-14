/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-10 14:55:56
 * @LastEditTime: 2021-12-14 16:46:25
 */
import assert from "assert";
import { HttpClient } from "../src/http/client";

describe("http_client", () => {
    it("get", async () => {
        try {
            const cli = new HttpClient();
            const res = await cli.request('https://httpbin.org/get');

            assert.notEqual(res, null);
            console.log(res);
        } catch (error) {
            assert.fail(error);
        }
    })
})