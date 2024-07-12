import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setToken } from '../../../redux/store/slice/Token';
import { setUser } from '../../../redux/store/slice/Userslice';
import Signinbtn from '../social/Signinbtn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';


const { width, height } = Dimensions.get('window');

const Registerpopup = () => {
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
  const navigation = useNavigation();

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

  return (

    <ScrollView >
      <View style={styles.container}>
        <FontAwesome5 name="mosque" size={100} color={'white'} />
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.titeltext}>Register</Text>
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

          <View style={styles.devideDiv}>
            <Text style={{ color: 'white', bottom: 20 }}>————— Register With —————</Text>
            <Signinbtn />
          </View>
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#123032',
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.99,
    top: 40,
    width: width * 1,
  },
  containerInput: {
    height: height * 0.82,
  },
  input: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15,
    borderColor: '#509494'
  },

  button: {
    backgroundColor: '#5F8575',
    padding: 10,
    alignItems: 'center',
    width: 300,
    marginTop: 15,
    borderRadius: 10

  },
  devideDiv: {
    alignItems: 'center',
    top: 50
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  titeltext: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    position: 'absolute',
    top: 190,
    right: 20,
  },
  toggleButtonC: {
    position: 'absolute',
    top: 248,
    right: 20,
  },
  error: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center'
  },
});

export default Registerpopup;
