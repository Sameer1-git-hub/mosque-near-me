import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Favicon() {
    const [isFavorite, setIsFavorite] = useState(false);
    const color = '#ffffff';

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleFavorite}>
                {isFavorite ? (
                    <Icon name="heart" size={30} color={color} />
                ) : (
                    <Icon name="heart-o" size={30} color={color} />
                )}
            </TouchableOpacity>
        </View>
    );
}
