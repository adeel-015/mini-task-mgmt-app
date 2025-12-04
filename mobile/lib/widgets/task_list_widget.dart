import 'package:flutter/material.dart';
import '../models/task.dart';
import 'task_card_widget.dart';

class TaskListWidget extends StatelessWidget {
  final List<Task> tasks;
  final void Function(Task) onEdit;
  final void Function(Task) onDelete;

  TaskListWidget({required this.tasks, required this.onEdit, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    if (tasks.isEmpty) return Center(child: Text('No tasks yet'));
    return ListView.separated(
      itemCount: tasks.length,
      separatorBuilder: (_, __) => Divider(),
      itemBuilder: (context, i) => TaskCardWidget(task: tasks[i], onEdit: onEdit, onDelete: onDelete),
    );
  }
}
