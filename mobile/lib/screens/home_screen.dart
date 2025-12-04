import 'task_form_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/task_provider.dart';
import '../providers/auth_provider.dart';
import '../widgets/task_list_widget.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<TaskProvider>(context, listen: false).fetchTasks();
    });
  }

  @override
  Widget build(BuildContext context) {
    final tasks = Provider.of<TaskProvider>(context);
    final auth = Provider.of<AuthProvider>(context);
    return Scaffold(
      appBar: AppBar(title: Text('Tasks'), actions: [IconButton(icon: Icon(Icons.logout), onPressed: () async { await auth.logout(); Navigator.of(context).pushReplacementNamed('/login'); })]),
      body: tasks.loading
          ? Center(child: CircularProgressIndicator())
          : TaskListWidget(
              tasks: tasks.tasks,
              onEdit: (t) async {
                final res = await Navigator.of(context).push(MaterialPageRoute(builder: (_) => TaskFormScreen(task: t)));
                if (res == true) {
                  await Provider.of<TaskProvider>(context, listen: false).fetchTasks();
                }
              },
              onDelete: (t) async {
                final confirmed = await showDialog<bool>(context: context, builder: (_) => AlertDialog(title: Text('Delete'), content: Text('Delete this task?'), actions: [TextButton(onPressed: () => Navigator.of(context).pop(false), child: Text('Cancel')), TextButton(onPressed: () => Navigator.of(context).pop(true), child: Text('Delete'))]));
                if (confirmed == true) {
                  await Provider.of<TaskProvider>(context, listen: false).deleteTask(t.id);
                }
              }),
      floatingActionButton: FloatingActionButton(
          onPressed: () async {
            final res = await Navigator.of(context).push(MaterialPageRoute(builder: (_) => TaskFormScreen()));
            if (res == true) {
              await Provider.of<TaskProvider>(context, listen: false).fetchTasks();
            }
          },
          child: Icon(Icons.add)),
    );
  }
}
