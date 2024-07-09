import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handleForgotPassword = () => {
    // Add your logic to send a password reset request
    // For example, an API call to your backend

    // On success, navigate to the next screen (optional)
    navigation.navigate('OTPScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={'#fff'}
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
          {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Reset</Text>}
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
    width: 300,
    marginBottom: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 17,
  },
});