import { StyleSheet,Platform } from 'react-native';

export default StyleSheet.create({

  //COMMON
  DEFAULT: {
    fontFamily: "AirbnbCerealApp-Medium",
    fontSize: Platform.isPad ? 14: 16
  },

  //SMALL: //(MINIUM SIZE OF TEXT IN THE APPLICATION)
  SMALL : {
    fontFamily: "AirbnbCerealApp-Book",
    fontSize: Platform.isPad ? 14: 12
  },

  SMALL_HIGHLIGHT : {
    fontFamily: "AirbnbCerealApp-Bold",
    fontSize: Platform.isPad ? 14: 12
  },

  REGULAR: {
    fontFamily: "AirbnbCerealApp-Book",
    fontSize: Platform.isPad ? 16: 14
  },

  //MEDIUM: //(MEDIUM SIZE OF TEXT IN THE APPLICATION) EG: (TEXT_FIELD_INPUTS)
  MEDIUM: {
    fontFamily: "AirbnbCerealApp-Medium",
    fontSize: Platform.isPad ? 16: 14
  },

  //MEDIUM_HIGHT_LIGHT: 
  MEDIUM_HIGHLIGHT: {
    fontFamily: "AirbnbCerealApp-Medium",
    fontSize: Platform.isPad ? 18: 16
  },

  BOLD: {
    fontFamily: "AirbnbCerealApp-Bold",
    fontSize: Platform.isPad ? 18: 16
  },

  BOLD_HIGHLIGHT: {
    fontFamily: "AirbnbCerealApp-Bold",
    fontSize: Platform.isPad ? 20: 18
  },

  BLACK: {
    fontFamily: "AirbnbCerealApp-Black",
    fontSize: Platform.isPad ? 18: 16
  },

  BLACK_HIGHLIGHT: {
    fontFamily: "AirbnbCerealApp-Black",
    fontSize: Platform.isPad ? 22: 20
  }

});