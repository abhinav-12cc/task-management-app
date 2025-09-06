"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TaskForm from "@/components/TaskForm";
import { useCreateTask, useUpdateTask, useTasks } from "@/hooks/useTasks";

export default function TaskFormPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const id = params.get("id");
  const { data } = useTasks({});
  const [initial, setInitial] = useState<any>(null);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  useEffect(() => {
    if (id && data?.tasks) {
      const task = data.tasks.find((t: any) => t._id === id);
      setInitial(task);
    }
  }, [id, data]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  function handleSubmit(values: {
    title: string;
    description: string;
    status: string;
  }) {
    if (id) {
      updateTask.mutate(
        { id, ...values },
        { onSuccess: () => router.push("/dashboard") }
      );
    } else {
      createTask.mutate(values, { onSuccess: () => router.push("/dashboard") });
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Task" : "New Task"}
      </h2>
      <TaskForm
        initial={initial}
        onSubmit={handleSubmit}
        loading={createTask.isLoading || updateTask.isLoading}
      />
      <button
        className="mt-4 text-gray-600 hover:underline"
        onClick={() => router.push("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
