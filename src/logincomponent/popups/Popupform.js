import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function Popupform(props) {
  const navigation = useNavigation();


    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setpasswordVisible] = useState(false);




    const userdata = {
        email: email,
        password: password
    }

    const handleSubmit = async () => {
        try {
            // Check if a token is already stored


            const response = await axios.post(
                'http://admin.meandmyteam.org/api/login',
                userdata
            );


            if (response.data) {
                const { success, message, data } = response.data;
                const token = data.name;


                // Store the token
                await AsyncStorage.setItem('token', token);


                if (success === true) {
                    setSuccessMessage(message);
                    setTimeout(() => {
                        setLoading(false);
                        if (token) {
                            props.navigation.navigate('Home');
                        }
                    }, 2000);
                } else {
                    setValidationErrors(message);
                    // No need to remove the token here
                }
            } else {
                setErrorMessage('An error occurred: Unexpected response format');
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const existingToken = await AsyncStorage.getItem('token');
            if (existingToken) {
                // If a token is found, navigate to the 'Home' screen immediately
                props.navigation.navigate('Home');
            }
        };

        checkToken();

    }, []);

    return (

        <View style={styles.outer_div}>

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
                >

                </TextInput>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setpasswordVisible(!passwordVisible)}
                >
                    {/* You can use an icon or text for the button */}
                    <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>




                {validationErrors && <Text style={styles.error}>{validationErrors}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}

                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outer_div: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#123032',
        height: 400,
        textAlign: 'center',
        width: 350,


    },

    heading: {
        textAlign: 'center',
        fontSize: 20,
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
        color: 'red',
        marginBottom: 10,
        padding: 6,
        fontSize: 16,
        width: 290,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#7dc4c1',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: 300,

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    pt3: {
        paddingTop: 15,
    },
    newUserText: {
        textAlign: 'center',
        flexDirection: 'row',
        color: 'white',
        padding: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    toggleButton: {
        position: 'absolute',
        top: 102,
        right: 20,
    },

});
