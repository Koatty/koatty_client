/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-08 17:45:23
 * @LastEditTime: 2021-12-14 16:47:48
 */
import got, { Options, Method, RequiredRetryOptions } from 'got';

/**
 * HttpClientOptions
 *
 * @export
 * @interface HttpClientOptions
 */
export interface HttpClientOptions {
    http2?: boolean;
    retryOpt?: RequiredRetryOptions;
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
     * @returns {*}  
     * @memberof Client
     */
    request(uri: string, method: Method = 'GET', headers = {}) {
        const options: Options = Object.assign(this.options, {
            method: method,
            headers: headers,
        });
        return got(uri, options);
    }
}

