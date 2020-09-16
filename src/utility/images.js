import React  from "react";
import { Image, Platform, StyleSheet } from "react-native";

export default {
  APP_LOGO: require("../../assets/images/logo.png"),
  SPLASH: require("../../assets/images/logo.png"),

  //CLOSE BUTTON
  CLOSE_BUTTON: require("../../assets/images/close.png"),
 
  BACK_BUTTON:Platform.OS == "ios" ? require("../../assets/images/iOSBack.png"): require("../../assets/images/androidBack.png"),
  
  SETTINGS: require("../../assets/images/settings.png"),

  TICK: require("../../assets/images/tick.png"),

  TAP_CARD: require("../../assets/images/TapCard.jpg")

};
