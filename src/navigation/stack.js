import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../game';
import OnBoarding from '../onboarding';
import ChooesLetter from '../chooes';
const Stack = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='onboarding' screenOptions={{
      headerTintColor: 'white',
      headerShadowVisible: false
    }}>
    <Stack.Screen name="onboarding" component={OnBoarding}  options={{headerShown:false}}/>
    <Stack.Screen name="Game" component={Game} options={{title:"", headerStyle:{backgroundColor:'#450920',color:"white"}}}/>
    <Stack.Screen name="chooes" component={ChooesLetter} options={{title:"", headerStyle:{backgroundColor:'darkblue',color:"white"}}}/>
  </Stack.Navigator>

  )
}

export default Stack

const styles = StyleSheet.create({})