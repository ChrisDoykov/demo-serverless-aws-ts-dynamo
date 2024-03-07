import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { tableInfo } from "./src/fixtures/todos/tableInfo";
import { dynamoDBClient } from "./src/libs";

const dbClient = dynamoDBClient();

export default async () => {
  const command = new CreateTableCommand(tableInfo);
  await dbClient.send(command);
};
