import React, { useReducer } from "react";
import FONTS from "../utility/fonts";
import COLORS from "../utility/colors";
import IMAGES from "../utility/images";

import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";


/**
 * TEXTFIELD
 */
const reducer = (state, action)=> {
  switch (action.type) {
    case 'ERROR':
      return {...state, error: action.payload}
   case "SECURE":
     return {...state, isSecure: !state.isSecure}
  }
 }

export const Input = (props) => {
  
  const [state, dispatch] = useReducer(reducer, {
    error: false,
    isSecure: hasSecureText(props.inputType)
  })

  return (
    <View style={state.error ? style.errorText : style.textField}>
      <TextInput
        {...props}
        ref={props.innerRef}
        textContentType={getTextContentType(props.inputType)}
        style={{ flex: 1 }}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={props.placeholder}
        secureTextEntry={state.isSecure}
        onChangeText = {(text)=> {
          const isValid = validateOnEndEditing(
            text,
            props.inputType
          );
          props.onChangeText(text,isValid)
        }}
        onEndEditing={(newValue) => {
          const isValid = validateOnEndEditing(
            newValue.nativeEvent.text,
            props.inputType
          );
          {
            newValue.nativeEvent.text.length > 0 ? dispatch({type: "ERROR", payload: !isValid}): null
          }
          
        }}
      ></TextInput>
      {hasSecureText(props.inputType)  ? (
        <TouchableOpacity onPress={ ()=> {dispatch({type: "SECURE"})}} >
          <Image style={style.textFieldIcon} source={ state.isSecure ? IMAGES.HIDE_PASSWORD: IMAGES.SHOW_PASSWORD} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default React.forwardRef((props, ref) => {
  return <Input innerRef={ref} {...props} />;
});

const getPlaceHolder = (text)=> {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const hasSecureText = (inputType)=> {
  return (inputType.toUpperCase() == "PASSWORD") || (inputType.toUpperCase() ==  "CONFIRM PASSWORD")
}

const validateOnEndEditing = (text, inputType) => {
  if (text.length == 0)return false
    switch (inputType.toUpperCase()) {
      case "EMAIL":
        return validEmail(text);
      case "PASSWORD":
        return true;
  }
  return true;
};

const getTextContentType = (inputType) => {
  switch (inputType.toUpperCase()) {
    case "EMAIL":
      return "emailAddress";
    default:
      return inputType.toLowerCase();
  }
};

//Validation:
const validEmail = (email) => {
  if (email.length > 0) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  }else {
    return false
  }
  
};

const style = StyleSheet.create({
  textField: {
    ...FONTS.MEDIUM,
    flexDirection: "row",
    justifyContent: "flex-end",
    aspectRatio: 6 / 1,
    width: Platform.isPad
      ? Dimensions.get("window").width * 0.4
      : Dimensions.get("window").width * 0.8,
    borderColor: COLORS.TEXT_FIELD_BORDER,
    borderWidth: 0.7,
    borderRadius: 6.7,
    paddingLeft: 20,
    color: COLORS.TEXT_FIELD_INPUT,
    margin: 5,
  },

  textFieldIcon: {
    marginRight: 15,
    height: "100%",
    width: 25,
    resizeMode: "contain",
  },
  errorText: {
    ...FONTS.MEDIUM,
    flexDirection: "row",
    justifyContent: "flex-end",
    aspectRatio: 6 / 1,
    width: Platform.isPad
      ? Dimensions.get("window").width * 0.4
      : Dimensions.get("window").width * 0.8,
    borderColor: COLORS.TEXT_FIELD_ERROR,
    borderWidth: 0.7,
    borderRadius: 6.7,
    paddingLeft: 20,
    color: COLORS.TEXT_FIELD_ERROR,
    margin: 5,
  },
});
