import React from "react";

export default function TaskItem({
  task,
  onEdit,
  onDelete,
}: {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-gray-200 hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-xl text-gray-900">{task.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide capitalize shadow-sm ${
            task.status === "done"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-yellow-100 text-yellow-700 border border-yellow-200"
          }`}
        >
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-700 text-base mb-1">{task.description}</p>
      )}
      <div className="flex gap-3 mt-2">
        <button
          className="text-blue-600 hover:underline font-medium"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline font-medium"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
      <span className="text-xs text-gray-400 mt-2">
        {new Date(task.createdAt).toLocaleString()}
      </span>
    </div>
  );
}
