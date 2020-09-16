import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import {
    AppButton,
    AppText,
    AppSpinner,
    showAppToast,
} from "../../component/AppBase";


import IMAGES from "../../utility/images";
import COLORS from "../../utility/colors";
import STRINGS from "../../utility/strings";
import FONTS from "../../utility/fonts";

import curency from "../../appcode/curency";

class ENTER_PIN extends Component {

    componentDidMount() {
        console.log("AMOUNT AT PIN ", this.props.route.params.amount)
    }
    state = {
        enableButton: false,
        buttonLoading: false,
        pin:''
    };

    
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.view}>
                    <Image style={style.image} source={IMAGES.SPLASH} />
                    <AppText style={style.enterAmountText} title={`AMOUNT:  ${this.getCurrency(this.props.route.params.amount)}`} />

                    <AppText style={style.enterAmountText} title={"Please Enter Your Pin"} />
                    <TextInput
                        value={this.state.pin}
                        placeholder={"Pin"}
                        keyboardType={"number-pad"}
                        style={style.textField}
                        onChangeText={ (text)=> {this.onChangeText(text)}}
                    />

                    <AppButton buttonStyle={this.state.enableButton == true ? style.enableButton : style.disableButton}
                        title={STRINGS.CONTINUE}
                        
                        onPress={this.onClickOfContinue}
                        loading={this.state.buttonLoading}
                    />

                </View>
            </TouchableWithoutFeedback>)
    }

    onChangeText = (pin) => {
        
        this.setState(state => {
            return {
              ...state,
              enableButton: pin.length > 3,
              pin: pin
            };
          })


       
    }

    onClickOfContinue = () => {
        if (this.state.enableButton) {
            this.setState({ buttonLoading: true });
            
            setTimeout(() => {
                this.setState(state => {
                    return {
                      ...state,
                      enableButton: false,
                      pin: '',
                      buttonLoading:false
                    };
                  })
        
                  this.props.navigation.navigate("RECEIPT", this.props.route.params)
                //   Alert.alert(
                //     'Transaction Result',
                //     'Success',
                //     [
                //       {
                //         text: 'Ok!',
                //         onPress: () => {this.props.navigation.navigate("HOME")}
                //       }
                //     ],
                //     { cancelable: false }
                //   );

            }, 1000)
        }
        
    }

    getCurrency = (amount) => {
        return amount 
    }

}



export default ENTER_PIN;

export const style = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: "center",
        alignContent: "center",
    }, image: {
        transform: [{ scale: 0.6 }],
        width: "100%",
        height: "20%",
        resizeMode: 'contain'
    },
    textField: {
        height: 45,
        width: '80%',
        paddingLeft: '2%',
        borderColor: 'black',
        borderRadius:20,
        borderWidth: 2,
        marginVertical: '3%',
        fontSize: 20
    },
    enableButton: {
        width: '80%',
        aspectRatio: 6.5 / 1.1,
        marginVertical: '3%',
        alignSelf: 'center',
        alignItems: "center"
    },
    disableButton: {
        width: '80%',
        opacity: 0.5,
        aspectRatio: 6.5 / 1.1,
        marginVertical: '3%',
        alignSelf: 'center',
        alignItems: "center"
    },

    loader: {
        marginBottom: "20%",
    },
    bottomView: {
        width: "100%",
        marginBottom: "10%",
        bottom: 0,
        position: "absolute",
    },
    enterAmountText: {
        ...FONTS.BLACK_HIGHLIGHT,
        textAlign: "center",
        marginVertical:'4%',
        color: COLORS.TEXT_PRIMARY,
    },

})