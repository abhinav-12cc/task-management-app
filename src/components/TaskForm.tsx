import React, { useState, useEffect } from "react";

export default function TaskForm({
  initial,
  onSubmit,
  loading,
}: {
  initial?: { title?: string; description?: string; status?: string };
  onSubmit: (data: {
    title: string;
    description: string;
    status: string;
  }) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "pending");

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setStatus(initial?.status || "pending");
  }, [initial]);

  return (
    <form
      className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-md border"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, description, status });
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-medium text-gray-700">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          className="border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded px-4 py-2 mt-2 disabled:opacity-50 shadow"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}
