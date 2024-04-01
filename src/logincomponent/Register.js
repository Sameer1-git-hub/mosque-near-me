import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/store/slice/Userslice';
import Signinbtn from './social/Signinbtn';
import Mosque from 'react-native-vector-icons/FontAwesome6';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setc_password] = useState('');

  const handleRegister = async () => {
    try {
      if (!name || !username || !email || !password || !c_password) {
        alert('Please fill out all fields');
        return;
      }

      if (password !== c_password) {
        alert("Passwords don't match");
        return;
      }

      // Dispatch action to register user
      dispatch(registerUser({ name, username, email, password, c_password }));

    } catch (error) {
      // Handle errors, e.g., show error message to the user
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#123032', height: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 80 }}>


      <View style={{ alignItems: 'center', marginVertical:5 }}>
        <Mosque name="mosque" size={100} color={'white'} />
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}> Register Here</Text>
      </View>
      <ScrollView >
        <View style={{ alignItems: 'center', }}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={setName}
            error={!name.trim() ? 'Please enter your first name' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='username'
            value={username}
            onChangeText={setusername}
            error={!username.trim() ? 'Please enter your username' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='email'
            value={email}
            onChangeText={setEmail}
            error={!email.trim() ? 'Please enter your @email' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='password'
            value={password}
            onChangeText={setPassword}
            error={!password.trim() ? 'Please enter your password' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='c_password'
            value={c_password}
            onChangeText={setc_password}
            error={!c_password.trim() ? 'Please enter your confirm password' : ''}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister} >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={styles.text}>You have a Account | login</Text>
          </TouchableOpacity>
          <Signinbtn />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
    paddingLeft: 15,
    width: 300,
    borderWidth: 2,
    borderColor: '#509494'
  },
  button: {
    backgroundColor: '#509494',
    padding: 10,
    color: 'white',
    alignItems: 'center',
    borderRadius: 10,
    width: 300,

  },
  buttonText: {
    color: '#123032',
    fontWeight: '900',
    fontSize: 22
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 4,

  }
});

export default Register;
