import ZoomButtons from '@/components/ZoomButtons';
import { getNextPoint, getUserLocation } from '@/functions/orientation';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {

  const [zoom, setZoom] = useState(0.01)
  const [position, setPosition] = useState({latitude : 49.20455850994528, longitude:  -0.36739465028753276});
  const [userPosition, setUserPosition] = useState({latitude : 49.20455850994528, longitude:  -0.36739465028753276});

  /*
  useEffect(() => { ... }, [])        // une seule fois au montage  = Awake/Start
  useEffect(() => { ... }, [zoom])    // à chaque fois que zoom change = Update conditionnel
  useEffect(() => { ... })    
  */
  useEffect(() => { //equivalent d'un awake
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

        const userLocation = await getUserLocation();
        if(userLocation) setPosition(userLocation);
        if(userLocation) setUserPosition(userLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{  latitude:49.20455850994528, 
                          longitude: -0.36739465028753276,
                          latitudeDelta:zoom , 
                          longitudeDelta: zoom,}}
        scrollEnabled
        pitchEnabled
        rotateEnabled  
        >
      
          <Marker coordinate={{latitude: position.latitude,
                  longitude: position.longitude}}
                  title={"title"}
                  description={"description"}
                    draggable={true}
                  />

          <Marker coordinate={userPosition}> 
            <View style ={styles.outerUserCircle}>
              <View style ={styles.innerUserCircle}></View>   
              </View>        
          </Marker>
      </MapView>

      <ZoomButtons zoom={zoom} setZoom={setZoom}/>

      <Pressable style={styles.nextPoint} onPress={() => {setPosition(getNextPoint(position))}}>
        <Text>NEXT</Text>
      </Pressable>

      
      <Pressable style={styles.reset} onPress={async () => {
        const userLocation = await getUserLocation();
        if(userLocation) setPosition(userLocation);
      }
    }>
        <Text>RESET</Text>
      </Pressable>

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
  nextPoint:{
    backgroundColor:"white",
    borderWidth:1,
    position:"absolute",
    width: 200,   // plus grand
    height: 40,  // plus grand
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    bottom:50,
  },

    reset:{
    backgroundColor:"white",
    borderWidth:1,
    position:"absolute",
    width: 50,   // plus grand
    height: 40,  // plus grand
    alignItems:"center",
    justifyContent:"center",
    left:25,
    bottom:50,
  },
  outerUserCircle:{
    width : 20,
    height: 20,
    borderRadius : 10,
    backgroundColor:"white",
    borderWidth: 3,

    borderColor : "blue",

    alignItems: "center",
    justifyContent: "center",
  },
  innerUserCircle:{
        width : 10,
    height: 10,
    borderRadius : 5,
    backgroundColor:"blue"
  }
});

const markersGoogle = [
  {
    coordinates: {latitude: 49.20455850994528, longitude: -0.36739465028753276},
    title : "Test",
    snippet:"test",
  }
]
