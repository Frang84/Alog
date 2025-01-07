import { customeStyle } from "../style"
import { TouchableOpacity, View, Text, StyleSheet  } from "react-native"

type myButtonProps = {
    onPressFun: () => void,
    textToPrint: string,
    
}


const myButton = (props: myButtonProps) =>{
    
    return(
        <TouchableOpacity style={customeStyle.touchableOpacity}  onPressIn={props.onPressFun}>
            <View style={customeStyle.button}>
                <Text style={customeStyle.textButton}> {props.textToPrint} </Text>
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