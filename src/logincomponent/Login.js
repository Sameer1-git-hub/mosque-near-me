import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/store/slice/Token';
import { setUser } from '../redux/store/slice/Userslice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mosque from 'react-native-vector-icons/FontAwesome5';
import Back from 'react-native-vector-icons/Ionicons';
import Signinbtn from './social/Signinbtn';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

function Loginform(props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  const onSubmit = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Please enter your email');
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password');
    }
    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://admin.meandmyteam.org/api/login', { email, password });
      const { token, user } = res.data.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 500);
    } catch (error) {
      const message = error.response?.status === 401 ? 'Invalid email or password' : 'An error occurred. Please try again later.';
      setErrorMessage(message);
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  };

  const backToHome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.outerDiv}>
      <TouchableOpacity onPress={backToHome} style={styles.backButton}>
        <Back name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.backButtonText}>Go Home</Text>
      </TouchableOpacity>
      <Mosque name="mosque" size={100} color="white" style={styles.mosqueIcon} />
      <View style={styles.registrationForm}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        <TouchableOpacity style={styles.toggleButton} onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
          {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <View style={styles.separator}>
          <Text style={styles.separatorText}>————— Sign in With —————</Text>
        </View>
        <Signinbtn />
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.newUserButton}>
          <Text style={styles.newUserText}>New User? Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123032',
  },
  registrationForm: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'white',
  },
  error: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
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
    fontWeight: '900',
    fontSize: 23,
  },
  separator: {
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorText: {
    color: 'white',
  },
  newUserButton: {
    marginTop: 100,
  },
  newUserText: {
    color: 'white',
    paddingVertical: 10,
  },
  toggleButton: {
    position: 'absolute',
    top: 125,
    right: 20,
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
  mosqueIcon: {
    marginVertical: 10,
  },
});

export default Loginform;
