import ZoomButtons from '@/components/ZoomButtons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {

  const [zoom, setZoom] = useState(0.01)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{  latitude: 49.20455850994528, 
                          longitude: -0.36739465028753276,
                          latitudeDelta:zoom , 
                          longitudeDelta: zoom,}}
        scrollEnabled={true}  >
      
          <Marker coordinate={{latitude: 49.20455850994528,
                  longitude: -0.36739465028753276}}
                  title={"title"}
                  description={"description"}/>
      </MapView>

      <ZoomButtons zoom={zoom} setZoom={setZoom}/>

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

const markersGoogle = [
  {
    coordinates: {latitude: 49.20455850994528, longitude: -0.36739465028753276},
    title : "Test",
    snippet:"test",
    draggable:true,
  }
]
