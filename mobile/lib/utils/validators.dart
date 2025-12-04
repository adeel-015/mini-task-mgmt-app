String? validateEmail(String? v) {
  if (v == null || v.isEmpty) return 'Email required';
  final re = RegExp(r"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}");
  if (!re.hasMatch(v)) return 'Invalid email';
  return null;
}

String? validatePassword(String? v) {
  if (v == null || v.length < 6) return 'Password must be at least 6 characters';
  return null;
}

String? validateRequired(String? v) {
  if (v == null || v.isEmpty) return 'Required';
  return null;
}
