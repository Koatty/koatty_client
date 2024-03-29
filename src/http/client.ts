/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-08 17:45:23
 * @LastEditTime: 2022-11-18 18:21:21
 */
import { DefaultLogger as Logger } from "koatty_logger";
import got, { OptionsInit, Method, RetryOptions } from 'got';

/**
 * HttpClientOptions
 *
 * @export
 * @interface HttpClientOptions
 */
export interface HttpClientOptions {
    http2?: boolean;
    retry?: RetryOptions;
    timeout?: {
        lookup?: number;
        connect?: number;
        secureConnect?: number;
        socket?: number;
        response?: number;
        send?: number;
        request?: number;
    };
    responseType?: 'text' | 'json' | 'buffer';
    resolveBodyOnly?: boolean;
}

/**
 *
 *
 * @export
 * @class Client
 */
export class HttpClient {
    options: HttpClientOptions;

    /**
     * Creates an instance of HttpClient.
     * @param {HttpClientOptions} options
     * @memberof Client
     */
    constructor(options?: HttpClientOptions) {
        this.options = {
            ...{
                http2: false, // enable http2
                retryOpt: {
                    limit: 3,
                    methods: ["GET", "DELETE", "HEAD"],
                    statusCodes: [],
                    errorCodes: [],
                    calculateDelay: null
                },
                timeout: {
                    request: 10 * 1000 //ms
                },
                responseType: 'text',
                resolveBodyOnly: true,
            }, ...options
        };
    }

    /**
     *
     *
     * @param {string} uri
     * @param {Method} [method='GET']
     * @param {*} [headers={}]
     * @param {*} [data]
     * @returns {*}  
     * @memberof HttpClient
     */
    request(uri: string, method: Method = 'GET', headers = {}, data?: any) {
        const options: OptionsInit = Object.assign(this.options, {
            method: method,
            headers: headers,
        });
        const type = options.headers["Content-Type"] || "";
        if (type.includes("application/x-www-form-urlencoded")) {
            options.form = data;
        } else if (type.includes("application/json")) {
            options.json = data;
        } else { // if (options.headers[""].includes("form-data")) {
            options.body = data;
        }
        Logger.Debug("HttpClient", { uri, method, headers, data })
        return got(uri, options);
    }
}

