import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';




const Registerpopup = (props) => {
  const [name, setName] = useState('');
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setc_password] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigation = useNavigation();




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
  
      const response = await axios.post('http://admin.meandmyteam.org/api/register-api', {
        name,
        username,
        email,
        password,
        c_password,
      });
  
      if (response.data.success) {
        props.navigation.navigate('Home');
      } else {
        console.log('Registration failed:', response.data.error);
      }

    } catch (error) {
      console.error('Registration error:', error);
    }
    if (password !== c_password) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
  };

  return (
    <View style={{ backgroundColor: '#123032', width:350, padding:15, }}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}> Register Here</Text>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={setName}
            error={!name.trim() ? 'Please enter your first name' : ''}
          />
        
          <TextInput
            style={styles.input}
            placeholder='User Name'
            value={username}
            onChangeText={setusername}
            error={!username.trim() ? 'Please enter your last name' : ''}
          />

          <TextInput
            style={styles.input}
            placeholder='Email '
            KeyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={!email.trim() ? 'Please enter your email' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            error={!password.trim() ? 'Please enter your password' : ''}
          />
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            secureTextEntry={true}
            value={c_password}
            onChangeText={setc_password}
            error={password !== c_password ? 'Passwords do not match' : ''}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister} >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          {!passwordsMatch && <Text style={{ color: 'red' }}>Passwords do not match</Text>}
        </View>

        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  input: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
    width: 300,
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
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default Registerpopup;
