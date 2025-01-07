import { View, TouchableOpacity, Text, ToastAndroid,ScrollView } from "react-native"
import { customeStyle } from "@/app/style"
import MyButton from '../../customComponents/myButton'
import {Link, router} from "expo-router"


const ChellangeScreen = () =>{
    const goToCreateChellange = () =>{
        
    }
    return(
        <View style={customeStyle.container}>
            <ScrollView style={customeStyle.scrollView}>
                <MyButton TouchableOpacityStyle={customeStyle.touchableOpacity} onPressFun={() => router.navigate('/extraScreens/createChellange')} />
            </ScrollView>
        </View>
    )
}

export default ChellangeScreen;