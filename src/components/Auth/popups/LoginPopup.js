import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/store/slice/Token';
import { setUser } from '../../../redux/store/slice/Userslice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mosque from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Signinbtn from '../social/Signinbtn';

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

    useEffect(() => {
        if (token) {
            navigation.navigate('Dashboard');
        }
    }, [token, navigation]);

    useEffect(() => {
        if (token) {
            navigation.navigate('Home');
        }
    }, [token]);

    const validateInputs = () => {
        let valid = true;
        if (!email.trim()) {
            setEmailError('Please enter your email');
            valid = false;
        }
        if (!password.trim()) {
            setPasswordError('Please enter your password');
            valid = false;
        }
        return valid;
    };

    const onSubmit = async () => {
        setEmailError('');
        setPasswordError('');
        if (!validateInputs()) return;

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
        <View style={styles.outerDiv}>
            <Mosque name="mosque" size={100} color={'white'} style={styles.mosqueIcon} />
            <View style={styles.registrationForm}>
                <Text style={styles.heading}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        secureTextEntry={!passwordVisible}
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

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

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.devideDiv}>
                    <Text style={styles.devideText}>————— Sign in With —————</Text>
                    <Signinbtn />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#123032',
        width: width * 1,
    },
    mosqueIcon: {
        marginBottom: 20,
    },
    registrationForm: {
        alignItems: 'center',
        width: '80%',
    },
    heading: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 10,
        marginBottom: 14,
        padding: 10,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
        top: 14
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#5F8575',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    forgotPassword: {
        fontSize: 16,
        color: '#f5fefd',
        textAlign: 'center',
        marginVertical: 10,
    },
    devideDiv: {
        alignItems: 'center',
        marginTop: 40,
    },
    devideText: {
        color: 'white',
        marginBottom: 20,
    },
});

