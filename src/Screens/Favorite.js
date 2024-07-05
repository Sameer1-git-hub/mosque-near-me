import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FavouriteMasjid from '../components/fevmasjids/Fevmasjid';

const Favorite = ({ navigation }) => {
  const token = useSelector(state => state.token);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      if (!token && isFocused) {
        navigation.navigate('Login');
      }
    };
    checkLogin();
  }, [token, isFocused, navigation, dispatch]);

  const handleFavoriteChange = () => {
    setRefresh(!refresh); 
  };

  return (
    <>
      <FavouriteMasjid refresh={refresh} onFavoriteChange={handleFavoriteChange} />
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  text: {
    color: '#494F55',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
});
