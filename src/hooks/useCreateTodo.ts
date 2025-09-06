import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodosService } from "../api/services/TodosService";
import type { CreateTodoRequest } from "../api/models/CreateTodoRequest";
import type { Todo } from "../api/models/Todo";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, CreateTodoRequest>({
    mutationFn: (todoData: CreateTodoRequest) => {
      return TodosService.postApiV1Todos(todoData);
    },
    onSuccess: () => {
      // Invalidate and refetch todos query to update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });
};
