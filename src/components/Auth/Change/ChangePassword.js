import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import Back from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');

export default function ChangePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currPasswordVisible, setCurrPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [cnfmPasswordVisible, setCnfmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAndChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Snackbar.show({
        text: 'Passwords do not match',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://admin.meandmyteam.org/api/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        Snackbar.show({
          text: 'Password reset successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Dashboard'); // Adjust the navigation target if needed
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
  const backToHome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={backToHome} style={styles.backButton}>
        <Back name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.backButtonText}>Go Home</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Change Password</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!currPasswordVisible}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setCurrPasswordVisible(!currPasswordVisible)}
          >
            <Icon name={currPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!newPasswordVisible}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setNewPasswordVisible(!newPasswordVisible)}
          >
            <Icon name={newPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!cnfmPasswordVisible}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setCnfmPasswordVisible(!cnfmPasswordVisible)}
          >
            <Icon name={cnfmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={validateAndChangePassword} disabled={loading}>
        {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Change Password</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123032',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17,
    marginLeft: 10,
  },
  title: {
    fontSize: 29,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  inputContainer: {
    width: width * 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  toggleButton: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#5F8575',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: width * 0.8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
