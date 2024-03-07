import Todo from "src/models/Todo";
import { v4 } from "uuid";

export default {
  todosId: v4(),
  title: "Test title",
  description: "Test description.",
  createdAt: new Date().toISOString(),
  status: false,
} as Todo;
