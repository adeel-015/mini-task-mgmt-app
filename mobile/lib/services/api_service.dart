import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../config/constants.dart';
import 'storage_service.dart';
import '../models/task.dart';

class ApiService {
  final StorageService _storage = StorageService();

  Future<Map<String, String>> _headers() async {
    final token = await _storage.getToken();
    final headers = {'Content-Type': 'application/json'};
    if (token != null) headers['Authorization'] = 'Bearer $token';
    return headers;
  }

  Uri _uri(String path) {
    String baseUrl;

    // 2. CHECK WEB FIRST
    if (kIsWeb) {
      // Web always uses localhost (same as iOS/Mac in your constants)
      baseUrl = API.ios; 
    } 
    // 3. THEN Check Android (Only if NOT web)
    else if (Platform.isAndroid) {
      baseUrl = API.android;
    } 
    // 4. Default to iOS/Mac
    else {
      baseUrl = API.ios; 
    }

    return Uri.parse(baseUrl + path);
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      print('Attempting login to: ${_uri('/auth/login')}'); // Debug URL
      final res = await http.post(
        _uri('/auth/login'), 
        headers: await _headers(), 
        body: json.encode({'email': email, 'password': password})
      );
      
      print('Status Code: ${res.statusCode}'); // Debug Status
      print('Body: ${res.body}'); // Debug Body

      if (res.statusCode >= 200 && res.statusCode < 300) {
        return json.decode(res.body);
      } else {
        // Return the actual error message from server if possible
        throw Exception('Server Error: ${res.statusCode} ${res.body}');
      }
    } catch (e) {
      print('Connection Error: $e'); // Debug Connection issues
      rethrow;
    }
  }

  Future<Map<String, dynamic>> signup(String name, String email, String password) async {
    final res = await http.post(_uri('/auth/signup'), headers: await _headers(), body: json.encode({'name': name, 'email': email, 'password': password}));
    if (res.statusCode >= 200 && res.statusCode < 300) return json.decode(res.body);
    throw Exception('Signup failed');
  }

  Future<List<Task>> getTasks() async {
    final res = await http.get(_uri('/tasks'), headers: await _headers());
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final data = json.decode(res.body);
      final List items = data['tasks'] ?? [];
      return items.map((e) => Task.fromJson(e)).toList();
    }
    throw Exception('Failed to fetch tasks');
  }

  Future<Task> createTask(Map<String, dynamic> payload) async {
    final res = await http.post(_uri('/tasks'), headers: await _headers(), body: json.encode(payload));
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final data = json.decode(res.body);
      return Task.fromJson(data['task']);
    }
    throw Exception('Failed to create task');
  }

  Future<Task> updateTask(String id, Map<String, dynamic> payload) async {
    final res = await http.put(_uri('/tasks/$id'), headers: await _headers(), body: json.encode(payload));
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final data = json.decode(res.body);
      return Task.fromJson(data['task']);
    }
    throw Exception('Failed to update task');
  }

  Future<void> deleteTask(String id) async {
    final res = await http.delete(_uri('/tasks/$id'), headers: await _headers());
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    throw Exception('Failed to delete task');
  }
}