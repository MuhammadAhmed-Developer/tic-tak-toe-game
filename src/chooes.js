import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { fontPixel, heightPixel, pixelSizeVertical, widthPixel } from '../global/responsive'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const ChooesLetter = () => {
    const navigation = useNavigation()
    const handleSelect = async (letter) => {
        playSound();
        try {
          await AsyncStorage.setItem("Letter", letter)
        } catch (error) {
          console.log(error)
        }
        navigation.navigate("Game")
    }

    const playSound = async () => {
        const soundObject = new Audio.Sound();
    
        try {
          await soundObject.loadAsync(require('../assets/sounds/click.mp3'));
          await soundObject.playAsync();
        } catch (error) {
          console.error('Failed to load sound', error);
        }
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}><Text style={{ color: "yellow" }}>Tic</Text> <Text style={{ color: "pink" }}>Tak </Text>Toe</Text>
            <StatusBar translucent barStyle="dark-content" />
            <Text style={styles.chooes}>Chooes Your Letter</Text>
            <View style={{ display: 'flex', flexDirection: "row", gap: 30 }}>
                <TouchableOpacity style={styles.computerBtn} onPress={()=>handleSelect("O")}>
                    <Text style={styles.titleComputer}>O</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.friendBtn} onPress={()=>handleSelect("S")}>
                    <Text style={styles.titleComputer}>S</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChooesLetter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: pixelSizeVertical(30),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "darkblue",
    },
    title: {
        fontSize: fontPixel(36),
        fontWeight: "bold",
        color: "red",
        marginBottom: pixelSizeVertical(10)
    },
    computerBtn: {
        backgroundColor: "red",
        color: "white",
        borderRadius: 50,
        height: heightPixel(70),
        width:widthPixel(70),
        borderColor: "white",
        borderWidth: 5,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
    },
    titleComputer: {
        color: "white",
        fontWeight: "bold",
        fontSize:fontPixel(30)
    },
    friendBtn: {
        _backgroundColor: "blue",
        get backgroundColor() {
            return this._backgroundColor
        },
        set backgroundColor(value) {
            this._backgroundColor = value
        },
        color: "white",
        borderRadius: 50,
        height: heightPixel(70),
        width: widthPixel(70),
        borderColor: "white",
        borderWidth: 5,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
    },
    chooes: {
        color: "white",
        fontSize: fontPixel(20),
        fontWeight: 'bold',
    }
})