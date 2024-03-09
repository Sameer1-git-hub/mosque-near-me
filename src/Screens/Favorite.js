import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Fevmasjid from '../components/fevmasjids/Fevmasjid';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Crd from '../contant/Crd'
import MyDateTimePicker from '../components/Datetime'
import Userlocation from '../components/location/Userlocation';


const Favorite = ({ navigation }) => {
  const userData = useSelector(state => state.user);
  const Token = userData.token

  const checkLogin = async () => {
    if (!Token) {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <LinearGradient colors={['#ebf4f5', '#b5c6e0',]} >
        <Text style={{
          color: '#494F55',
          fontSize: 40,
          fontWeight: '700',
          textAlign: 'center'
        }}>Favorite Mosque's</Text>
      </LinearGradient>
      <MyDateTimePicker />
      <Userlocation />
    </>
  );
};

export default Favorite;
