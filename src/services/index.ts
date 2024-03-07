import { dynamoDBClient } from "src/libs";
import TodoService from "./Todo/service";

export const todosService = new TodoService(dynamoDBClient());
