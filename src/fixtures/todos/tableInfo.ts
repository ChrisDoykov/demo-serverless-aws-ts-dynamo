import { KeyType, ScalarAttributeType } from "@aws-sdk/client-dynamodb";
import { TableName } from "src/models/Todo";

const { S } = ScalarAttributeType;
const { HASH } = KeyType;

export const tableInfo = {
  TableName,
  AttributeDefinitions: [
    {
      AttributeName: "todosId",
      AttributeType: S,
    },
  ],
  KeySchema: [
    {
      AttributeName: "todosId",
      KeyType: HASH,
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
