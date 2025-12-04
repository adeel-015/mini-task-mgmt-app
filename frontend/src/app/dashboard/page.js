"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import TaskList from "../../components/TaskList";
import TaskModal from "../../components/TaskModal";
import TaskFilter from "../../components/TaskFilter";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import useTasks from "../../hooks/useTasks";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const {
    tasks,
    loading: tasksLoading,
    error,
    filters,
    setFilters,
    pagination,
    setPage,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  const openNew = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (task) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(task._id);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div>
      <Header />
      <main className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button onClick={openNew}>Add Task</Button>
          </div>
        </div>

        <TaskFilter filters={filters} onChange={(f) => setFilters(f)} />

        <section className="mt-6">
          {tasksLoading ? (
            <div className="text-center py-8 text-slate-500">Loading tasks...</div>
          ) : (
            <>
              <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
              <Pagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          task={editingTask}
          onSave={async (task) => {
            if (editingTask) {
              await updateTask(editingTask._id, task);
            } else {
              await addTask(task);
            }
            setModalOpen(false);
          }}
        />
      </main>
    </div>
  );
}
