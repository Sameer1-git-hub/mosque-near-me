import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Googlemap = () => {
    return (
        <View style={styles.MainContainer}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                showsUserLocation={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
                region={{
                    latitude: 28.5995001,
                    longitude: 77.3315623,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>

            </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 780,

    },
});
export default Googlemap