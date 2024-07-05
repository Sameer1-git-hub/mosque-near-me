import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/store/slice/Userslice';
import Snackbar from 'react-native-snackbar';

export default function FavButton({ masjidId, onFavoriteChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isMasjidFav = () => {
    return user && user.favoriteMasjids && user.favoriteMasjids.includes(masjidId);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const requestData = {
      masjidId: masjidId,
    };

    const makeRequest = async (retryCount = 0) => {
      try {
        const response = await axios.post(
          'https://admin.meandmyteam.org/api/fav-masjid',
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUser = { ...user };
        if (updatedUser.favoriteMasjids) {
          if (isMasjidFav()) {
            updatedUser.favoriteMasjids = updatedUser.favoriteMasjids.filter(
              (id) => id !== masjidId
            );
          } else {
            updatedUser.favoriteMasjids = [...updatedUser.favoriteMasjids, masjidId];
          }
        } else {
          updatedUser.favoriteMasjids = [masjidId];
        }
        dispatch(setUser(updatedUser));
        if (onFavoriteChange) onFavoriteChange();
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          const delay = Math.pow(2, retryCount) * 1000;
          setTimeout(() => makeRequest(retryCount + 1), delay);
        } else {
          console.error('Error toggling favorite masjid:', error);
          Snackbar.show({
            text: 'Unable to favorite masjid. Please try again later.',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    makeRequest();
  };

  const onClickHandler = () => {
    handleSave();
  };

  return (
    <View>
      <TouchableOpacity onPress={onClickHandler} disabled={isLoading}>
        {isMasjidFav() ? (
          <Icon name={'heart'} size={25} color="red" />
        ) : (
          <Icon name={'heart-o'} size={25} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
