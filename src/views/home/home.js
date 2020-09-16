import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import {
    AppButton,
    AppText,
    AppSpinner,
    showAppToast,
} from "../../component/AppBase";

import  NumericInput from "@wwdrew/react-native-numeric-textinput";

import IMAGES from "../../utility/images";
import COLORS from "../../utility/colors";
import STRINGS from "../../utility/strings";
import FONTS from "../../utility/fonts";

import curency from "../../appcode/curency";
class Home extends Component {

    state = {
        enableButton: false,
        buttonLoading: false,
        amount:''
    };

    
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.view}>
                    <Image style={style.image} source={IMAGES.SPLASH} />
                    <AppText style={style.enterAmountText} title={"Enter the Amount"} />
                    <TextInput
                        value={this.state.amount}
                        placeholder={"₹0.00"}
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

    onChangeText = (enterdAmount) => {
        const amount = this.state.amount.length == 0 ? `${'\u20B9'} ${enterdAmount}`: enterdAmount
        this.setState(state => {
            return {
              ...state,
              enableButton: enterdAmount.length > 0,
              amount: amount
            };
          })


       
    }

    onClickOfContinue = () => {
        if (this.state.enableButton == true) {
            this.setState({ buttonLoading: true });
            
            setTimeout(() => {
                this.props.navigation.navigate("TAPCARD", {amount: this.state.amount})

                this.setState(state => {
                    return {
                      ...state,
                      enableButton: false,
                      amount: '',
                      buttonLoading:false
                    };
                  })
        
                
            }, 1000)
        }
        
    }

    getCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'INR' }).format(amount)
    }

}



export default Home;

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
        color: COLORS.TEXT_PRIMARY,
    },

})