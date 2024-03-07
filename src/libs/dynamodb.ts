import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export default (): DynamoDBClient => {
  if (process.env.IS_OFFLINE) {
    return new DynamoDBClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      credentials: {
        accessKeyId: "MockAccessKeyId",
        secretAccessKey: "MockSecretAccessKey",
      },
    });
  }
  return new DynamoDBClient();
};
