import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, ActivityIndicator  } from 'react-native';

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      // Add logic to handle password mismatch
      alert('Passwords do not match');
      return;
    }

    // Add your logic to reset the password
    // For example, an API call to your backend

    // On success, navigate back to login or show a success message
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'#fff'}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
          {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#123032',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 300,
    borderRadius: 6
  },
  button: {
    backgroundColor: '#5F8575',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: 200,
    marginBottom: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 17,
  },
});

export default ResetPassword;
