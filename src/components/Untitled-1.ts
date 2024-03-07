// Calculate Distance Between Two Locations in React Native App
// https://aboutreact.com/react-native-calculate-distance-between-two-locations/

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

/*
 * 1. getDistance, Calculates the distance between 
 *    two geo coordinates.
 * 2. getPreciseDistance, Calculates the distance between
 *    two geo coordinates. This method is more accurate then
 *    getDistance, especially for long distances but it is
 *    also slower. It is using the Vincenty inverse formula
 *    for ellipsoids.
 */
import {getDistance, getPreciseDistance} from 'geolib';

const App = () => {
  const calculateDistance = () => {
    var dis = getDistance(
      {latitude: 25.41674592798704, longitude: 77.66401220752996},
      {latitude: 25.41880151309307, longitude: 77.66310443254771},
    );
    alert(
      `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
    );
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: 25.41674592798704, longitude: 77.66401220752996},
      {latitude: 25.41880151309307, longitude: 77.66310443254771},
    );
    alert(
      `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Example to Calculate Distance Between Two Locations
          </Text>
          <Text style={styles.textStyle}>
            Distance between
            {'\n'}
            My Locaiton(25.41674592798704, 77.66401220752996) 
            and 
            Shahi Jama Masjid (25.41880151309307,77.66310443254771)
          </Text>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={calculateDistance}>
            <Text>Get Distance</Text>
          </TouchableHighlight>
          <Text style={styles.textStyle}>
            Precise Distance between
            {'\n'}
            My Locaiton(25.41674592798704, 77.66401220752996) 
            and 
            Shahi Jama Masjid (25.41880151309307,77.66310443254771)
          </Text>
          <Text> hello world</Text>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={calculatePreciseDistance}>
            <Text>
              Get Precise Distance
            </Text>
          </Toucha\ bleHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#dddddd',
    margin: 10,
  },
});

export default App;