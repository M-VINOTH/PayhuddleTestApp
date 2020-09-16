import React from "react";
import { Button } from "react-native-elements";
import COLORS from "../utility/colors";
import FONTS from "../utility/fonts";
import {WToast} from 'react-native-smart-tip'

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  View,
  Image,
  Dimensions,
  Platform,
} from "react-native";

/*
  BUTTON
*/
//props => {title: ButtonTitle, style: optional, onPress: callBackEvent }
export const AppButton = (props) => {
  const buttonStyle = [style.button, props.buttonStyle || {}];
  const buttonTextStyle = [style.buttonText, props.buttonTextStyle || {}];
  return (
    <Button
      icon={props.icon}
      buttonStyle={buttonStyle}
      title={props.title}
      loading={props.loading}
      onPress={props.onPress}
      titleProps={{ style: buttonTextStyle }}
    />
  );
};

/*
  TEXT
*/
//props => {title: text, style: optional}
export const AppText = (props) => {
  const textStyle = [style.text, props.style || {}];
  return <Text {...props} style={textStyle}>{props.title}</Text>;
};

/*
  Spinner
*/
//props => {size: "large" || "small", style: style}
export const AppSpinner = (props) => {
  return (
    <ActivityIndicator
      style={props.style}
      size= {props.size ?? "large"}
      color={props.color ?? COLORS.LOADER}
      hidesWhenStopped="true"
      animating={props.show ?? true}
    />
  );
};

export const showAppToast = (message) => {
  const toastOpts = {
    data: `${message}`,
    textColor: COLORS.TOAST_LABEL,
    backgroundColor: COLORS.TOAST_BG,
    duration: WToast.duration.LONG, //1.SHORT 2.LONG
    position: WToast.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
  }

  WToast.show(toastOpts)
};

//STYLE SHEET:
const style = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BUTTON_BACKGROUND,
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
  },
  buttonText: {
    ...FONTS.MEDIUM_HIGHLIGHT,
    color: COLORS.BUTTON_TEXT,
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  text: {
    ...FONTS.DEFAULT,
    color: COLORS.TEXT_PRIMARY,
  },
  
});
