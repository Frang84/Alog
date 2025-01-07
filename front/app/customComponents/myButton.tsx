import { customeStyle } from "../style"
import { TouchableOpacity, View, Text, StyleSheet  } from "react-native"


const myButton = ({onPressFun} : any) =>{
    return(
        <TouchableOpacity style={customeStyle.touchableOpacity}  onPressIn={onPressFun}>
            <View style={customeStyle.button}>
                <Text style={customeStyle.textButton}>new chellange</Text>
            </View>
        </TouchableOpacity>
    )
}

export default myButton;

const styles = StyleSheet.create({
    defaultStyle: {
      
      borderWidth: 1,
      
    },
  });