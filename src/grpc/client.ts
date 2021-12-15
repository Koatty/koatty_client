/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-08 17:45:37
 * @LastEditTime: 2021-12-15 17:16:49
 */
import * as Helper from "koatty_lib";
import { DefaultLogger as Logger } from "koatty_logger";
import { LoadProto, ProtoDef } from "koatty_proto";
import { ChannelCredentials, GrpcObject } from "@grpc/grpc-js";
import { ChannelOptions } from "@grpc/grpc-js/build/src/channel-options";
import { ServiceClientConstructor, ServiceClient } from "@grpc/grpc-js/build/src/make-client";

/**
 *
 *
 * @export
 * @interface GrpcClientOptions
 */
export interface GrpcClientOptions {
    protoFile: string;
    serviceName: string;
    address: string;
    timeout?: number;
    cert?: ChannelCredentials;
    opt?: ChannelOptions;
}

/**
 *
 *
 * @class GrpcClient
 */
export class GrpcClient {
    options: GrpcClientOptions;
    service: ServiceClient;

    /**
     * Creates an instance of GrpcClient.
     * @param {GrpcClientOptions} [options={
     *         address: "127.0.0.1:3000",
     *         cert: ChannelCredentials.createInsecure(),
     *     }]
     * @memberof Client
     */
    constructor(options: GrpcClientOptions) {
        this.options = {
            ...{
                address: "127.0.0.1:3000",
                timeout: 5000,
                cert: ChannelCredentials.createInsecure(),
            },
            ...options,
        };
        if (Helper.isEmpty(this.options.serviceName)) {
            throw new Error("options serviceName is not defined.");
        }
        // async connect
        this.connection();
    }

    /**
     *
     *
     * @returns {*}  {Promise<ServiceClient>}
     * @memberof GrpcClient
     */
    connection(): Promise<ServiceClient> {
        if (this.service) {
            return Promise.resolve(this.service);
        }
        const protoDef: GrpcObject = LoadProto(this.options.protoFile);
        if (!Object.hasOwnProperty.call(protoDef, this.options.serviceName)) {
            return Promise.reject("service name does not exist");
        }
        const serviceDef: ServiceClientConstructor = <ServiceClientConstructor>protoDef[this.options.serviceName];
        const service = new serviceDef(this.options.address, this.options.cert);
        // waitForReady
        const def = Helper.getDefer();
        service.waitForReady(Date.now() + this.options.timeout, (error?: Error) => {
            if (error) {
                def.reject(error);
            }
            Logger.Debug("GrpcClient", "connection ready");
            this.service = service;
            def.resolve(service);
        });
        return def.promise;
    }

    /**
     *
     *
     * @param {string} method
     * @param {*} request
     * @returns {*}  
     * @memberof Client
     */
    async call<T>(method: string, request: any): Promise<T> {
        const service = await this.connection();
        const def = Helper.getDefer();
        Logger.Debug("GrpcClient", { method, request });
        service[method](request, {}, function (err: Error, response: T) {
            if (err) {
                def.reject(err);
            }
            def.resolve(response);
        });

        return def.promise;
    }

    /**
     *
     *
     * @returns {*}  
     * @memberof GrpcClient
     */
    close() {
        if (!this.service) {
            return;
        }
        return this.service.close();
    }

}