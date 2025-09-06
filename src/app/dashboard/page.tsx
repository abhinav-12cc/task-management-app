"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import TaskItem from "@/components/TaskItem";
import TaskFilters from "@/components/TaskFilters";
import Pagination from "@/components/Pagination";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading, isError } = useTasks({
    search,
    status: statusFilter,
    page,
    limit,
  });
  const deleteTask = useDeleteTask();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-10 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Tasks
        </h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
            onClick={() => router.push("/task-form")}
          >
            + New Task
          </button>
          <button
            className="bg-red-100 text-red-600 font-semibold rounded-lg px-5 py-2 border border-red-200 hover:bg-red-200 transition"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </div>
      </div>
      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatus}
      />
      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Loading tasks...</div>
      ) : isError ? (
        <div className="text-red-600 text-center py-8">
          Failed to load tasks.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data?.tasks?.length === 0 && (
            <div className="text-center text-gray-500">No tasks found.</div>
          )}
          {data?.tasks?.map((task: any) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={() => router.push(`/task-form?id=${task._id}`)}
              onDelete={(id) => deleteTask.mutate(id)}
            />
          ))}
        </div>
      )}
      <Pagination
        page={page}
        total={data?.total || 0}
        limit={limit}
        setPage={setPage}
      />
    </div>
  );
}
