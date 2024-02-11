import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { fontPixel, pixelSizeVertical } from '../global/responsive'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';



const OnBoarding = () => {
  const navigation = useNavigation()
  const handleClick = async (string) => {
    await playSound();
    try {
      await AsyncStorage.setItem("category", string)
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("chooes")
  }

  const playSound = async () => {
    const soundObject = new Audio.Sound();
  
    try {
      await soundObject.loadAsync(require('../assets/sounds/click.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to load or play sound', error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}><Text style={{color:"yellow"}}>Tic</Text> <Text style={{color:"pink"}}>Tak </Text>Toe</Text>
      <StatusBar translucent barStyle="dark-content" />
      <TouchableOpacity style={styles.computerBtn} onPress={()=>handleClick("computer")}>
        <Text style={styles.titleComputer}><Entypo name="classic-computer" size={18} color="white" /> Play with Computer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.friendBtn} onPress={()=>handleClick("friend")}>
        <Text style={styles.titleComputer}><FontAwesome5 name="user-friends" size={18} color="white" /> Play with Friend</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
    container:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    rowGap:pixelSizeVertical(30),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "darkblue",
    },
    title:{
      fontSize: fontPixel(36),
      fontWeight:"bold",
      color:"red",
      marginBottom: pixelSizeVertical(10)
  
   },
    computerBtn:{
      backgroundColor:"red",
      color:"white",
      borderRadius: fontPixel(50),
      paddingHorizontal:pixelSizeVertical(20),
      paddingVertical:pixelSizeVertical(20),
      borderColor:"white",
      borderWidth:5
    },
    titleComputer:{
      color:"white",
      fontWeight:"bold"
    },
    friendBtn:{
      backgroundColor:"blue",
      color:"white",
      borderRadius:50,
      paddingHorizontal:pixelSizeVertical(25),
      paddingVertical:pixelSizeVertical(20),
      borderColor:"white",
      borderWidth:5
    },
    titleComputer:{
      color:"white",
      fontWeight:"bold"
    }
})