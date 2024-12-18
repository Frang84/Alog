import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput } from "react-native"
import {Link} from "expo-router"


const  LoginPage = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <Text>
                Login Page
            </Text>
            <TextInput style={styles.input}></TextInput>
             <Link href="/Functions/add">login</Link> 
           
            
        </SafeAreaView>
    )
}
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: StatusBar.currentHeight
  },
  input:{
    height: 40,
    width: 80,
    margin: 12,
    padding: 10,
    borderWidth: 1
  }
});