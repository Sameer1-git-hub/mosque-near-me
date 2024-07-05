import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Location({ masjid }) {

  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateAnim, {
        toValue: -200,
        duration: 8000,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [translateAnim]);

  return (
    <View style={styles.container}>
      <Icon name="location-sharp" size={22} color="#509494" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <Animated.View style={{ transform: [{ translateX: translateAnim }] }}>
          <Text style={styles.text}>{masjid.address}</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#123032',
    height: height * 0.05,
    width: width * 0.5,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  scrollViewContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    color: '#509494',
  },
});
