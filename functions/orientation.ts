
import * as Location from 'expo-location';

export function getNextPoint(position : {latitude : number; longitude: number}) : {latitude : number; longitude: number} {
    const distance = 0.025;
    return {
        longitude: position.longitude + (Math.random() - 0.5) * distance,
        latitude: position.latitude + (Math.random() - 0.5) * distance,
    };
}

export async function getUserLocation(){
        try {
          const location = await Location.getLastKnownPositionAsync ({});
          if(location != null){
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
          }
          } catch (e) {
            return { latitude: 49.20455850994528, longitude: -0.36739465028753276, };
          }
}

//d=2Rarcsin(sin2(2φ2​−φ1​​)+cos(φ1​)cos(φ2​)sin2(2λ2​−λ1​​))