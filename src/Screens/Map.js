import { View, Text } from 'react-native'
import React from 'react'
import Googlemap from '../components/maps/Googlemap'
import MapScreen from '../components/maps/MapScreen'


export default function Map() {
  return (
    <View>
      <Text>Map</Text>
      <MapScreen />
    </View>
  )
}