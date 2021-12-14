// package: 
// file: hello.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SayHelloRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): SayHelloRequest;
    getName(): string;
    setName(value: string): SayHelloRequest;
    getPhone(): PhoneType;
    setPhone(value: PhoneType): SayHelloRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SayHelloRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SayHelloRequest): SayHelloRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SayHelloRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SayHelloRequest;
    static deserializeBinaryFromReader(message: SayHelloRequest, reader: jspb.BinaryReader): SayHelloRequest;
}

export namespace SayHelloRequest {
    export type AsObject = {
        id: number,
        name: string,
        phone: PhoneType,
    }
}

export class SayHelloReply extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): SayHelloReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SayHelloReply.AsObject;
    static toObject(includeInstance: boolean, msg: SayHelloReply): SayHelloReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SayHelloReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SayHelloReply;
    static deserializeBinaryFromReader(message: SayHelloReply, reader: jspb.BinaryReader): SayHelloReply;
}

export namespace SayHelloReply {
    export type AsObject = {
        message: string,
    }
}

export enum PhoneType {
    MOBILE = 0,
    HOME = 1,
    WORK = 2,
}
