/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-08 17:45:56
 * @LastEditTime: 2021-12-14 19:20:20
 */
import * as Helper from "koatty_lib";
import WebSocket, { ClientOptions } from 'ws';
import WebSocketAsPromised from 'websocket-as-promised';
import Options from "websocket-as-promised/types/options";

export interface WsClientOptions extends Options {
    address: string;
}

/**
 *
 *
 * @interface SendJsonData
 */
interface SendJsonData {
    [key: string]: any;
}

export class WsClient {
    service: WebSocketAsPromised;
    options: WsClientOptions;

    /**
     * Creates an instance of WsClient.
     * @param {WsClientOptions} [options]
     * @memberof WsClient
     */
    constructor(options?: WsClientOptions) {
        this.options = {
            ...{
                perMessageDeflate: false,
            },
            ...options,
        }
    }

    /**
     *
     *
     * @returns {*}  
     * @memberof WsClient
     */
    async connection() {
        if (this.service) {
            return this.service;
        }
        const wsp = new WebSocketAsPromised(this.options.address, {
            createWebSocket: url => new WebSocket(url),
            extractMessageData: event => event, // <- this is important
            packMessage: data => JSON.stringify(data),
            unpackMessage: data => {
                if (Helper.isJSONStr(<string>data)) {
                    return JSON.parse(<string>data);
                } else {
                    return data;
                }
            },
            attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data), // attach requestId to message as `id` field
            extractRequestId: data => data && data.id,
        });

        return wsp.open().then(() => {
            this.service = wsp;
            return wsp;
        });
    }

    /**
     *
     *
     * @param {(string | SendJsonData)} data
     * @returns {*}  
     * @memberof WsClient
     */
    async send(data: string | SendJsonData) {
        const service = await this.connection();

        return service.sendRequest(data);
    }

    /**
     *
     *
     * @param {(...args: any[], context?: any) => any} callback
     * @returns {*}  
     * @memberof WsClient
     */
    async onMessage(callback: (args: any[], context?: any) => any) {
        const service = await this.connection();
        return service.onMessage.addListener(callback);
    }

    /**
     *
     *
     * @returns {*}  
     * @memberof WsClient
     */
    close() {
        if (!this.service) {
            return;
        }
        return this.service.close();
    }
}