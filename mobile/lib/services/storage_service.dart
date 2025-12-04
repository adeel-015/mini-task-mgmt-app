import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  final _storage = FlutterSecureStorage();

  Future<void> saveToken(String token) => _storage.write(key: 'token', value: token);
  Future<String?> getToken() => _storage.read(key: 'token');
  Future<void> deleteToken() => _storage.delete(key: 'token');

  Future<void> saveUser(String json) => _storage.write(key: 'user', value: json);
  Future<String?> getUser() => _storage.read(key: 'user');
}
