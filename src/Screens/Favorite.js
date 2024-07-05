import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
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
    <FavouriteMasjid refresh={refresh} onFavoriteChange={handleFavoriteChange} />
  );
};

export default Favorite;