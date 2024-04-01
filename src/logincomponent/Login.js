import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/store/slice/Token'; // Assuming you have created tokenSlice as described in the previous answer
import { setUser } from '../redux/store/slice/Userslice'; // Assuming you have created tokenSlice as described in the previous answer
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mosque from 'react-native-vector-icons/FontAwesome6';
import Signinbtn from './social/Signinbtn';

function Loginform(props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [validationErrors, setValidationErrors] = useState();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setpasswordVisible] = useState(false);


  const dispatch = useDispatch();
  const userd = useSelector((state) => state.token);

  const formData = {
    email: email,
    password: password
  }

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'https://admin.meandmyteam.org/api/login',
        formData
      );
      const token = res.data.data.token;
      const user = res.data.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      setTimeout(() => {
        props.navigation.navigate("Home");
      }, 500);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <View style={styles.outer_div}>
      <Mosque name="mosque" size={100} color={'white'} style={{ marginVertical: 10 }} />
      <View style={styles.registration_form}>
        <Text style={styles.heading}>Login Your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setemail}
          error={!email.trim() ? 'Please enter your email' : ''}
        />

        {validationErrors && <Text style={styles.error}>{validationErrors}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          error={!password.trim() ? 'Please enter your password' : ''}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setpasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} />
        </TouchableOpacity>

        {loading ? (
          <TouchableOpacity style={styles.button}>
            <ActivityIndicator size="large" color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => props.navigation.navigate("Register")} >
          <Text style={styles.newUserText}>New User? Create an account</Text>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <Signinbtn />
    </View>
  );
}

const styles = {
  outer_div: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#509494'
  },
  registration_form: {
    alignItems: 'center'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    color: 'white'
  },
  input: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
    width: 300,
  },
  error: {
    color: '#FF0000',
    marginBottom: 10,
    fontSize: 16,
    width: 300,
  },
  button: {
    backgroundColor: '#123032',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: 300,
  },
  buttonText: {
    color: '#509494',
    fontWeight: '900',
    fontSize: 23
  },
  pt3: {
    paddingTop: 15,
  },
  newUserText: {
    flexDirection: 'row',
    color: 'white',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  toggleButton: {
    position: 'absolute',
    top: 115,
    right: 20,
  },
};

export default Loginform;
