import React, { useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/store/slice/Userslice';
import { setToken } from '../../redux/store/slice/Token';

const WEB_CLIENT_ID = '830517508551-8g0ehnssf6ufcuc7kckh97vtuaj3cmee.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '830517508551-9h7ba3bqqjk544e6d1bss7nc2amb3bdd.apps.googleusercontent.com';

export default function Signinbtn(props) {

  const dispatch = useDispatch();
  const userd = useSelector((state) => state.user);

  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = async () => {
    await GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
      androidClientId: ANDROID_CLIENT_ID,
    });
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      const token = user.idToken

      sendTokenToServer(token);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available or outdated');
      } else {
        console.error('Some other error occurred:', error);
      }
    }
  };


  const sendTokenToServer = async (token) => {
    try {
      const response = await axios.post('https://admin.meandmyteam.org/api/auth/google/CallbackNative', {
        id_token: token
      });
      const token = response.data.data.sub
      dispatch(setUser(response.data.data));
      dispatch(setToken(token));
      setTimeout(() => {
        props.navigation.navigate("Home");
      }, 500);
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}
