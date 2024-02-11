import 'expo-dev-client';
import { Button, StyleSheet, View } from 'react-native';
import Game from './src/game';
import * as Notix from 'notix-rn';
import React,{useEffect,useState} from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { NavigationContainer } from '@react-navigation/native';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import Stack from './src/navigation/stack';

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-4797824372874073/8675639708';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['earn money online', 'money'],
});

export default function App() {

  let interstitialoader;

  // useEffect(()=>{
  //   loaderInterstitial()
  //   initializePushNotification();
  // },[])

  const loaderInterstitial = async () =>{
    interstitialoader = await Notix.Interstitial.createLoader(6996808);
    interstitialoader.startLoading();
    try {
      var interstitiaData = await interstitialoader.next(5000)
    } catch (Exception) {
      return;
    }
    Notix.Interstitial.show(interstitiaData)
  }


  const initializePushNotification = () =>{
    const notixAppId = 'p6996855';
    const notixToken = '207c434e038b4c8caf614c7476153285';

    Notix.Notification.init(notixAppId, notixToken)
  }

  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-4797824372874073/2480098145';



  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     },
  //   );
  //   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   // Start loading the rewarded interstitial ad straight away
  //   rewardedInterstitial.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }



  return (
    <NavigationContainer>
    {/* <View style={styles.container}>
       <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    /> */}
     {/* <Game/> */}
     <Stack/>
     {/* <Button
      title="Get Reward 🎉🎊"
      onPress={() => {
        rewardedInterstitial.show();
      }}
    />
    </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132a13',
    marginTop:30
  },
});
