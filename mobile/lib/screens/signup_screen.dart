import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class SignupScreen extends StatefulWidget {
  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  String name = '';
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    return Scaffold(
      appBar: AppBar(title: Text('Sign Up')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(children: [
            TextFormField(decoration: InputDecoration(labelText: 'Name'), onSaved: (s) => name = s ?? ''),
            TextFormField(decoration: InputDecoration(labelText: 'Email'), onSaved: (s) => email = s ?? ''),
            TextFormField(decoration: InputDecoration(labelText: 'Password'), obscureText: true, onSaved: (s) => password = s ?? ''),
            SizedBox(height: 20),
            ElevatedButton(onPressed: () async {
              _formKey.currentState?.save();
              try {
                await auth.signup(name, email, password);
                Navigator.of(context).pushReplacementNamed('/home');
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Signup failed')));
              }
            }, child: Text('Sign Up')),
            SizedBox(height: 10),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Already have an account? Login'),
            )
          ]),
        ),
      ),
    );
  }
}
