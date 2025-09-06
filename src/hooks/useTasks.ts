import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useTasks(params: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const { data } = await axios.get("/api/tasks", { params });
      return data;
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (task: { title: string; description?: string }) => {
      const { data } = await axios.post("/api/tasks", task);
      return data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { ...mutation, isLoading: mutation.isPending };
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      title?: string;
      description?: string;
      status?: string;
    }) => {
      const { data } = await axios.put(`/api/tasks/${id}`, updates);
      return data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { ...mutation, isLoading: mutation.isPending };
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/tasks/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
