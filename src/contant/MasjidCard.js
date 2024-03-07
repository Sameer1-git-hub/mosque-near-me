// MasjidCard.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'; // Import the styles from the main file

const MasjidCard = ({ masjid }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../imagess/Mosq.jpg')}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        {/* Masjid information rendering logic */}
      </View>
    </View>
  );
};

export default MasjidCard;
