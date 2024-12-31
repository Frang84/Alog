import { Text, View, StyleSheet,TextInput, SafeAreaView, KeyboardAvoidingView } from "react-native"
import {Link} from "expo-router"

const  AddPage = () =>{
    return(
        <View style={styles.container}>
            <Text>
                Add Page
            </Text>
            <Text>Alcohol name</Text>
            <TextInput style={styles.input}></TextInput>
           
            
        </View>
    )
}
export default AddPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input:{
    height: 40,
    width: 160,
    margin: 12,
    padding: 10,
    borderWidth: 1
  },
});