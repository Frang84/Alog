import { Text, View, StyleSheet } from "react-native"
import {Link} from "expo-router"

const  LoginPage = () =>{
    return(
        <View style={styles.container}>
            <Text>
                index Page
            </Text>     
        </View>
    )
}
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});