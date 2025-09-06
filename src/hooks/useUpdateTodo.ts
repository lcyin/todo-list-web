import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodosService } from "../api/services/TodosService";
import type { UpdateTodoRequest } from "../api/models/UpdateTodoRequest";
import type { Todo } from "../api/models/Todo";

interface UpdateTodoParams {
  id: string;
  data: UpdateTodoRequest;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, UpdateTodoParams>({
    mutationFn: ({ id, data }: UpdateTodoParams) => {
      return TodosService.putApiV1Todos(id, data);
    },
    onSuccess: () => {
      // Invalidate and refetch todos query to update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to update todo:", error);
    },
  });
};
