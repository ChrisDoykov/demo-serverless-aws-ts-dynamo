import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { isEmpty, not, pathOr } from "ramda";

import { formatJSONResponse, middyfy, handleError } from "../../libs";
import { todosService } from "../../services";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  try {
    const todos = await todosService.getAllTodos();
    return formatJSONResponse({
      todos,
    });
  } catch (error) {
    return handleError(error);
  }
});

export const getTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = pathOr("", ["pathParameters", "id"], event);
    try {
      const todo = await todosService.getTodo(id);

      return formatJSONResponse({
        todo,
        id,
      });
    } catch (error) {
      return handleError(error);
    }
  }
);

export const createTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = v4();
    const payload = not(isEmpty(event?.body)) ? JSON.parse(event.body) : {};
    const { title, description } = payload;
    try {
      const todo = await todosService.createTodo({
        todosId: id,
        title,
        description,
        createdAt: new Date().toISOString(),
        status: false,
      });

      return todo
        ? // Success
          formatJSONResponse({
            todo,
          })
        : // Silent Failure
          {
            statusCode: 500,
            body: "Failed to create Todo with given payload.",
          };
    } catch (error) {
      return handleError(error);
    }
  }
);

export const updateTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = pathOr("", ["pathParameters", "id"], event);
    const updates = not(isEmpty(event?.body)) ? JSON.parse(event.body) : {};

    try {
      const updated = await todosService.updateTodo(id, updates);

      return updated
        ? // Success
          formatJSONResponse({
            updated,
          })
        : // Silent Failure
          {
            statusCode: 500,
            body: JSON.stringify({
              id,
              status: 500,
              message: `Failed to update Todo with ID ${id}.`,
              updatesProvided: updates,
            }),
          };
    } catch (error) {
      return handleError(error);
    }
  }
);

export const deleteTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = pathOr("", ["pathParameters", "id"], event);
    try {
      const deleted = await todosService.deleteTodo(id);
      return formatJSONResponse({
        deleted,
      });
    } catch (error) {
      return handleError(error);
    }
  }
);
