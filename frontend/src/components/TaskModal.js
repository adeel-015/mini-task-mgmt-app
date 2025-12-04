"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { useTheme } from "../context/ThemeContext";
// TaskModal delegates create/update to parent via onSave

export default function TaskModal({ isOpen, onClose, task, onSave }) {
  const { dark } = useTheme();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (task) {
      // Convert ISO date to YYYY-MM-DD format for date input
      const formattedTask = {
        ...task,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
      };
      reset(formattedTask);
    } else {
      reset({ title: "", description: "", status: "Pending", deadline: "" });
    }
  }, [task, reset]);

  if (!isOpen) return null;

  const submit = (data) => {
    try {
      // pass raw form payload to parent; parent will call API (useTasks)
      onSave(data);
      onClose();
    } catch (err) {
      alert(err.message || "Save failed");
    }
  };
  const containerClass = `fixed inset-0 z-50 flex items-center justify-center`;
  const backdropClass = `absolute inset-0 ${
    dark ? "bg-black/50" : "bg-black/40"
  }`;
  const panelClass = `p-6 rounded shadow z-10 w-full max-w-md ${
    dark ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"
  }`;
  const labelClass = `block text-sm mb-1 ${
    dark ? "text-slate-300" : "text-slate-700"
  }`;
  const controlClass = `w-full p-2 border rounded ${
    dark
      ? "bg-slate-700 border-slate-600 text-slate-100"
      : "bg-white border-slate-300 text-slate-900"
  }`;

  return (
    <div className={containerClass}>
      <div className={backdropClass} onClick={onClose} />
      <div className={panelClass}>
        <h3 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "New Task"}
        </h3>
        <form onSubmit={handleSubmit(submit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <div className="mb-3">
            <label className={labelClass}>Description</label>
            <textarea className={controlClass} {...register("description")} />
          </div>
          <div className="mb-3">
            <label className={labelClass}>Status</label>
            <select
              className={controlClass}
              {...register("status", { required: true })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-3">
            <label className={labelClass}>Deadline</label>
            <input
              type="date"
              className={controlClass}
              {...register("deadline", { required: true })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
