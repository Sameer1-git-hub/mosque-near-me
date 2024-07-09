import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setToken } from '../redux/store/slice/Token';
import { setUser } from '../redux/store/slice/Userslice';
import Back from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';

import Signinbtn from './social/Signinbtn';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    c_password: ''
  });

  const handleRegister = async () => {
    let error = false;
    const newErrors = {
      name: !name ? 'Please enter your name' : '',
      username: !username ? 'Please enter your username' : '',
      email: !email ? 'Please enter your email' : '',
      password: !password ? 'Please enter your password' : '',
      c_password: !c_password ? 'Please enter your confirm password' : ''
    };
  
    if (password !== c_password) {
      newErrors.c_password = "Passwords don't match";
      error = true;
    }
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some(error => error)) {
      error = true;
    }
  
    if (error) return;
  
    try {
      setLoading(true);
      const res = await axios.post(
        'https://admin.meandmyteam.org/api/register-api',
        { name, username, email, password, c_password }
      );
      console.log('Response:', res.data);
      if (res.data && res.data.data) {
        const { token, user } = res.data.data;
        if (token && user) {
          dispatch(setUser(user));
          dispatch(setToken(token));
          setTimeout(() => {
            navigation.navigate('Dashboard');
          }, 500);
        } else {
          const message = 'Token or user data missing in response';
          console.error(message);
          Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } else if (res.data && res.data.message && res.data.message.email) {
        const message = res.data.message.email[0];
        console.error(message, res.data);
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        const message = 'An unexpected error occurred';
        console.error(message, res.data);
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      const message = 'Registration error: ' + error.message;
      console.error(message);
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const Backtohome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={Backtohome} style={styles.backbutton}>
          <Back name="arrow-back-circle" size={30} color={'white'} />
          <Text style={styles.backbuttonText}>Go Home</Text>
        </TouchableOpacity>
        <View style={styles.firstChild}>
          <FontAwesome5 name="mosque" size={100} color={'white'} />
          <Text style={styles.titelText}>Register</Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={[styles.input, !!errors.name && styles.errorInput]}
            placeholder='Name'
            value={name}
            onChangeText={setName}
          />
          {!!errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <TextInput
            style={[styles.input, !!errors.username && styles.errorInput]}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
          />
          {!!errors.username && <Text style={styles.error}>{errors.username}</Text>}
          <TextInput
            style={[styles.input, !!errors.email && styles.errorInput]}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />
          {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={[styles.input, !!errors.password && styles.errorInput]}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
          {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <TextInput
            style={[styles.input, !!errors.c_password && styles.errorInput]}
            placeholder='Confirm Password'
            value={c_password}
            onChangeText={setCPassword}
            secureTextEntry={!cPasswordVisible}
          />
          <TouchableOpacity
            style={styles.toggleButtonC}
            onPress={() => setCPasswordVisible(!cPasswordVisible)}
          >
            <Icon name={cPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
          {!!errors.c_password && <Text style={styles.error}>{errors.c_password}</Text>}
          {loading ? (
            <TouchableOpacity style={styles.button}>
              <ActivityIndicator size="large" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
          <View style={styles.pt3}>
            <Text style={{ color: 'white' }}>————— Register With —————</Text>
          </View>
          <Signinbtn />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}
            style={{
              top: 40
            }}>
            <Text style={styles.text}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#123032',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80
  },
  firstChild: {
    alignItems: 'center',
    marginVertical: 5
  },
  titelText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 15
  },
  containerInput: {
    alignItems: 'center',
    height: 600
  },
  input: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
    paddingLeft: 15,
    width: 300,
    marginVertical: 6
  },
  errorInput: {
    borderColor: 'red'
  },
  error: {
    color: 'red',
  },
  button: {
    backgroundColor: '#5F8575',
    padding: 10,
    color: 'white',
    alignItems: 'center',
    borderRadius: 10,
    width: 300,
    marginTop: 20

  },
  backbutton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backbuttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 22
  },
  pt3: {
    alignItems: 'center',
    top: 15,
    marginBottom: 30

  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 4,
  },
  toggleButton: {
    position: 'absolute',
    top: 203,
    right: 20,
  },
  toggleButtonC: {
    position: 'absolute',
    top: 263,
    right: 20,
  },
  
});

export default Register;
