import type { AWS } from "@serverless/typescript";
import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@functions/todo";

const serverlessConfiguration: AWS = {
  service: "aws-serverless-typescript-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dynamodb", "serverless-offline"],
  provider: {
    name: "aws",
    region: "eu-west-2",
    runtime: "nodejs20.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DYNAMO_TABLE_NAME: "${self:custom.dynamoTableName}",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: { "Fn::GetAtt": ["TodosTable", "Arn"] },
          },
        ],
      },
    },
  },
  functions: { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["@aws-sdk"],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-dynamodb": {
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
      stages: ["local", "dev"],
    },
    dynamoTableName: "TodosTable-${self:provider.stage}",
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.dynamoTableName}",
          AttributeDefinitions: [
            {
              AttributeName: "todosId",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "todosId",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};
module.exports = serverlessConfiguration;
