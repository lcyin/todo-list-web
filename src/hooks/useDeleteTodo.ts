import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodosService } from "../api/services/TodosService";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (todoId: string) => {
      return TodosService.deleteApiV1Todos(todoId);
    },
    onSuccess: () => {
      // Invalidate and refetch todos query to update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });
};
