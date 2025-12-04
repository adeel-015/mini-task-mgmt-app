import 'package:flutter/material.dart';
import '../models/task.dart';
import '../utils/date_formatter.dart';

class TaskCardWidget extends StatelessWidget {
  final Task task;
  final void Function(Task) onEdit;
  final void Function(Task) onDelete;

  TaskCardWidget({required this.task, required this.onEdit, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    Color badgeColor;
    if (task.status == 'Done') badgeColor = Colors.green;
    else if (task.status == 'In Progress') badgeColor = Colors.blue;
    else badgeColor = Colors.orange;

    return Card(
      child: ListTile(
        title: Text(task.title),
        subtitle: Text('${task.description ?? ''}\nDue ${formatDate(task.deadline)}'),
        isThreeLine: true,
        trailing: Row(mainAxisSize: MainAxisSize.min, children: [
          IconButton(icon: Icon(Icons.edit), onPressed: () => onEdit(task)),
          IconButton(icon: Icon(Icons.delete), onPressed: () => onDelete(task)),
        ]),
      ),
    );
  }
}
