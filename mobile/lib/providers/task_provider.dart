import 'package:flutter/material.dart';
import '../models/task.dart';
import '../services/api_service.dart';

class TaskProvider extends ChangeNotifier {
  final ApiService _api = ApiService();
  List<Task> tasks = [];
  bool loading = false;

  Future<void> fetchTasks() async {
    loading = true; notifyListeners();
    tasks = await _api.getTasks();
    loading = false; notifyListeners();
  }

  Future<void> addTask(Map<String, dynamic> payload) async {
    final task = await _api.createTask(payload);
    tasks.insert(0, task);
    notifyListeners();
  }

  Future<void> updateTask(String id, Map<String, dynamic> payload) async {
    final updated = await _api.updateTask(id, payload);
    tasks = tasks.map((t) => t.id == id ? updated : t).toList();
    notifyListeners();
  }

  Future<void> deleteTask(String id) async {
    await _api.deleteTask(id);
    tasks.removeWhere((t) => t.id == id);
    notifyListeners();
  }
}
