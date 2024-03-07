import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect }  from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Location({ masjid }) {

  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        translateAnim,
        {
          toValue: -100, // Adjust this value to control the speed of scrolling
          duration: 5000, // Adjust this value to control the duration of scrolling
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  return (
    <View style={styles.addressviw}  >
      <Icon name={'location-sharp'} size={30} color={'#509494'} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
         <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: translateAnim }],
        }}>
        <Text style={styles.addressviwtext}>{masjid.address}</Text>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  addressviw: {
    backgroundColor: '#123032',
    height: 50,
    width: 230,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    overflow: 'hidden',
  },
  addressviwtext: {
    fontSize: 20,
    color: '#509494',
    overflow: 'scroll',
  },
})