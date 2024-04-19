import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.4167615004661,
          longitude: 77.66476698187174,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 25.4167615004661, longitude: 77.66476698187174 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
}
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      map: {
        flex: 1,
      },
    });
