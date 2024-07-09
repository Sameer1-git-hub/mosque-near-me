import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currPasswordVisible, setCurrPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [cnfmPasswordVisible, setCnfmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateAndChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirmation do not match');
            return;
        }
        // Add your password change logic here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={!currPasswordVisible}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setCurrPasswordVisible(!currPasswordVisible)}
                    >
                        <Icon name={currPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!newPasswordVisible}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                        <Icon name={newPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!cnfmPasswordVisible}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setCnfmPasswordVisible(!cnfmPasswordVisible)}
                    >
                        <Icon name={cnfmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={validateAndChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    inputContainer: {
        width: width * 0.8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 14,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        height: 50,
        color: 'black',
    },
    toggleButton: {
        marginLeft: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
        width: '80%',
    },
    button: {
        backgroundColor: '#5F8575',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: width * 0.8,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
