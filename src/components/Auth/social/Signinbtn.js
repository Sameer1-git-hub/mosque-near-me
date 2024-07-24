import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/store/slice/Userslice';
import { setToken } from '../../../redux/store/slice/Token';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const WEB_CLIENT_ID = '813670319842-8k2qq4uqqnaa4u4755ufd36gfd7d8ine.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '813670319842-p39oce0teqsaa13hf71v5pp9grttu59f.apps.googleusercontent.com';

export default function Signinbtn() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = async () => {
    await GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      androidClientId: ANDROID_CLIENT_ID,
    });
  };

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      const token = data.idToken;
      sendTokenToServer(token);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showSnackbar('Login cancelled. Please try again.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showSnackbar('Sign-in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showSnackbar('Google Play services are not available or outdated.');
      } else {
        showSnackbar('An error occurred: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendTokenToServer = async (token) => {
    try {
      const response = await axios.post('https://admin.meandmyteam.org/api/auth/google/CallbackNative', {
        id_token: token,
      });
      const Token = response.data.data.token
      const User = response.data.data.user
      dispatch(setUser(User));
      dispatch(setToken(Token));
      setTimeout(() => {
        navigation.navigate("Home");
      }, 500);
    } catch (error) {
      showSnackbar('Failed to send authentication ' + error);
    }
  };

  const showSnackbar = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <View>
      {loading ? (
        <TouchableOpacity>
          <ActivityIndicator size="large" color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signIn}>
          <Image
            source={require('../../../assets/imagess/google_icon.png')}
            style={{ width: 35, height: 35, borderRadius: 30 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}