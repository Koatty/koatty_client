// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var hello_pb = require('./hello_pb.js');

function serialize_SayHelloReply(arg) {
  if (!(arg instanceof hello_pb.SayHelloReply)) {
    throw new Error('Expected argument of type SayHelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SayHelloReply(buffer_arg) {
  return hello_pb.SayHelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SayHelloRequest(arg) {
  if (!(arg instanceof hello_pb.SayHelloRequest)) {
    throw new Error('Expected argument of type SayHelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SayHelloRequest(buffer_arg) {
  return hello_pb.SayHelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloService = exports.HelloService = {
  sayHello: {
    path: '/Hello/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: hello_pb.SayHelloRequest,
    responseType: hello_pb.SayHelloReply,
    requestSerialize: serialize_SayHelloRequest,
    requestDeserialize: deserialize_SayHelloRequest,
    responseSerialize: serialize_SayHelloReply,
    responseDeserialize: deserialize_SayHelloReply,
  },
};

exports.HelloClient = grpc.makeGenericClientConstructor(HelloService);
