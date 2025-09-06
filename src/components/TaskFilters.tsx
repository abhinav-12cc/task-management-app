import React from "react";

export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
}: {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 items-end">
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="search" className="font-medium text-gray-700">
          Search tasks
        </label>
        <input
          id="search"
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 w-36">
        <label htmlFor="status" className="font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
