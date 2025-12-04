const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");
const { asyncHandler, ApiError } = require("../utils/errorHandler");
const {
  createTaskValidation,
  updateTaskValidation,
  handleValidationErrors,
} = require("../middleware/validate");

router.use(protect);

// GET /api/tasks
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {
      status,
      sortBy = "deadline",
      order = "asc",
      page = 1,
      limit = 9,
      deadline_from,
      deadline_to,
    } = req.query;
    const query = { userId };
    if (status) query.status = status;
    // date range filter support (deadline_from, deadline_to as ISO strings)
    if (deadline_from || deadline_to) {
      query.deadline = {};
      if (deadline_from) query.deadline.$gte = new Date(deadline_from);
      if (deadline_to) query.deadline.$lte = new Date(deadline_to);
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    res.json({ tasks, total, page: parseInt(page), limit: parseInt(limit) });
  })
);

// POST /api/tasks
router.post(
  "/",
  createTaskValidation,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { title, description, status, deadline } = req.body;
    const task = await Task.create({
      userId,
      title,
      description,
      status,
      deadline,
    });
    res.status(201).json({ task });
  })
);

// PUT /api/tasks/:id
router.put(
  "/:id",
  updateTaskValidation,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) throw new ApiError(404, "Task not found");
    if (task.userId.toString() !== userId)
      throw new ApiError(403, "Not authorized");
    const updates = req.body;
    const updated = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json({ task: updated });
  })
);

// DELETE /api/tasks/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) throw new ApiError(404, "Task not found");
    if (task.userId.toString() !== userId)
      throw new ApiError(403, "Not authorized");
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  })
);

module.exports = router;
