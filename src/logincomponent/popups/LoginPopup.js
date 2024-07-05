import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/store/slice/Token';
import { setUser } from '../../redux/store/slice/Userslice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mosque from 'react-native-vector-icons/FontAwesome5';
import Back from 'react-native-vector-icons/Ionicons';
import Signinbtn from '../social/Signinbtn';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


export default function LoginPopup() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    const checkLogin = async () => {
        if (token) {
            navigation.navigate('Home');
        }
    };
    useEffect(() => {
        if (token) {
            navigation.navigate('Dashboard');
        }
    }, [token]);

    useEffect(() => {
        checkLogin();
    }, []);

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
            const res = await axios.post(
                'https://admin.meandmyteam.org/api/login',
                { email, password }
            );
            const token = res.data.data.token;
            const user = res.data.data.user;
            dispatch(setUser(user));
            dispatch(setToken(token));
            setTimeout(() => {
                navigation.navigate('Home');
            }, 500);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.outer_div}>
            <Mosque name="mosque" size={100} color={'white'} style={{ marginVertical: 10 }} />
            <View style={styles.registration_form}>
                <Text style={styles.heading}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}

                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}

                />
                {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setPasswordVisible(!passwordVisible)}
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
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                <View style={styles.devideDiv}>
                    <Text style={{ color: 'white', bottom: 20 }}>————— Sign in With —————</Text>
                    <Signinbtn />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outer_div: {
        alignItems: 'center',
        backgroundColor: '#123032',
        height: height * 0.85,
        textAlign: 'center',
        width: width * 1,
        justifyContent: 'center'
    },
    registration_form: {
        alignItems: 'center'
    },
    devideDiv: {
        top: 60,
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
        color: 'white'
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 10,
        marginBottom: 14,
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
        backgroundColor: '#5F8575',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: 300,
        top: 20,

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    toggleButton: {
        position: 'absolute',
        top: 135,
        right: 20,
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
});
