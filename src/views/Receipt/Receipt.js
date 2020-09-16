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

class RECEIPT extends Component {

    state = {
        enableButton: true,
        buttonLoading: false
    };

    // componentDidMount(){
    //     console.log("this.props.route.params.amount", this.props.route.params.amount)
    //     setTimeout(()=> {
    //         this.setState({ buttonLoading: true });
    //        this.onReceivedCardReader()
    //     }, 2000)
    // }

    render() {
        return (
           
                <View style={style.view}>
                   
                    <Image style={style.image} source={IMAGES.SPLASH} />
                    <AppText style={style.enterAmountText} title={"Thank you"} />
                    <Image style={style.image} source={IMAGES.TICK} />


                    <AppText style={style.enterAmountText} title={`AMOUNT:  ${this.getCurrency(this.props.route.params.amount)}`} />

                    <AppText style={style.enterAmountText} title={"Transaction ID: 654826198376521"} />


                    

                    
                    <AppButton buttonStyle={this.state.enableButton ? style.enableButton : style.disableButton}
                        title={"OK"}
                        onPress={this.onClickOfOKButton}
                    />

                </View>
           )
    }

    onClickOfOKButton = () => {
        this.props.navigation.navigate("HOME")
    }

    getCurrency = (amount) => {
        return amount
        }
   
}



export default RECEIPT;

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
        fontSize: 26
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
        marginVertical:'5%'
    },

})