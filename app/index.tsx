import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default function Map() {
  return (
    <View style={styles.container}>
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: 49.20455850994528,
      longitude: -0.36739465028753276,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}//49.20455850994528, -0.36739465028753276
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
