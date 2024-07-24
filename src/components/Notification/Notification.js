import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const NotificationCard = () => {
  const pan = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.dy < 0 ? -Math.sqrt(-gestureState.dy) : gestureState.dy;

        Animated.event([null, { dy: pan }], {
          useNativeDriver: false,
        })(_, { dy: newY });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Dragging exceeds threshold, animate pane out of screen
          Animated.timing(pan, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // Dragging is less than threshold, animate pane back to the start position
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.timing(pan, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, { transform: [{ translateY: pan }] }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>Zohar</Text>
        <Text style={styles.body}>Time to offer Zohar</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  card: {
    backgroundColor: '#113',
    borderRadius: 30,
    elevation: 5, 
    height: 80,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  body: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
});

export default NotificationCard;
