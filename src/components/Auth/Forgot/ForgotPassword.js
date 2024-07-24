import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert  } from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Snackbar.show({
        text: 'Please enter an email address',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://admin.meandmyteam.org/api/forget-password-app', { email });

      console.log(res.data);

      if (res.data.success || res.data.message === 'OTP sent') {
        // Show success alert
        Alert.alert(
          'Check your email',
          'OTP sent to your email',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to OTPScreen after user acknowledges the alert
                navigation.navigate('OTPScreen');
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Snackbar.show({
          text: res.data.message || 'An error occurred',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: error.message || 'An error occurred',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
      />
       
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
        {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Reset</Text>}
      </TouchableOpacity>
    </View>
  );
}

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
    color: 'white',
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
