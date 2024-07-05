import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';


export default function Exjampels() {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
    <View style={styles.card}>
      <Image source={{ uri: 'https://example.com/your-image.jpg' }} style={styles.image} />
      <Text style={styles.text}>Welcome to My 3D App</Text>
      <Button title="Get Started" buttonStyle={styles.button} />
    </View>
  </LinearGradient>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#3b5998',
    },
  });