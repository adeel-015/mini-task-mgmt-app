import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';
import '../utils/validators.dart';


class TaskFormScreen extends StatefulWidget {
  final Task? task;
  TaskFormScreen({this.task});

  @override
  _TaskFormScreenState createState() => _TaskFormScreenState();
}

class _TaskFormScreenState extends State<TaskFormScreen> {
  final _formKey = GlobalKey<FormState>();
  String title = '';
  String description = '';
  DateTime? deadline;
  String status = 'Pending';

  @override
  void initState() {
    super.initState();
    if (widget.task != null) {
      title = widget.task!.title;
      description = widget.task!.description ?? '';
      deadline = widget.task!.deadline;
      status = widget.task!.status;
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<TaskProvider>(context);
    return Scaffold(
      appBar: AppBar(title: Text(widget.task != null ? 'Edit Task' : 'New Task')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(children: [
            TextFormField(
              initialValue: title,
              decoration: InputDecoration(labelText: 'Title'),
              validator: validateRequired,
              onSaved: (s) => title = s ?? '',
            ),
            TextFormField(
              initialValue: description,
              decoration: InputDecoration(labelText: 'Description'),
              onSaved: (s) => description = s ?? '',
            ),
            SizedBox(height: 10),
            DropdownButtonFormField<String>(
              value: status,
              items: ['Pending', 'In Progress', 'Done'].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
              onChanged: (v) => setState(() => status = v ?? 'Pending'),
              decoration: InputDecoration(labelText: 'Status'),
            ),
            SizedBox(height: 10),
            TextFormField(
              readOnly: true,
              decoration: InputDecoration(labelText: 'Deadline', hintText: deadline != null ? deadline!.toIso8601String().split('T')[0] : 'Select date'),
              onTap: () async {
                final picked = await showDatePicker(context: context, initialDate: deadline ?? DateTime.now(), firstDate: DateTime(2000), lastDate: DateTime(2100));
                if (picked != null) setState(() => deadline = picked);
              },
              validator: (_) => deadline == null ? 'Please pick a deadline' : null,
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: () async {
                if (!_formKey.currentState!.validate()) return;
                _formKey.currentState?.save();
                final payload = {
                  'title': title,
                  'description': description,
                  'status': status,
                  'deadline': deadline?.toIso8601String(),
                };
                if (widget.task != null) {
                  await provider.updateTask(widget.task!.id, payload);
                } else {
                  await provider.addTask(payload);
                }
                Navigator.of(context).pop(true);
              },
              child: Text('Save'),
            )
          ]),
        ),
      ),
    );
  }
}
