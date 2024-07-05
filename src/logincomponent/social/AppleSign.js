import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import { setToken } from '../../redux/store/slice/Token';
import { setUser } from '../../redux/store/slice/Userslice';


export default function AppleSign() {

    const handleSignInWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
            });
            const Token = credential.identityToken
            const User = credential
            dispatch(setUser(User));
            dispatch(setToken(Token));
        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                // Handle user cancellation
                console.log('User cancelled Apple Sign In.');
            } else {
                // Handle other errors
                console.error('Apple Sign In Error:', e);
            }
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Button onPress={handleSignInWithApple} title='Sign In with Apple' />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 50,
    },
});