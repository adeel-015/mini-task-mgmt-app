import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String email = '';
  String password = '';
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(children: [
            TextFormField(
              decoration: InputDecoration(labelText: 'Email'),
              // Validator prevents empty logins
              validator: (value) => value!.isEmpty ? 'Please enter email' : null,
              onSaved: (s) => email = s ?? ''
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
              validator: (value) => value!.isEmpty ? 'Please enter password' : null,
              onSaved: (s) => password = s ?? ''
            ),
            SizedBox(height: 20),
            
            _isLoading 
            ? CircularProgressIndicator() 
            : ElevatedButton(
                onPressed: () async {
                  // 1. Validate Form
                  if (!_formKey.currentState!.validate()) return;
                  _formKey.currentState!.save();
                  
                  setState(() => _isLoading = true);

                  try {
                    // 2. Attempt Login
                    await auth.login(email, password);
                    
                    if (!mounted) return;

                    // 3. Navigate (Fixing the crash)
                    // We use pushReplacement (direct) instead of Named route to avoid config errors
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (_) => HomeScreen())
                    );
                    
                  } catch (e) {
                    // 4. Print the REAL error to console
                    print("LOGIN ERROR: $e"); 
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: $e')) // Show real error in UI
                    );
                  } finally {
                    if (mounted) setState(() => _isLoading = false);
                  }
                }, 
                child: Text('Login')
              ),
            SizedBox(height: 10),
            TextButton(
              onPressed: () {
                Navigator.of(context).pushNamed('/signup');
              },
              child: Text('Don\'t have an account? Sign up'),
            )
          ]),
        ),
      ),
    );
  }
}