import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
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

class Splash extends Component {

    componentDidMount(){
        setTimeout(()=> {
            console.log("FIRED")
            this.props.navigation.navigate("HOME");
        }, 2000)
    }
    render() {
        return (
            <View style={style.view}>
               <Image style={style.image} source={IMAGES.SPLASH} />
               <View style={style.bottomView}>
               <AppSpinner style={style.loader} />
               </View>
               
            </View>)
    }
}

export default Splash;

export const style = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white'
    },image: {
        transform: [{ scale: 0.6 }],
        width: "100%",
        height: "100%",
        resizeMode:'contain'
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
})