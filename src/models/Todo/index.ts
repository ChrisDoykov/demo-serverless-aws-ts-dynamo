import { equals } from "ramda";

const { NODE_ENV } = process.env;

export default interface Todo {
  todosId: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}

export const TableName = equals(NODE_ENV, "test")
  ? "Test_TodosTable"
  : "TodosTable";
