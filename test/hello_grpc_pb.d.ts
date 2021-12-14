// package: 
// file: hello.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as hello_pb from "./hello_pb";

interface IHelloService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IHelloService_ISayHello;
}

interface IHelloService_ISayHello extends grpc.MethodDefinition<hello_pb.SayHelloRequest, hello_pb.SayHelloReply> {
    path: "/Hello/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<hello_pb.SayHelloRequest>;
    requestDeserialize: grpc.deserialize<hello_pb.SayHelloRequest>;
    responseSerialize: grpc.serialize<hello_pb.SayHelloReply>;
    responseDeserialize: grpc.deserialize<hello_pb.SayHelloReply>;
}

export const HelloService: IHelloService;

export interface IHelloServer {
    sayHello: grpc.handleUnaryCall<hello_pb.SayHelloRequest, hello_pb.SayHelloReply>;
}

export interface IHelloClient {
    sayHello(request: hello_pb.SayHelloRequest, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: hello_pb.SayHelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: hello_pb.SayHelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
}

export class HelloClient extends grpc.Client implements IHelloClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: hello_pb.SayHelloRequest, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: hello_pb.SayHelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: hello_pb.SayHelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hello_pb.SayHelloReply) => void): grpc.ClientUnaryCall;
}
