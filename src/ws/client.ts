/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-08 17:45:56
 * @LastEditTime: 2021-12-15 16:41:35
 */
import * as Helper from "koatty_lib";
import WebSocket, { ClientOptions } from 'ws';
const WebSocketAsPromised = require('websocket-as-promised');
// import WebSocketAsPromised from 'websocket-as-promised';
export interface WsClientOptions {
    address: string;
    createWebSocket?: (url: string) => WebSocket;
    timeout?: number;
    connectionTimeout?: number;
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
    service: any;
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
            createWebSocket: (url: string) => new WebSocket(url),
            extractMessageData: (event: any) => event, // <- this is important
            packMessage: (data: any) => JSON.stringify(data),
            unpackMessage: (data: string | ArrayBuffer | Blob) => {
                if (Helper.isJSONStr(<string>data)) {
                    return JSON.parse(<string>data);
                } else {
                    return data;
                }
            },
            attachRequestId: (data: any, requestId: string | number) => Object.assign({ id: requestId }, data), // attach requestId to message as `id` field
            extractRequestId: (data: any) => data && data.id,
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
     * @param {(args: any[], context?: any) => any} callback
     * @returns {*}  
     * @memberof WsClient
     */
    async onClose(callback: (args: any[], context?: any) => any) {
        const service = await this.connection();
        return service.onClose.addListener(callback);
    }

    /**
     *
     *
     * @param {(args: any[], context?: any) => any} callback
     * @returns {*}  
     * @memberof WsClient
     */
    async onError(callback: (args: any[], context?: any) => any) {
        const service = await this.connection();
        return service.onError.addListener(callback);
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