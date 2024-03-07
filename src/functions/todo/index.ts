import { handlerPath } from "../../libs";

const GENERIC_PATH = `${handlerPath(__dirname)}/handler`;

export const getAllTodos = {
  handler: `${GENERIC_PATH}.getAllTodos`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/",
      },
    },
  ],
};

export const getTodo = {
  handler: `${GENERIC_PATH}.getTodo`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/{id}",
      },
    },
  ],
};

export const createTodo = {
  handler: `${GENERIC_PATH}.createTodo`,
  events: [
    {
      http: {
        method: "post",
        path: "todo",
      },
    },
  ],
};

export const updateTodo = {
  handler: `${GENERIC_PATH}.updateTodo`,
  events: [
    {
      http: {
        method: "put",
        path: "todo/{id}",
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${GENERIC_PATH}.deleteTodo`,
  events: [
    {
      http: {
        method: "delete",
        path: "todo/{id}",
      },
    },
  ],
};
