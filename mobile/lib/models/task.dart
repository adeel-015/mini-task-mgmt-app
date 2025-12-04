class Task {
  final String id;
  final String userId;
  final String title;
  final String? description;
  final String status;
  final DateTime deadline;
  final DateTime createdAt;
  final DateTime updatedAt;

  Task({required this.id, required this.userId, required this.title, this.description, required this.status, required this.deadline, required this.createdAt, required this.updatedAt});

  factory Task.fromJson(Map<String, dynamic> json) => Task(
    id: json['_id'],
    userId: json['userId'],
    title: json['title'],
    description: json['description'],
    status: json['status'],
    deadline: DateTime.parse(json['deadline']),
    createdAt: DateTime.parse(json['createdAt']),
    updatedAt: DateTime.parse(json['updatedAt']),
  );

  Map<String, dynamic> toJson() => {
    'title': title,
    'description': description,
    'status': status,
    'deadline': deadline.toIso8601String(),
  };

  Task copyWith({String? title, String? description, String? status, DateTime? deadline}) {
    return Task(
      id: id,
      userId: userId,
      title: title ?? this.title,
      description: description ?? this.description,
      status: status ?? this.status,
      deadline: deadline ?? this.deadline,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }
}
