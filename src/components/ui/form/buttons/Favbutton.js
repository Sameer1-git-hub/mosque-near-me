import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../redux/store/slice/Userslice';
import { useNavigation } from '@react-navigation/native';

export default function FavToggleButton({ masjidId }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    // const favmasjid = useSelector((state) => state.user);
    const token = useSelector((state) => state.user.token);

    const [isFavorite, setIsFavorite] = useState(false);


    // useEffect(() => {
        
    //     setIsFavorite(favmasjid.includes(masjidId.id));
    // }, [favmasjid, masjidId.id]);

    // const onClickHandler = () => {
    //     if (!token) {
    //         navigation.navigate('Login');
    //     } else {
    //         setIsFavorite(prevState => !prevState);
    //     }
    // };


    const color = isFavorite ? "white" : "white";

    return (
        <TouchableOpacity >
            {isFavorite ? (
                <Icon name="heart" size={30} color={color} />
            ) : (
                <Icon name="heart-o" size={30} color={color} />
            )}
        </TouchableOpacity>
    );
}
