import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';

class AuthProvider extends ChangeNotifier {
  final ApiService _api = ApiService();
  final StorageService _storage = StorageService();

  String? token;
  Map<String, dynamic>? user;
  bool loading = false;

  Future<void> login(String email, String password) async {
    loading = true; notifyListeners();
    final res = await _api.login(email, password);
    token = res['token'];
    user = res['user'];
    await _storage.saveToken(token!);
    await _storage.saveUser(user.toString());
    loading = false; notifyListeners();
  }

  Future<void> signup(String name, String email, String password) async {
    loading = true; notifyListeners();
    final res = await _api.signup(name, email, password);
    token = res['token'];
    user = res['user'];
    await _storage.saveToken(token!);
    await _storage.saveUser(user.toString());
    loading = false; notifyListeners();
  }

  Future<void> logout() async {
    token = null; user = null;
    await _storage.deleteToken();
    notifyListeners();
  }
}
