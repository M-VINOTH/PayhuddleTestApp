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
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';


import IMAGES from "../../utility/images";
import COLORS from "../../utility/colors";
import STRINGS from "../../utility/strings";
import FONTS from "../../utility/fonts";

class TAPCARD extends Component {

    state = {
        enableButton: true,
        buttonLoading: false
    };

    componentDidMount(){
        this._test()
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          console.warn('tag', tag);
          NfcManager.setAlertMessageIOS('I got your tag!');
          NfcManager.unregisterTagEvent().catch(() => 0);
        });

        // setTimeout(()=> {
        //     this.setState({ buttonLoading: true });
        //    this.onReceivedCardReader()
        // }, 2000)
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
        this._cancel()
      }
    

      _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      }
    
      _test = async () => {
        try {
          await NfcManager.registerTagEvent();
        } catch (ex) {
          console.warn('ex', ex);
          NfcManager.unregisterTagEvent().catch(() => 0);
        }

        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: "Ready for magic"
            });
            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
        }catch(e){
            NfcManager.setAlertMessageIOS('Failure');
        }
    
      }

    render() {
        return (
           
                <View style={style.view}>
                    <Image style={style.image} source={IMAGES.SPLASH} />
                    <AppText style={style.enterAmountText} title={`AMOUNT:  ${this.getCurrency(this.props.route.params.amount)}`} />

                    <AppText style={style.enterAmountText} title={this.state.buttonLoading ? "Please wait..." : "TAP THE CARD"} />
                    <Image style={style.image} source={IMAGES.TAP_CARD} />
                    {this.state.buttonLoading  ? <AppSpinner style={style.loader} />: null }
                    

                    {/* <AppButton buttonStyle={this.state.enableButton ? style.enableButton : style.disableButton}
                        title={"TAP THE CARD"}
                        loading={this.state.buttonLoading}
                    /> */}
                    

                </View>
           )
    }

    onReceivedCardReader = () => {
        this.setState({ buttonLoading: true });
        console.log("BUTTON CLICK")
        setTimeout(() => {
            this.props.navigation.navigate("ENTER_PIN", this.props.route.params)

        }, 1000)
    }

    getCurrency = (amount) => {
        return amount //new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'INR' }).format(amount)
        }
   
}



export default TAPCARD;

export const style = StyleSheet.create({
    bottomImage: {
        transform: [{ scale: 0.2 }],
        width: "100%",
        height: "20%",
        // resizeMode: 'contain',
        bottom:0,
        position:'absolute'
    },
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