import { Context } from "aws-lambda";

export default {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "test",
  functionVersion: "1",
  invokedFunctionArn: "arn",
  memoryLimitInMB: "1",
  awsRequestId: "aws",
  logGroupName: "log",
  logStreamName: "stream",
  getRemainingTimeInMillis: () => 0,
  done: () => {},
  fail: () => {},
  succeed: () => {},
} as Context;
