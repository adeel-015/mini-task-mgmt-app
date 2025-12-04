import { useState, useEffect } from "react";
import api from "../services/api";

export default function useTasks(initialFilters = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, _setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0 });

  useEffect(() => {
    fetch();
  }, [filters, pagination.page]);

  // helper to update filters and reset to page 1
  const setFilters = (next) => {
    _setFilters((prev) => {
      const nextFilters = typeof next === "function" ? next(prev) : next;
      // reset page to 1 whenever filters change
      setPagination((p) => ({ ...p, page: 1 }));
      return nextFilters;
    });
  };

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.getTasks({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setTasks(res.tasks || []);
      setPagination((prev) => ({ ...prev, total: res.total || 0 }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (payload) => {
    const res = await api.createTask(payload);
    // Refetch current page instead of manually prepending
    await fetch();
    return res.task;
  };

  const updateTask = async (id, payload) => {
    const res = await api.updateTask(id, payload);
    setTasks((t) => t.map((x) => (x._id === id ? res.task : x)));
    return res.task;
  };

  const deleteTask = async (id) => {
    await api.deleteTask(id);
    // Refetch to handle pagination correctly
    await fetch();
  };

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    pagination,
    setPage,
    fetch,
    addTask,
    updateTask,
    deleteTask,
  };
}
