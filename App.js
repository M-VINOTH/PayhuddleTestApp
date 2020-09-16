/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  AppButton,
  AppText,
  AppSpinner,
  showAppToast,
} from "./src/component/AppBase";


// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import COLORS from "./src/utility/colors";
import IMAGES from "./src/utility/images";
import STRINGS from "./src/utility/strings";
import FONTS from "./src/utility/fonts";


import Splash from "./src/views/splash/splash";
import Home from "./src/views/home/home";
import TAPCARD from "./src/views/TapCard/TapCard";
import ENTER_PIN from "./src/views/EnterPin/EnterPin";
import RECEIPT from "./src/views/Receipt/Receipt";


const Stack = createStackNavigator();

App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SPLASH" component={Splash} options={{ headerShown: false }} />




          <Stack.Screen name="HOME" component={Home} options={{
            title: STRINGS.APP_NAME, headerStyle: {
             
            }, headerShown: true, gestureEnabled: false, headerLeft: null, headerRight: () => (
              <TouchableOpacity onPress={() => { showAppToast("UNDER CONSTRUCTION") }}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={IMAGES.SETTINGS} />
              </TouchableOpacity>

            ),
          }} />

          <Stack.Screen name="TAPCARD" component={TAPCARD} options={{
            title: STRINGS.APP_NAME, headerStyle: {
              
            }, headerShown: true, gestureEnabled: false, headerLeft: null
          }} />

          <Stack.Screen name="ENTER_PIN" component={ENTER_PIN} options={{
            title: STRINGS.APP_NAME, headerStyle: {
              
            }, headerShown: true, gestureEnabled: false, headerLeft: null
          }} />

          <Stack.Screen name="RECEIPT" component={RECEIPT} options={{
            title: STRINGS.APP_NAME, headerStyle: {
              
            }, headerShown: true, gestureEnabled: false, headerLeft: null
          }} />







        </Stack.Navigator>


      </NavigationContainer>


    </>
  );
};


function LogoTitle() {
  return (
    <Image
      style={{ resizeMode: 'cover', width: 150, height: 50, marginBottom: 10 }}
      source={IMAGES.SPLASH}
    />
  );
}


function settingsButton() {
  return (
    <Image
      style={{ resizeMode: 'cover', width: 150, height: 50, marginBottom: 10 }}
      source={IMAGES.SPLASH}
    />
  );
}



export default App;
