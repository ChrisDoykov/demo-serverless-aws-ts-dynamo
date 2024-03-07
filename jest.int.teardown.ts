import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { TableName } from "./src/models/Todo/index";
import { dynamoDBClient } from "./src/libs";

const dbClient = dynamoDBClient();

export default async () => {
  const command = new DeleteTableCommand({
    TableName,
  });

  await dbClient.send(command);
};
