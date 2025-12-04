import 'package:intl/intl.dart';

String formatDate(DateTime d) {
  final f = DateFormat('MMM d, yyyy');
  return f.format(d);
}

String relativeDue(DateTime d) {
  final now = DateTime.now();
  final diff = d.difference(now).inDays;
  if (diff == 0) return 'Due today';
  if (diff > 0) return 'Due in $diff days';
  return '${-diff} days overdue';
}
