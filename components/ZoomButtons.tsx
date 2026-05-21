import { Pressable, StyleSheet, Text } from "react-native";


type Props = {
    zoom: number,
    setZoom: (value: number) => void;
}

export default function ZoomButtons({zoom, setZoom} : Props){
    return(
        <>
            <Pressable style={styles.zoomButton} onPress={()=>{setZoom(Math.max(0.005, zoom - 0.005))}}>
                <Text style={styles.addZoom}>+</Text>
            </Pressable>
            <Pressable style={[styles.zoomButton, {top:40}]}  onPress={()=>{setZoom(zoom + 0.005)}}>
                <Text  style={styles.removeZoom}>-</Text>
            </Pressable>
        </>

    );
}

const styles = StyleSheet.create({
  zoomButton:{
    backgroundColor:"white",
    borderWidth:1,
    position:"absolute",
    width: 40,   // plus grand
    height: 40,  // plus grand
    alignItems:"center",
    justifyContent:"center",

  },
  addZoom:{
    fontSize:30,
  },
  removeZoom:{
    fontSize:30,
  }
});