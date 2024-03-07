import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/store/slice/Token';
import {clearUser} from '../redux/store/slice/Userslice'

const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);


  const checkLogin = async () => {
    if (!token) {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    navigation.navigate('Login');
  };




  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../assets/imagess/img.jpg')}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Username -</Text>
            <Text style={styles.infoLabel}>Email -</Text>
            <Text style={styles.infoLabel}>Location -</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user?.username}</Text>
            <Text style={[styles.infoValue, { marginTop: 20 }]}>{user?.email}</Text>

          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123032',
    height: '100%'
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#0B7955'
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
  },
  infoContainer: {
    marginBottom: 10,

  },
  infoLabel: {
    marginTop: 20,
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  infoValue: {
    fontSize: 17,
    color: 'white',
    width: 220,
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
