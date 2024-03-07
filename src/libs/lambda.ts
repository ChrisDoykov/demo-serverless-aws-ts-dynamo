import middy from "@middy/core";
import { Handler } from "aws-lambda";

export const middyfy = (handler: Handler) => {
  return middy(handler);
};
