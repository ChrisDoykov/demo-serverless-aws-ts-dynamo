// Since this is an integration test
// we want to use the actual SDK
jest.unmock("@aws-sdk/client-dynamodb");
jest.unmock("@aws-sdk/util-dynamodb");

import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";

import SAMPLE_TODO from "src/fixtures/todos/sample_todo";
import { todosService } from "../index";

// Check jest.setup.ts and jest.teardown.ts for the creation and deletion of the tables

describe("todosService", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe("getAllTodos", () => {
    describe("on success", () => {
      it("retrieve all todos from the db", async () => {
        return expect(await todosService.getAllTodos()).toEqual([]);
      });
    });
  });

  describe("createTodo", () => {
    describe("on success", () => {
      it("should create a todo", async () => {
        return expect(
          await todosService.createTodo(SAMPLE_TODO)
        ).toHaveProperty("title", SAMPLE_TODO.title);
      });
    });
    describe("on error", () => {
      it("should fail to create todo with existing id", async () => {
        return expect(
          async () => await todosService.createTodo(SAMPLE_TODO)
        ).rejects.toThrow(ConditionalCheckFailedException);
      });
    });
  });

  describe("getTodo", () => {
    describe("on error", () => {
      it("should fail to retrieve a non-existent todo", async () => {
        const fakeId = "fakeId";
        return expect(
          async () => await todosService.getTodo(fakeId)
        ).rejects.toThrow("Not found");
      });
    });
    describe("on success", () => {
      it("should retrieve Todo with real ID", async () => {
        return expect(await todosService.getTodo(SAMPLE_TODO.todosId)).toEqual(
          SAMPLE_TODO
        );
      });
    });
  });

  describe("updateTodo", () => {
    describe("on error", () => {
      it("should fail to update a non-existent todo", async () => {
        const fakeId = "fakeIdNew";
        return expect(
          async () =>
            await todosService.updateTodo(fakeId, { title: "Updated" })
        ).rejects.toThrow(ConditionalCheckFailedException);
      });
      it("should fail to update a todo with an empty updates partial", async () => {
        const id = SAMPLE_TODO.todosId;
        return expect(
          async () => await todosService.updateTodo(id, {})
        ).rejects.toThrow("No valid updates were provided");
      });
    });
    describe("on success", () => {
      it("should update successfully when payload is correct and Todo exists", async () => {
        const newTitle = "Updated";
        return expect(
          await todosService.updateTodo(SAMPLE_TODO.todosId, {
            title: newTitle,
          })
        ).toHaveProperty("title", newTitle);
      });
    });
  });
  describe("updateTodo", () => {
    describe("on success", () => {
      it("should delete a todo", async () => {
        return expect(
          await todosService.deleteTodo(SAMPLE_TODO.todosId)
        ).toBeDefined();
      });
    });
  });
});
