import { equals } from "ramda";

const { NODE_ENV, DYNAMO_TABLE_NAME } = process.env;

export default interface Todo {
  todosId: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}

export const TableName = equals(NODE_ENV, "test")
  ? "Test_TodosTable"
  : DYNAMO_TABLE_NAME;
