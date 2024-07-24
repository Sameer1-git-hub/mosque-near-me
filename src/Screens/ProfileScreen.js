import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/store/slice/Token';
import { clearUser } from '../redux/store/slice/Userslice';
import { useIsFocused } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Useraddress from '../components/ui/model/Address/Useraddress';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>

      <View style={styles.container}>
        {/* <Switch
          trackColor={{ false: '#767577', true: '#fff' }}
          thumbColor={isEnabled ? '#509494' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}
        <View style={{marginTop: 130}}>
          <View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'left', }}>
            <Text style={styles.infoLabel}>Username :</Text>
            <Text style={styles.name}>{user?.username}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'left', textAlign: 'left' }}>
            <Text style={styles.infoLabel}>Address :</Text>
            <Useraddress />
          </View>

        </View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleLogout} >
          <Text style={styles.outbtn}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} >
          <Text style={styles.Changepass}>Change Password</Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123032',
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 30
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
    textAlign: 'center',
    marginVertical: 50
  },
  Changepass: {
    fontSize: 17,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 50,
  }
});

export default ProfileScreen;
