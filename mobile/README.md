# Mini Task Management — Mobile

Flutter mobile app for Mini Task Management.

Navigation flow

- `/login` — Login screen
- `/signup` — Signup screen
- `/home` — Home / task list

API configuration

The mobile app uses `lib/config/constants.dart` to set the API base URL. Use `API.android` when running on the Android emulator (10.0.2.2), `API.ios` for the iOS simulator, or set the device's IP for physical devices.

Setup

1. Install Flutter SDK (3.0+)
2. `flutter pub get`
3. Configure API URL in `lib/config/constants.dart`
4. Run on emulator / device:

   - Android emulator: `flutter run`
   - iOS simulator: `flutter run` (on macOS with Xcode)

Authentication & storage

JWT tokens are stored in `flutter_secure_storage` via `lib/services/storage_service.dart`. The `AuthProvider` reads and writes tokens and user info to that storage.

Notes & caveats

- For Android emulator use `http://10.0.2.2:5001/api` as the backend URL.
- For physical devices use your machine IP (e.g., `http://192.168.x.y:5001/api`).
