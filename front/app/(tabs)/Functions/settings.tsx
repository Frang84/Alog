import { Text, View, StyleSheet, Button } from "react-native"
import {Link, router} from "expo-router"
import * as  SecureStore  from "expo-secure-store"


const  SettingsPage = () =>{
    const logOut = () =>{
      SecureStore.deleteItemAsync("DateToken");
      
    }
    return(
        <View style={styles.container}>
            <Text>
                Settings Page
            </Text>
            <Button title="logout" onPress={logOut}></Button>
        </View>
    )
}
export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});