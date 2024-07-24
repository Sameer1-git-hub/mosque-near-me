import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Linking, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleVerifyOTP = async () => {
        const otpValue = otp.join('');
        if (otpValue.length < 4) {
            Snackbar.show({
              text: 'Please enter a valid OTP',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
          }
        setLoading(true);
    try {
      const response = await axios.post('https://admin.meandmyteam.org/api/verify-otp', { otp: otpValue });
      
      if (response.data.success) {
        // On success, navigate to the ResetPasswordScreen
        navigation.navigate('ResetPassword');
      } else {
        throw new Error(response.data.message || 'OTP verification failed');
      }
    } catch (error) {
      Snackbar.show({
        text: error.message || 'Failed to verify OTP. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
    };

    const handleChangeText = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputRefs.current[index + 1].focus();
        } else if (!text && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    const openGmail = () => {
        Linking.openURL('https://mail.google.com/mail/u');
        // const gmailUrl = 'https://mail.google.com/mail';
        // Linking.canOpenURL(gmailUrl)
        //     .then((supported) => {
        //         if (supported) {
        //             Linking.openURL(gmailUrl);
        //         } else {
        //             console.log("Don't know how to open URI: " + gmailUrl);
        //         }
        //     })
        //     .catch((err) => console.error('An error occurred', err));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.description}>We sent you a sign in code to your registered email address</Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={digit}
                            onChangeText={(text) => handleChangeText(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleVerifyOTP}
                    accessible={true}
                    accessibilityLabel="Verify OTP"
                >
                    <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20}} onPress={openGmail} >
                    <Text style={[styles.buttonText , {fontSize: 14}]}>Go Mail</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#123032',
        padding: 16,
    },
    title: {
        fontSize: 29,
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
        width: 240,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 16,
    },
    input: {
        height: 50,
        width: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#2B4A44',
        fontSize: 18,
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
        fontWeight: '400',
        fontSize: 17,
    },
});

export default OTPScreen;
