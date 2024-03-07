import {
  AttributeValue,
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { isEmpty, map } from "ramda";

import Todo, { TableName as TodoTableName } from "src/models/Todo";
import { HttpError } from "../../libs";

export default class TodoService {
  private Tablename: string = TodoTableName;

  constructor(private docClient: DynamoDBClient) {}

  async getAllTodos(): Promise<Todo[]> {
    const command = new ScanCommand({
      TableName: this.Tablename,
    });

    const todos = map(unmarshall, (await this.docClient.send(command)).Items);

    return (todos || []) as Todo[]; // Check out DynamoDB Serverless guide for 2024/23
  }

  async getTodo(id: string): Promise<Todo | null | undefined> {
    const command = new GetCommand({
      TableName: this.Tablename,
      Key: {
        todosId: id,
      },
    });

    const todo = (await this.docClient.send(command)).Item as Todo;
    if (!todo) throw new HttpError(404, { message: "Not found" });
    return todo;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    if (!todo.title || !todo.description)
      throw new HttpError(400, {
        message:
          "Received faulty payload. Properties 'description' or 'title' were missing.",
      });
    const command = new PutCommand({
      TableName: this.Tablename,
      Item: todo,
      ConditionExpression: "attribute_not_exists(todosId)",
    });
    const created = await this.docClient.send(command);
    if (created) return todo;
  }

  async updateTodo(
    id: string,
    updates: Omit<Partial<Todo>, "createdAt" & "todosId">
  ): Promise<Todo | null | undefined> {
    if (isEmpty(updates))
      throw new HttpError(400, { message: "No valid updates were provided!" });

    // Parse the incoming updates
    const updateKeys = Object.keys(updates);
    const keysToUpdateFormatted = map((key) => `#${key} = :${key}`, updateKeys);

    // For the Dynamo update payload
    const UpdateExpression = `set ${keysToUpdateFormatted.join(", ")}`;
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, AttributeValue> = {};

    for (let key of updateKeys) {
      const value = updates[key];
      const namePlaceholder = `#${key}`;
      const valuePlaceholder = `:${key}`;

      ExpressionAttributeNames[namePlaceholder] = key;
      ExpressionAttributeValues[valuePlaceholder] = value;
    }

    const command = new UpdateCommand({
      TableName: this.Tablename,
      Key: {
        todosId: id,
      },
      // Only update if it already exists
      ConditionExpression: "attribute_exists(todosId)",
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW", // We want to return the entire Todo post-update
    });

    const updated = (await this.docClient.send(command)).Attributes;

    return updated as Todo;
  }

  async deleteTodo(id: string): Promise<any> {
    const command = new DeleteCommand({
      TableName: this.Tablename,
      Key: {
        todosId: id,
      },
    });

    return await this.docClient.send(command);
  }
}
