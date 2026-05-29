import ZoomButtons from '@/components/ZoomButtons';
import { getNextPoint, getUserLocation } from '@/functions/orientation';
import * as Location from 'expo-location';
import { getDistance } from "geolib";
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {

  const [zoom, setZoom] = useState(0.01)
  const [position, setPosition] = useState({latitude : 49.20455850994528, longitude:  -0.36739465028753276});
  const [userPosition, setUserPosition] = useState({latitude : 49.20455850994528, longitude:  -0.36739465028753276});

  const positionRef = useRef(position);
  const mapRef = useRef(null);

  useEffect(() => {
  positionRef.current = position;
}, [position]);


  /*
  useEffect(() => { ... }, [])        // une seule fois au montage  = Awake/Start
  useEffect(() => { ... }, [zoom])    // à chaque fois que zoom change = Update conditionnel
  useEffect(() => { ... })    
  */
  useEffect(() => { //equivalent d'un awake

    let subscription: Location.LocationSubscription;
    const start = async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          console.log("new pos");

          const userLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };


          setUserPosition(userLocation);

          const distance = getDistance(positionRef.current, userLocation);
          
          console.log(" next ? " + (distance <= 1000) + " : " +distance);
          if(distance <= 1000) {
            console.log("distance reach : " + distance);
          setPosition(prev => getNextPoint(prev));
            console.log("next point");
          }



        }
      );
    };

    start();


      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
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
        if(userLocation) setPosition(getNextPoint(userLocation));
        if(userLocation) setUserPosition(userLocation);
          }}
      >
        <Text>RESET</Text>
      </Pressable>

		<Pressable style={styles.recenter} onPress={ async ()=>{
          const userLocation = await getUserLocation();
          if(userLocation){
            setUserPosition(userLocation);
            mapRef.current?.animateToRegion({
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta:zoom,
              longitudeDelta:zoom
            }, 500);}}
		}>
			<Image source={require("@/assets/images/recenter.png")} style={{ width: 30, height: 30 }}/>
		</Pressable>

    		<Pressable style={styles.target} onPress={() =>{
            mapRef.current?.animateToRegion({
              latitude: positionRef.current.latitude,
              longitude: positionRef.current.longitude,
              latitudeDelta:zoom,
              longitudeDelta:zoom
            }, 500);
        }


		}>
			<Image source={require("@/assets/images/target.png")} style={{ width: 30, height: 30 }}/>
		</Pressable>

		<Text style={styles.distance}>{getDistance(position, userPosition)}m</Text>

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
    bottom:60,
  },

    reset:{
    backgroundColor:"white",
    borderWidth:1,
    position:"absolute",
    width: 50,   
    height: 40, 
    alignItems:"center",
    justifyContent:"center",
    left:25,
    bottom:60,
  },
  recenter:{
    borderWidth:1,
    position:"absolute",
    width: 50,   
    height: 40,  
    alignItems:"center",
    justifyContent:"center",
    right:25,
    bottom:60,
  },
    target:{
    borderWidth:1,
    position:"absolute",
    width: 50,   
    height: 40,  
    alignItems:"center",
    justifyContent:"center",
    right:25,
    bottom:120,
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
  },
  distance:{
    position:"absolute",
    width: 150,  
    height: 60, 
	fontSize:40,
	textAlign:"center",
	textAlignVertical:"center",
	backgroundColor:"white",
    right:0,

  }
});


const markersGoogle = [
  {
    coordinates: {latitude: 49.20455850994528, longitude: -0.36739465028753276},
    title : "Test",
    snippet:"test",
  }
]
