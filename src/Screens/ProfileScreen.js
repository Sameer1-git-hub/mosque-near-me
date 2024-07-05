import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/store/slice/Token';
import { clearUser } from '../redux/store/slice/Userslice'
import { useIsFocused } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Useraddress from '../components/ui/model/Address/Useraddress';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const user2 = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  const isFocused = useIsFocused();

  useEffect(() => {
    const checkLogin = async () => {
      if (!token && isFocused) {
        navigation.navigate('Login');
      }
    };
    checkLogin();
  }, [token, isFocused, navigation]);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    GoogleSignin.signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
          <Text style={styles.infoLabel}>Username :</Text>
          {user?.username ? (
            <Text style={styles.name}>{user.username}</Text>
          ) : (
            <Text style={styles.name}>{user2?.name}</Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
          <Text style={styles.infoLabel}>Address :</Text>
          <Useraddress />
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout} >
        <Text style={styles.outbtn}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#123032',
    height: '100%'
  },
  name: {
    fontWeight: 'bold',
    color: '#DCDCDC',
    fontSize: 25,
  },
  infoLabel: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  outbtn: {
    fontSize: 30,
    color: '#123032',
    fontWeight: '800',
    backgroundColor: '#f5fefd',
    borderColor: '#123032',
    borderWidth: 1,
    padding: 8,
    borderRadius: 30,
    width: 150,
    textAlign: 'center'
  }
});


export default ProfileScreen;
