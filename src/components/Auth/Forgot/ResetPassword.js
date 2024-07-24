import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Snackbar.show({
        text: 'Passwords do not match',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    if (!password || !confirmPassword) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://admin.meandmyteam.org/api/reset-password', { password });

      if (response.data.success) {
        Snackbar.show({
          text: 'Password reset successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Login'); // Adjust the navigation target if needed
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      Snackbar.show({
        text: error.message || 'Failed to reset password. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 300,
    borderRadius: 6,
    color: '#fff',
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
